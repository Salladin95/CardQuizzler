import * as Yup from "yup"
import { ObjectSchema, ValidationError } from "yup"
import { calculatePreviousYearStartDate, formDataToObject } from "~/lib"
import { SignUpFormEnum } from "~/app/auth/ui/SignUpTab"
import { SignInFormEnum } from "./ui/SignInTab"

export const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.,_])[A-Za-z\d.,_]*$/

export const passwordValidationMsg =
	"Password must contain at least one letter, one digit, and one of the following symbols: . , _"

export const emailRequiredMsg = "Email is required"
export const invalidEmailMsg = "Invalid email address"
export const nameRequiredMsg = "Name is required"
export const nameMinLengthMsg = "At least one character"
export const passwordRequiredMsg = "Password is required"
export const confirmPasswordRequiredMsg = "Confirm Password is required"
export const passwordsMustMatchMsg = "Passwords must match"
export const birthdayRequiredMsg = "Birthday is required"
export const birthdayMinMsg = "Must be at least 5 years old"

export const singUpValidationSchema: FormValidationSchemeType<SignUpFormEnum> = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	name: Yup.string().required(nameRequiredMsg).min(1, nameMinLengthMsg),
	password: Yup.string().required(passwordRequiredMsg).matches(passwordRegEx, passwordValidationMsg),
	confirmPassword: Yup.string()
		.required(confirmPasswordRequiredMsg)
		.oneOf([Yup.ref("password")], passwordsMustMatchMsg)
		.matches(passwordRegEx, passwordValidationMsg),
	birthday: Yup.date().required(birthdayRequiredMsg).min(calculatePreviousYearStartDate(5), birthdayMinMsg),
})

export const singInValidationSchema: FormValidationSchemeType<SignInFormEnum> = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	password: Yup.string().required(passwordRequiredMsg).matches(passwordRegEx, passwordValidationMsg),
})

export type FormValidationSchemeType<T extends string> = Yup.ObjectSchema<{ [key in T]: string | Date }>

export type SignInValidationScheme = ObjectSchema<Record<SignInFormEnum, string | Date>>
export type SignUpValidationScheme = ObjectSchema<Record<SignUpFormEnum, string | Date>>

// Function to handle form validation
export async function validateForm<T extends string>(
	formData: FormData,
	validationScheme: FormValidationSchemeType<T>,
): Promise<{
	[key: string]: string | Date
}> {
	const formObject = formDataToObject(formData)

	// Validate the form data using Yup
	try {
		return await validationScheme.validate(formObject, { abortEarly: false })
	} catch (errors) {
		throw errors as ValidationError
	}
}
