import { SwiperCard, SwiperData } from "~/features/swiper"
import { TermType } from "~/app/models"

export function cleanSwipedCards(cards: SwiperCard<TermType>[]) {
	return cards.map((answer) => ({ ...answer, swipedTowards: null }))
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
