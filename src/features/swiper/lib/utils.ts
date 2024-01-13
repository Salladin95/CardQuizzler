import { SwiperCard } from "~/features/swiper"

export function getNegativeAnswers<DataT>(cards: SwiperCard<DataT>[]) {
	return cards.filter((card) => card.swipedTowards === "left")
}

export function getPositiveAnswers<DataT>(cards: SwiperCard<DataT>[]) {
	return cards.filter((card) => card.swipedTowards === "right")
}
