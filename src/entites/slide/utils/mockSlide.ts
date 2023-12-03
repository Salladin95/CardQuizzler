import { faker } from "@faker-js/faker"
import { SlideProps } from "~/entites/slide"

export function mockSlide(): SlideProps {
	return {
		id: faker.string.uuid(),
		slide: faker.word.words(),
	}
}

export function asyncMockSlide(): Promise<SlideProps> {
	return Promise.resolve(mockSlide())
}

export function mockSlides(amount = 10): SlideProps[] {
	return Array.from({ length: amount }, mockSlide)
}

export function asyncMockSlides(amount = 10): Promise<SlideProps[]> {
	const promises = Array.from({ length: amount }, asyncMockSlide)
	return Promise.all(promises)
}
