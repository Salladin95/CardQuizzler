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
