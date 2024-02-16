import * as yup from "yup"

export const passwordMinLengthMsg = "At least six characters"
export const mustContainSymbolsMsg = "Must contain: [0-9], [a-z]"
export const allowedSymbolsMsg = "Allowed symbols: [0-9], [a-z], [.,_]"
export const mustContainSymbolsRegex = /^(?=.*\d)(?=.*[a-zA-Z]).*$/
export const allowedSymbolsRegex = /^[0-9a-zA-Z,._]*$/
export const codeTypeErrorMsg = "Only digits"
export const codeLengthErrorMsg = "Must be exactly 6 characters"

yup.addMethod(yup.string, "password", function method() {
	return this.matches(mustContainSymbolsRegex, mustContainSymbolsMsg)
		.matches(allowedSymbolsRegex, allowedSymbolsMsg)
		.min(6, passwordMinLengthMsg)
})

yup.addMethod(yup.number, "codeLength", function method() {
	return this.typeError(codeTypeErrorMsg).test(
		"len",
		codeLengthErrorMsg,
		(val) => Boolean(val) && val?.toString().length === 6,
	)
})

export * from "yup"
