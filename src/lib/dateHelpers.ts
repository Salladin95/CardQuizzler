import { format, parse, startOfToday, startOfYear, subYears } from "date-fns"

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

export const FULL_DATE_FORMAT = "dd-MMMM-yyyy"
export const MIN_BIRTHDAY_DATE = new Date(1930, 0, 1)
export const MAX_BIRTHDAY_DATE = calculatePreviousYearStartDate(5)
export const MAX_BIRTHDAY_STRING = format(calculatePreviousYearStartDate(5), FULL_DATE_FORMAT)
export const MIN_BIRTHDAY_STRING = format(new Date(1930, 0, 1), FULL_DATE_FORMAT)

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

/**
 * Formats a string or Date to a full date string using the specified format.
 *
 * @param {string | Date} date - The date input to be formatted.
 * @returns {string} A formatted full date string.
 *
 * @example
 * const result = fullDateFormat(new Date());
 * console.log(result); // Returns a formatted full date string
 */
export function fullDateFormatter(date: string | Date): string {
	return format(date, FULL_DATE_FORMAT)
}

/**
 * Converts a string or Date to a standardized Date object.
 *
 * @returns {Date} A standardized Date object.
 * @throws {Error} If the input cannot be converted to a valid Date.
 *
 * @example
 * const result = standardizeDateInput("2024-01-20");
 * console.log(result); // Returns a Date object
 * @param date
 */
export function stringToDate(date: string | Date): Date {
	format(date, FULL_DATE_FORMAT)
	return parse(fullDateFormatter(date), FULL_DATE_FORMAT, new Date())
}
