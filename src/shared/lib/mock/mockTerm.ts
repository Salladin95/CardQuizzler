import { faker, fakerEN } from "@faker-js/faker"
import { createArray } from "~/shared/lib/creators"
import { TermType } from "~/app/models"

export function mockTerm(): TermType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		description: faker.word.words(),
		moduleID: faker.string.uuid(),
		index: faker.number.int(),
	}
}

export function asyncMockTerm(): Promise<TermType> {
	return Promise.resolve(mockTerm())
}

export function mockTerms(amount = 3): TermType[] {
	return createArray(amount, mockTerm)
}

export function asyncMockTerms(amount = 10): Promise<TermType[]> {
	const promises = createArray(amount, asyncMockTerm)
	return Promise.all(promises)
}

export function mockGetTerm(_: string) {
	return mockTerm()
}
