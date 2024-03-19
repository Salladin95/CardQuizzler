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
