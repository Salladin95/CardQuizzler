import { v4 as uuidv4 } from "uuid"
import { TermType } from "~/app/models"
import { createArray } from "~/shared"

export function createEmptyTerm(): TermType {
	return {
		id: uuidv4(),
		moduleID: uuidv4(),
		title: "",
		description: "",
	}
}

export function createEmptyTerms(amount = 1): TermType[] {
	return createArray(amount, createEmptyTerm)
}
