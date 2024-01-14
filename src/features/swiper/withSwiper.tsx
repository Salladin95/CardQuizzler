"use client"
import React from "react"
import { calculateProgress, cn } from "src/lib"
import { Button } from "~/shared"
import { PropsWithClassName, WithId } from "~/app/types"
import { TurnLeftIcon } from "~/shared/ui/icons/TurnLeftIcon"
import {
	getArrLastIndex,
	getArrLastItem,
	removeArrLastItem,
	Swipeable,
	SwipedCard,
	SwipeDirection,
	updateSwipedTowards,
} from "../swipeable/"

export type SwiperCard<T> = T & SwipedCard & WithId
export type SwiperData<T> = {
	rightSwipesCounter: number
	leftSwipesCounter: number
	swipedCards: SwiperCard<T>[]
	originalTerms: SwiperCard<T>[]
	progress: number
}
type SwiperProps<T> = {
	swiperData: SwiperData<T>
	onUpdate: (data: SwiperData<T>) => void
} & PropsWithClassName

export function withSwiper<DataType>(Component: React.ComponentType<DataType>) {
	return function Swiper(props: SwiperProps<DataType>) {
		const { className, onUpdate, swiperData } = props
		const [currentCards, setCurrentCards] = React.useState<SwiperCard<DataType>[]>(swiperData.originalTerms)

		const handleSwipe = (direction: SwipeDirection) => {
			// TODO SHOULD THE FIRST ELEMENT
			const swipedSlide = updateSwipedTowards(currentCards[getArrLastIndex(currentCards)], direction)
			let updatedSwiperData = {
				...swiperData,
				progress: calculateProgress(
					swiperData.rightSwipesCounter + swiperData.leftSwipesCounter + 1,
					swiperData.originalTerms.length,
				),
				swipedCards: [...swiperData.swipedCards, swipedSlide],
			}
			// TODO SHOULD THE FIRST ELEMENT
			setCurrentCards(removeArrLastItem(currentCards))

			updatedSwiperData =
				direction === "left"
					? {
							...updatedSwiperData,
							leftSwipesCounter: Math.min(swiperData.originalTerms.length, swiperData.leftSwipesCounter + 1),
					  }
					: {
							...updatedSwiperData,
							rightSwipesCounter: Math.min(swiperData.originalTerms.length, swiperData.rightSwipesCounter + 1),
					  }

			onUpdate(updatedSwiperData)
		}

		const handleBack = () => {
			const previousCard = getArrLastItem(swiperData.swipedCards)
			switch (previousCard.swipedTowards) {
				case "left":
					onUpdate({
						...swiperData,
						progress: calculateProgress(
							swiperData.rightSwipesCounter + swiperData.leftSwipesCounter - 1,
							swiperData.originalTerms.length,
						),
						leftSwipesCounter: Math.max(0, swiperData.leftSwipesCounter - 1),
						swipedCards: removeArrLastItem(swiperData.swipedCards),
					})
					// TODO SHOULD BE LIKE THAT
					// setCurrentCards([previousCard, ...currentCards])
					setCurrentCards([...currentCards, previousCard])
					break
				case "right":
					onUpdate({
						...swiperData,
						progress: calculateProgress(
							swiperData.rightSwipesCounter + swiperData.leftSwipesCounter - 1,
							swiperData.originalTerms.length,
						),
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

		React.useEffect(() => {
			setCurrentCards(swiperData.originalTerms)
		}, [swiperData.originalTerms])

		return (
			<section className={"container flex-center"}>
				<div className={cn("w-360 h-428 640:w-428 768:w-640 768:h-640 1024:w-768 relative ", className)}>
					{currentCards?.map((card, index) => (
						<Swipeable
							className={"absolute rounded-12px"}
							key={card.id}
							onAnimationStart={handleAnimationStart}
							onAnimationComplete={handleAnimationComplete}
							onSwipe={handleSwipe}
							// TODO SHOULD BE THE FIRST ELEMENT
							isTheTopCard={index === getArrLastIndex(currentCards)}
							isAnimating={isAnimating}
							swipedTowards={card.swipedTowards}
						>
							<Component
								{...card}
								isAnimating={isAnimating}
								className={cn({ "opacity-0": index !== getArrLastIndex(currentCards) })}
							/>
						</Swipeable>
					))}
					<Button
						variant={"none"}
						disabled={swiperData.originalTerms.length === currentCards.length || isAnimating}
						className={cn("absolute-x-center -bottom-[15%] 768:-bottom-[10%] text-black cursor-pointer w-min", {
							"opacity-30": swiperData.originalTerms.length === currentCards.length || isAnimating,
						})}
						onClick={handleBack}
					>
						<TurnLeftIcon />
					</Button>
				</div>
			</section>
		)
	}
}
