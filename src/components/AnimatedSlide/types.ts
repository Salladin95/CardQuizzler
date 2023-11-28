export type SwipeDirection = "left" | "right" | null
export type SwiperCard<T> = {
	swipedTowards?: SwipeDirection
} & T

export type SwiperData<T> = {
	rightSwipesCounter: number
	leftSwipesCounter: number
	swipedCards: SwiperCard<T>[]
}

export type Card = {
	id: string
	title: string
	description: string
}
