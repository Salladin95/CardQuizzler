import { refresh } from "~/shared"
import { serialize } from "object-to-formdata"
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
	baseURL: "/api",
	timeout: 30000,
	withCredentials: true,

	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		TimeZone: new Date().getTimezoneOffset() / -60,
	},
}) as AxiosInstance & {
	formData: AxiosInstance
	download: AxiosInstance
	static: AxiosInstance
	sleep: (ms: number) => Promise<void>
}

/**
 * Axios with form data interceptors
 *
 * Converts any data to form data
 * */
const axiosFormDataInstance = axios.create({
	baseURL: "/api",
	timeout: 30000,
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
		TimeZone: new Date().getTimezoneOffset() / -60,
	},
})

/**
 * Axios with download interceptors
 *
 * Response is array buffer
 * */
const axiosDownloadInstance = axios.create({
	responseType: "arraybuffer",
	headers: {
		TimeZone: new Date().getTimezoneOffset() / -60,
	},
})

/**
 * Axios response interceptor
 * */
function responseInterceptor(response: AxiosResponse) {
	return Promise.resolve(response)
}

/**
 * Axios request interceptor to transform data to form data
 * */
const formDataRequestInterceptor = (request: InternalAxiosRequestConfig) => {
	const { data } = request
	request.data = serialize(data)

	return request
}

/**
 * Axios response error interceptor to decode array buffer
 * */
const downloadResponseErrorInterceptor = (result: { response: AxiosResponse }) => {
	const { data } = result.response
	const decoder = new TextDecoder()
	const encodedString = decoder.decode(data)
	const json = JSON.parse(encodedString)
	throw { ...result, response: { ...result.response, data: json } }
}

function setBearerToken(conf: AxiosRequestConfig, token: string | null) {
	// If access token is available, add it to the Authorization header
	if (!token) return
	if (conf.headers) {
		conf.headers.Authorization = "Bearer " + token
		return
	}
	conf.headers = {
		Authorization: "Bearer " + token,
	}
}

/**
 * Axios request interceptor to handle access token in local storage.
 * Adds the Bearer token to the Authorization header if available.
 * Also sets a proxy for server requests if running on the server-side.
 *
 * @param request - Axios request configuration
 * @returns Updated Axios request configuration with added headers or proxy URL
 */
function requestInterceptor(request: InternalAxiosRequestConfig) {
	// Check if the code is running on the server-side
	const isServer = typeof window === "undefined"

	if (isServer) {
		// Set a proxy for server requests to the appropriate API endpoint
		request.url = `${process.env.NEXT_PUBLIC_APP_URL}/api${request.url}`
	}

	// Retrieve the access token from local storage
	const accessToken = localStorage.getItem("access-token")

	setBearerToken(request, accessToken)

	return request
}

/**
 * Axios makes a refresh call when an error with status 401 is received.
 */
let hasCalledRefresh = false

async function makeRefreshCall(error: AxiosError) {
	if (!localStorage.getItem("access-token")) return Promise.reject(error)
	const originalRequest = error.config as AxiosRequestConfig
	// If the error is a 401 try to refresh the JWT token
	if (error.response?.status === 401 && !hasCalledRefresh) {
		hasCalledRefresh = true
		try {
			const res = await refresh()
			const accessToken = res.data.accessToken
			localStorage.setItem("access-token", accessToken)
			setBearerToken(originalRequest, accessToken)
			return axiosInstance(originalRequest)
		} catch (refreshError) {
			// If there is an error refreshing the token, log out the user
			localStorage.clear()
			return Promise.reject(refreshError)
		} finally {
			hasCalledRefresh = false
		}
	}
	// Return the original error if we can't handle it
	return Promise.reject(error)
}

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(responseInterceptor, makeRefreshCall)

axiosFormDataInstance.interceptors.request.use(requestInterceptor, formDataRequestInterceptor)

axiosDownloadInstance.interceptors.request.use(requestInterceptor)
axiosDownloadInstance.interceptors.response.use(responseInterceptor, downloadResponseErrorInterceptor)

axiosInstance.formData = axiosFormDataInstance
axiosInstance.download = axiosDownloadInstance

/**
 * Axios sleep function for testing
 * */
axiosInstance.sleep = (ms = 1000): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export default axiosInstance
