import { SelectOption } from "~/app/types"
import { TermType } from "~/app/models"
import { v4 as uuidv4 } from "uuid"

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

export function createEmptyTerm(_: unknown, index: number): TermType {
	return {
		id: uuidv4(),
		moduleID: uuidv4(),
		title: "",
		description: "",
		index,
	}
}

export function createEmptyTerms(amount = 1): TermType[] {
	return createArray(amount, createEmptyTerm)
}
