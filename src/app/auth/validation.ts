import * as Yup from "yup"
import { InferType } from "yup"
import { MAX_BIRTHDAY_DATE } from "~/lib"

export const mustContainSymbolsRegex = /^(?=.*\d)(?=.*[a-zA-Z]).*$/
export const allowedSymbolsRegex = /^[0-9a-zA-Z,._]*$/

const mustContainSymbolsMsg = "Must contain: [0-9], [a-z]"
const allowedSymbolsMsg = "Allowed symbols: [0-9], [a-z], [.,_]"

export const emailRequiredMsg = "Email is required"
export const invalidEmailMsg = "Invalid email address"
export const nameRequiredMsg = "Name is required"
export const nameMinLengthMsg = "At least one character"
export const passwordRequiredMsg = "Password is required"
export const passwordMinLengthMsg = "At least six characters"
export const confirmPasswordRequiredMsg = "Confirm Password is required"
export const passwordsMustMatchMsg = "Passwords must match"
export const birthdayRequiredMsg = "Birthday is required"
export const birthdayMinMsg = "Must be at least 5 years old"

export const singUpValidationSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	name: Yup.string().required(nameRequiredMsg).min(1, nameMinLengthMsg),
	password: Yup.string()
		.required(passwordRequiredMsg)
		.matches(mustContainSymbolsRegex, mustContainSymbolsMsg)
		.matches(allowedSymbolsRegex, allowedSymbolsMsg)
		.min(6, passwordMinLengthMsg),
	confirmPassword: Yup.string()
		.required(confirmPasswordRequiredMsg)
		.oneOf([Yup.ref("password"), ""], passwordsMustMatchMsg)
		.matches(mustContainSymbolsRegex, mustContainSymbolsMsg)
		.matches(allowedSymbolsRegex, allowedSymbolsMsg)
		.min(6, passwordMinLengthMsg),
	birthday: Yup.date().required(birthdayRequiredMsg).max(MAX_BIRTHDAY_DATE, birthdayMinMsg),
})

export type SignUpFormType = InferType<typeof singUpValidationSchema>

export const singInValidationSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	password: Yup.string()
		.required(passwordRequiredMsg)
		// .matches(mustContainSymbolsRegex, mustContainSymbolsMsg)
		.matches(allowedSymbolsRegex, allowedSymbolsMsg)
		.min(6, passwordMinLengthMsg),
})

export type SignInFormType = InferType<typeof singInValidationSchema>
