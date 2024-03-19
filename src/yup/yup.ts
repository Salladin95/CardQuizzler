import * as yup from "yup"
import { emailRegexp } from "~/shared"

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

export * from "yup"
