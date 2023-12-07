import { faker, fakerEN } from "@faker-js/faker"
import { CardType } from "~/features/quizCard/model"

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
	return Array.from({ length: amount }, mockCard)
}

export function asyncMockCards(amount = 10): Promise<CardType[]> {
	const promises = Array.from({ length: amount }, asyncMockCard)
	return Promise.all(promises)
}
