import * as yup from "yup"
import { emailRegexp } from "~/shared"
import { AccessType } from "~/app/types"

yup.setLocale({
	mixed: {
		required: ({ path }: yup.MessageParams) => ({ key: `Validation.required.${path}` }),
		oneOf: ({ path }) => ({ key: `Validation.oneOf.${path}` }),
	},
	number: {
		min: ({ min, path }) => ({ key: `Validation.min.${path}`, values: { min } }),
		max: ({ max, path }) => ({ key: `Validation.max.${path}`, values: { max } }),
	},
	string: {
		min: ({ path, min }) => ({ key: `Validation.min.${path}`, values: { min } }),
		max: ({ path, max }) => ({ key: `Validation.max.${path}`, values: { max } }),
		length: ({ path }) => ({ key: `Validation.length.${path}` }),
		matches: ({ path }) => ({ key: `Validation.matches.${path}` }),
	},
	date: {
		min: ({ path, min }) => ({ key: `Validation.min.${path}`, values: { min } }),
		max: ({ path, max }) => ({ key: `Validation.max.${path}`, values: { max } }),
	},
})

export const mustContainSymbolsRegex = /^(?=.*\d)(?=.*[a-zA-Z]).*$/
export const allowedSymbolsRegex = /^[0-9a-zA-Z,._]*$/

yup.addMethod(yup.string, "email", function method() {
	return this.matches(emailRegexp)
})

yup.addMethod(yup.string, "password", function method() {
	return this.test(
		"mustContainSymbols",
		{ key: "Validation.password.mustContainSymbols" },
		(val) => Boolean(val) && mustContainSymbolsRegex.test(val!),
	)
		.test(
			"allowedSymbols",
			{ key: "Validation.password.allowedSymbols" },
			(val) => Boolean(val) && allowedSymbolsRegex.test(val!),
		)
		.min(6)
})

yup.addMethod(yup.number, "codeLength", function method() {
	return this.typeError({ key: "Validation.typeError.code" }).test(
		"codeLength",
		{ key: "Validation.length.code", values: { length: 6 } },
		(val) => Boolean(val) && val?.toString().length === 6,
	)
})

/**
 * Determines if the password field is required based on the newAccess type and mode.
 *
 * @param {AccessType} newAccess - Updated access type.
 * @param {AccessType} currentAccess The current newAccess type of the folder.
 * @param {boolean} isEditMode - Flag indicating if the form is in edit mode.
 * @returns {boolean} - True if the password field is required, otherwise false.
 */

function isPasswordRequired(
	newAccess: AccessType,
	currentAccess: AccessType | undefined,
	isEditMode: boolean,
): boolean {
	if (isEditMode) {
		// If we're in edit mode, we want to make password field required only if
		// newAccess field has updated, and it's equal to AccessType.PASSWORD
		return newAccess !== currentAccess && newAccess === AccessType.PASSWORD
	}
	// If we're creating a new folder, we want to make password field required only if newAccess equals AccessType.PASSWORD
	return newAccess === AccessType.PASSWORD
}

yup.addMethod(yup.string, "protectedByPassword", function method(isEditMode: boolean, currentAccess?: AccessType) {
	return this.when("accessOption", {
		is: (access: AccessType) => isPasswordRequired(access, currentAccess, isEditMode),
		then: (schema) => schema.required().min(4),
		otherwise: (schema) =>
			schema.test(
				"passwordLength",
				{
					key: "Validation.min.password",
					values: { min: 4 },
				},
				(psd) => (!psd ? true : psd.length >= 4),
			),
	})
})

export * from "yup"
