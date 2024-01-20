import { AxiosResponse } from "axios"
import axios from "~/app/axios"

export type SignInPayload = {
	email: string
	password: string
}

export type SignInResult = AxiosResponse<string>

export function signIn(payload: SignInPayload): Promise<SignInResult> {
	return axios.post("/auth/sign-in", { email: payload.email, password: payload.password })
}
