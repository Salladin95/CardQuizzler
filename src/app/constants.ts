export const mustContainSymbolsRegex = /^(?=.*\d)(?=.*[a-zA-Z]).*$/
export const allowedSymbolsRegex = /^[0-9a-zA-Z,._]*$/

export const mustContainSymbolsMsg = "Must contain: [0-9], [a-z]"
export const allowedSymbolsMsg = "Allowed symbols: [0-9], [a-z], [.,_]"

export const emailRequiredMsg = "Email is required"
export const invalidEmailMsg = "Invalid email address"
export const nameRequiredMsg = "Name is required"
export const nameMinLengthMsg = "At least one character"
export const passwordRequiredMsg = "Password is required"
export const confirmPasswordRequiredMsg = "Confirm Password is required"
export const passwordsMustMatchMsg = "Passwords must match"
export const birthdayRequiredMsg = "Birthday is required"
export const birthdayMinMsg = "Must be at least 5 years old"
export const codeRequiredErrMsg = "Code is required"
