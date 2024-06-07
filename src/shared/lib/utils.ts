import * as Yup from "~/yup"
import { AccessType } from "~/app/types"

/**
 * Clamps a value to a specified range.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.min - The minimum value of the range.
 * @param {number} params.max - The maximum value of the range.
 * @param {number} params.value - The value to be clamped.
 * @returns {number} - The clamped value within the specified range.
 *
 * @example
 * // Clamps the value to be between 0 and 100
 * const clampedValue = clampBetween({ min: 0, max: 100, value: 50 });
 */
export function clampBetween({ min, max, value }: { min: number; max: number; value: number }): number {
	return Math.max(min, Math.min(max, value))
}

/**
 * Calculates the progress percentage based on the current value and full value.
 * @param currentValue - The current value.
 * @param fullValue - The full value or maximum value.
 * @returns The progress percentage.
 */
export function calculateProgress(currentValue: number, fullValue: number): number {
	// Ensure that currentValue is not greater than fullValue
	const clampedCurrentValue = clampBetween({ min: 0, value: currentValue, max: fullValue })
	// Calculate the progress percentage
	return (clampedCurrentValue / fullValue) * 100
}

/**
 * Converts FormData to a plain object.
 *
 * @param {FormData} formData - The FormData object to be converted.
 * @returns {Object.<string, string>} The plain object representation of the FormData.
 */
export function formDataToObject(formData: FormData): { [key: string]: string } {
	const formObject: { [key: string]: string } = {}

	formData.forEach((value, key) => {
		if (typeof value === "string") {
			formObject[key] = value
		}
	})

	return formObject
}

// Regular expression pattern for basic email format
export const emailRegexp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
/**
 * Checks if the given email address conforms to a basic email format.
 *
 * @param {string} email - The email address to be checked.
 * @returns {boolean} True if the email format is valid, False otherwise.
 */
export function checkEmailFormat(email: string): boolean {
	// Check if the email matches the pattern
	return emailRegexp.test(email)
}

/**
 * Retrieves random item of the given array
 * @param {unknown[]} arr
 * @returns {unknown}
 */
export function getRandomArrEl<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max)
}

/**
 * Determines if the password field is required based on the newAccess type and mode.
 *
 * @param {AccessType} newAccess - Updated access type.
 * @param {AccessType} currentAccess The current newAccess type of the folder.
 * @param {boolean} isEditMode - Flag indicating if the form is in edit mode.
 * @returns {boolean} - True if the password field is required, otherwise false.
 */

export function isPasswordRequired(
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

/**
 * Creates a password validation schema based on the access type and mode.
 *
 * @param {boolean} isEditMode - Flag indicating if the form is in edit mode.
 * @param {AccessType} currentAccess - The current access type of the folder/module.
 * @returns {Yup.StringSchema} - The password validation schema.
 */
export function createPasswordValidation(isEditMode: boolean, currentAccess?: AccessType): Yup.StringSchema {
	return Yup.string().when("accessOption", {
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
}
