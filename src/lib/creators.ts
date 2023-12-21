import { SelectOption } from "~/app/types"

/**
 * Creates array by index iterator
 *
 * @param length {number} - Length of array
 * @param iterator { (index: number) => T } - Function that generate entity
 *
 * @returns {T}[]
 */
export const createArray = <T>(length: number, iterator: (index: string) => T): T[] =>
	new Array(length).fill(0).map((_, index) => iterator(index.toString()))

/**
 * Creates SelectOption
 *
 * @param [value=0] {number} - Like an id
 *
 * @return {@link SelectOption}
 */
export const createOption = (value = "0", label = `Option ${value}`): SelectOption => ({
	value,
	label,
})

/**
 * Creates SelectOption
 *
 * @param [length=10] {number} - Length of array
 *
 * @return {@link SelectOption}[]
 */
export const createOptions = (length = 10) => createArray(length, createOption)
