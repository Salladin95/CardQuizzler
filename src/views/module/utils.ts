import { TermType } from "~/app/models"
import { SwiperCard, SwiperData } from "~/features/swiper"

export function cleanSwipedCards(cards: SwiperCard<TermType>[]) {
	return cards.map((card) => ({ ...card, answer: undefined }))
}

export function initializeSwiperData(terms: SwiperCard<TermType>[]): SwiperData<TermType> {
	return {
		progress: 0,
		swipedCards: [],
		negativeSwipesCounter: 0,
		positiveSwipesCounter: 0,
		startingTerms: terms,
	}
}
