import { faker, fakerEN } from "@faker-js/faker"
import { CardType } from "~/features/quizCard/model"
import { createArray } from "~/lib/creators"

export function mockCard(): CardType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		description: faker.word.words(),
	}
}

export function asyncMockCard(): Promise<CardType> {
	return Promise.resolve(mockCard())
}

export function mockCards(amount = 10): CardType[] {
	return createArray(amount, mockCard)
}

export function asyncMockCards(amount = 10): Promise<CardType[]> {
	const promises = createArray(amount, asyncMockCard)
	return Promise.all(promises)
}
