import { SelectOption } from "~/app/types"

/**
 * Creates array by index iterator
 *
 * @param length {number} - Length of array
 * @param iterator { (index: number) => T } - Function that generate entity
 *
 * @returns {T}[]
 */
export const createArray = <T, V = string>(
	length: number,
	iterator: (value: V, index: number, array: unknown[]) => T,
): T[] => new Array(length).fill(0).map(iterator)

/**
 * Creates SelectOption
 *
 * @param [value="0"] {string} - Like an id
 *
 * @param label
 * @return {@link SelectOption}
 */
export const createOption = (value: string = "0", label = `Option ${value}`): SelectOption => ({
	value,
	label,
})

export const createOptions = (length = 10) => createArray(length, (_, index) => createOption(index.toString()))
