"use client"
import React from "react"
import { ExtendsId } from "~/app/types"
import { Swipeable, SwipeableProps, SwipedCard } from "~/features/swipeable/ui/Swipeable"
import { updateSwipedTowards } from "~/features/swipeable/utils"
import { SwipeDirection } from "~/features/swipeable"

export type SwiperCard<T> = ExtendsId<T> & SwipedCard
type SwiperData<T> = {
	rightSwipesCounter: number
	leftSwipesCounter: number
	swipedCards: SwiperCard<T>[]
}
type SwiperProps<T> = {
	cards: ExtendsId<T>[]
	backgroundColors?: SwipeableProps["backgroundColors"]
}

export function withSwiper<ComponentProps>(Component: React.ComponentType<ExtendsId<ComponentProps>>) {
	return function Swiper(props: SwiperProps<ComponentProps>) {
		const { cards } = props
		const [swiperData, setSwiperData] = React.useState<SwiperData<ComponentProps>>({
			leftSwipesCounter: 0,
			rightSwipesCounter: 0,
			swipedCards: [],
		})
		const [currentCards, setCurrentCards] = React.useState<SwiperCard<ComponentProps>[]>(cards)

		const handleSwipe = (direction: SwipeDirection) => {
			const swipedSlide = updateSwipedTowards(currentCards[0], direction)
			const updatedSwiperData = {
				...swiperData,
				swipedCards: [...swiperData.swipedCards, swipedSlide],
			}
			setCurrentCards(currentCards.slice(1))

			direction === "left"
				? setSwiperData({
						...updatedSwiperData,
						leftSwipesCounter: swiperData.leftSwipesCounter + 1,
				  })
				: setSwiperData({
						...updatedSwiperData,
						rightSwipesCounter: swiperData.rightSwipesCounter + 1,
				  })
		}

		const handleBack = () => {
			const previousCard = swiperData.swipedCards[swiperData.swipedCards.length - 1]
			switch (previousCard.swipedTowards) {
				case "left":
					setSwiperData({
						...swiperData,
						leftSwipesCounter: swiperData.leftSwipesCounter - 1,
						swipedCards: swiperData.swipedCards.slice(0, swiperData.swipedCards.length - 1),
					})
					setCurrentCards([previousCard, ...currentCards])
					break
				case "right":
					setSwiperData({
						...swiperData,
						rightSwipesCounter: swiperData.rightSwipesCounter - 1,
						swipedCards: swiperData.swipedCards.slice(0, swiperData.swipedCards.length - 1),
					})
					setCurrentCards([previousCard, ...currentCards])
					break
			}
		}

		const cleanSwipedStateOnAnimationEnd = () => {
			const updatedCard = { ...currentCards[currentCards.length - 1], swipedTowards: null }
			const updateCurrentCards = [...currentCards.slice(0, currentCards.length - 1), updatedCard]
			setCurrentCards(updateCurrentCards)
		}

		const [isAnimating, setIsAnimating] = React.useState(false)
		const handleAnimationStart = () => setIsAnimating(true)
		const handleAnimationComplete = () => {
			setIsAnimating(false)
			cleanSwipedStateOnAnimationEnd()
		}

		return (
			<section className={"w-[100vw] h-[90vh] flex-center overflow-hidden"}>
				<div className="flex-center w-full h-full relative">
					{currentCards.map((card, index) => (
						<Swipeable
							key={card.id}
							zIndex={currentCards.length - index}
							onSwipe={handleSwipe}
							swipedTowards={card.swipedTowards}
							onAnimationStart={handleAnimationStart}
							onAnimationComplete={handleAnimationComplete}
							isTheTopCard={index === 0}
							backgroundColors={props.backgroundColors}
						>
							<Component {...card} />
						</Swipeable>
					))}
					<button
						disabled={!swiperData.swipedCards.length || isAnimating}
						className={"absolute bottom-[22%] text-black"}
						onClick={handleBack}
					>
						back
					</button>
				</div>
			</section>
		)
	}
}
