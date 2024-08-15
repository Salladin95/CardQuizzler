import { SwiperCard } from "~/features/swiper"

export function getNegativeAnswers<DataT>(cards: SwiperCard<DataT>[]) {
	return cards.filter((card) => !card.answer)
}

export function getPositiveAnswers<DataT>(cards: SwiperCard<DataT>[]) {
	return cards.filter((card) => card.answer)
}
