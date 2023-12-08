"use client"
import React from "react"
import { WithId, WithOptionalClassName } from "~/app/types"
import { SwipeableProps, SwipedCard } from "~/features/swipeable/ui/Swipeable"
import { getArrLastIndex, getArrLastItem, removeArrLastItem, updateSwipedTowards } from "~/features/swipeable/utils"
import { SwipeDirection } from "~/features/swipeable"
import { cn } from "~/utils"

export type SwiperCard<T> = T & SwipedCard & WithId
type SwiperData<T> = {
	rightSwipesCounter: number
	leftSwipesCounter: number
	swipedCards: SwiperCard<T>[]
}
type SwiperProps<T> = {
	cards: (T & WithId)[]
} & WithOptionalClassName

export function withSwiper<DataType>(
	Component: React.ComponentType<
		DataType &
			Pick<SwipeableProps, "isTheTopCard" | "onAnimationComplete" | "onAnimationStart" | "onSwipe" | "isAnimating">
	>,
) {
	return function Swiper(props: SwiperProps<DataType>) {
		const { cards, className } = props
		const [swiperData, setSwiperData] = React.useState<SwiperData<DataType>>({
			leftSwipesCounter: 0,
			rightSwipesCounter: 0,
			swipedCards: [],
		})
		const [currentCards, setCurrentCards] = React.useState<SwiperCard<DataType>[]>(cards)

		const handleSwipe = (direction: SwipeDirection) => {
			// TODO SHOULD THE FIRST ELEMENT
			const swipedSlide = updateSwipedTowards(currentCards[getArrLastIndex(currentCards)], direction)
			const updatedSwiperData = {
				...swiperData,
				swipedCards: [...swiperData.swipedCards, swipedSlide],
			}
			// TODO SHOULD THE FIRST ELEMENT
			setCurrentCards(removeArrLastItem(currentCards))

			direction === "left"
				? setSwiperData({
						...updatedSwiperData,
						leftSwipesCounter: Math.min(cards.length, swiperData.leftSwipesCounter + 1),
				  })
				: setSwiperData({
						...updatedSwiperData,
						rightSwipesCounter: Math.min(cards.length, swiperData.rightSwipesCounter + 1),
				  })
		}

		const handleBack = () => {
			const previousCard = getArrLastItem(swiperData.swipedCards)
			switch (previousCard.swipedTowards) {
				case "left":
					setSwiperData({
						...swiperData,
						leftSwipesCounter: Math.max(0, swiperData.leftSwipesCounter - 1),
						swipedCards: removeArrLastItem(swiperData.swipedCards),
					})
					// TODO SHOULD BE LIKE THAT
					// setCurrentCards([previousCard, ...currentCards])
					setCurrentCards([...currentCards, previousCard])
					break
				case "right":
					setSwiperData({
						...swiperData,
						rightSwipesCounter: Math.max(0, swiperData.rightSwipesCounter - 1),
						swipedCards: removeArrLastItem(swiperData.swipedCards),
					})
					// TODO SHOULD BE LIKE THAT
					// setCurrentCards([previousCard, ...currentCards])
					setCurrentCards([...currentCards, previousCard])
					break
			}
		}

		const cleanSwipedStateOnAnimationEnd = () => {
			const updatedCard = { ...getArrLastItem(currentCards), swipedTowards: null }
			const updateCurrentCards = [...removeArrLastItem(currentCards), updatedCard]
			setCurrentCards(updateCurrentCards)
		}

		const [isAnimating, setIsAnimating] = React.useState(false)
		const handleAnimationStart = () => setIsAnimating(true)
		const handleAnimationComplete = () => {
			setIsAnimating(false)
			cleanSwipedStateOnAnimationEnd()
		}

		return (
			<section className={"w-[100%] h-[100%] overflow-hidden flex-center relative"}>
				<div className={cn("w-360 h-640 relative", className)}>
					{currentCards?.map((card, index) => (
						<Component
							{...card}
							className={"absolute rounded-12px"}
							key={card.id}
							onAnimationStart={handleAnimationStart}
							onAnimationComplete={handleAnimationComplete}
							onSwipe={handleSwipe}
							// TODO SHOULD BE THE FIRST ELEMENT
							isTheTopCard={index === getArrLastIndex(currentCards)}
							isAnimating={isAnimating}
						/>
					))}
				</div>
				<button
					disabled={!swiperData.swipedCards.length || isAnimating}
					className={"absolute left-[50%] bottom-[10%] text-black"}
					onClick={handleBack}
				>
					back
				</button>
			</section>
		)
	}
}
