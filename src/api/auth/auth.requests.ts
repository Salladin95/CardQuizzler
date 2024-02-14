import { AxiosResponse } from "axios"
import axios from "~/app/axios"
import { SignInFormType, SignUpFormType } from "~/app/auth/validation"

export type SignInPayload = SignInFormType
export type SignUpPayload = Omit<SignUpFormType, "birthday"> & {
	birthday: string
}

export type SignInResult = AxiosResponse<{
	accessToken: string
}>
export type SignUpResult = AxiosResponse<string>

export function signIn(payload: SignInPayload): Promise<SignInResult> {
	return axios.post("/auth/sign-in", payload)
}

export function signUp(payload: SignUpPayload): Promise<SignUpResult> {
	return axios.post("/auth/sign-up", payload)
}

export function refresh(): Promise<SignInResult> {
	return axios.get("/auth/refresh")
}

export function signOut(): Promise<void> {
	localStorage.clear()
	return axios.get("/sign-out")
}
