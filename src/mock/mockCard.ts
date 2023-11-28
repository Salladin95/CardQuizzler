import { Card } from "~/components/AnimatedSlide/types"
import { faker, fakerEN } from "@faker-js/faker"

export function mockCard(): Card {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		description: faker.word.words(),
	}
}

export function asyncMockCard(): Promise<Card> {
	return Promise.resolve(mockCard())
}

export function mockCards(amount = 10): Card[] {
	return Array.from({ length: amount }, mockCard)
}

export function asyncMockCards(amount = 10): Promise<Card[]> {
	const promises = Array.from({ length: amount }, asyncMockCard)
	return Promise.all(promises)
}
