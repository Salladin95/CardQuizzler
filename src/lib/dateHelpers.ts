import { format, startOfToday, startOfYear, subYears } from "date-fns"

/**
 * Calculates the start date of the previous year based on the provided year.
 *
 * @param {number} year - The reference year to calculate the previous year from.
 * @returns {Date} The start date of the previous year.
 *
 * @example
 * // Returns the start date of the year 2021 (if current date is in 2022)
 * const result = calculatePreviousYearStartDate(1);
 */
export function calculatePreviousYearStartDate(year: number): Date {
	const currentDate = startOfToday()
	const dateYearsAgo = subYears(currentDate, year)
	return startOfYear(dateYearsAgo)
}

export function getListOfMonths() {
	return Array.from({ length: 12 }, (_, index) => format(new Date(2000, index, 1), "MMMM"))
}

export function getListOfYears(startYear: Date, endYear: Date) {
	const currentYear = new Date().getFullYear()
	const years: string[] = []

	for (let year = startYear.getFullYear(); year <= (endYear.getFullYear() || currentYear); year++) {
		years.push(format(startOfYear(new Date(year, 0, 1)), "yyyy"))
	}

	return years.reverse()
}
