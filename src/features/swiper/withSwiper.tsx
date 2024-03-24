"use client"
import React from "react"
import { useAnimate } from "framer-motion"
import { calculateProgress, cn } from "~/shared/lib"
import { ArrowLeft, ArrowRight, Button } from "~/shared"
import { PropsWithClassName, WithId } from "~/app/types"
import { TurnLeftIcon } from "~/shared/ui/icons/TurnLeftIcon"
// TODO: SHOULDN'T USE MODULES FROM THE SAME LEVEL
import {
	calculateMoveParameters,
	getArrLastIndex,
	getArrLastItem,
	removeArrLastItem,
	Swipeable,
	SwipedCard,
	updateAnswer,
} from "~/features/swipeable/"

export type SwiperCard<T> = T & SwipedCard & WithId
export type SwiperData<T> = {
	positiveSwipesCounter: number
	negativeSwipesCounter: number
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
		const [scope, animate] = useAnimate()
		const [isAnimating, setIsAnimating] = React.useState(false)
		const [currentCards, setCurrentCards] = React.useState<SwiperCard<DataType>[]>(swiperData.originalTerms)

		const handleSwipe = (answer: boolean) => {
			// TODO SHOULD THE FIRST ELEMENT
			const swipedSlide = updateAnswer(currentCards[getArrLastIndex(currentCards)], answer)
			let updatedSwiperData = {
				...swiperData,
				progress: calculateProgress(
					swiperData.positiveSwipesCounter + swiperData.negativeSwipesCounter + 1,
					swiperData.originalTerms.length,
				),
				swipedCards: [...swiperData.swipedCards, swipedSlide],
			}
			// TODO SHOULD THE FIRST ELEMENT
			setCurrentCards(removeArrLastItem(currentCards))

			updatedSwiperData = !answer
				? {
						...updatedSwiperData,
						negativeSwipesCounter: Math.min(swiperData.originalTerms.length, swiperData.negativeSwipesCounter + 1),
				  }
				: {
						...updatedSwiperData,
						positiveSwipesCounter: Math.min(swiperData.originalTerms.length, swiperData.positiveSwipesCounter + 1),
				  }

			onUpdate(updatedSwiperData)
		}

		const handleBack = () => {
			const previousCard = getArrLastItem(swiperData.swipedCards)
			switch (previousCard.answer) {
				case false:
					onUpdate({
						...swiperData,
						progress: calculateProgress(
							swiperData.positiveSwipesCounter + swiperData.negativeSwipesCounter - 1,
							swiperData.originalTerms.length,
						),
						negativeSwipesCounter: Math.max(0, swiperData.negativeSwipesCounter - 1),
						swipedCards: removeArrLastItem(swiperData.swipedCards),
					})
					// TODO SHOULD BE LIKE THAT
					// setCurrentCards([previousCard, ...currentCards])
					setCurrentCards([...currentCards, previousCard])
					break
				case true:
					onUpdate({
						...swiperData,
						progress: calculateProgress(
							swiperData.positiveSwipesCounter + swiperData.negativeSwipesCounter - 1,
							swiperData.originalTerms.length,
						),
						positiveSwipesCounter: Math.max(0, swiperData.positiveSwipesCounter - 1),
						swipedCards: removeArrLastItem(swiperData.swipedCards),
					})
					// TODO SHOULD BE LIKE THAT
					// setCurrentCards([previousCard, ...currentCards])
					setCurrentCards([...currentCards, previousCard])
					break
			}
		}

		function cleanSwipedStateOnAnimationEnd() {
			const updatedCard = { ...getArrLastItem(currentCards), answer: null }
			const updateCurrentCards = [...removeArrLastItem(currentCards), updatedCard]
			setCurrentCards(updateCurrentCards)
		}

		const handleAnimationStart = () => setIsAnimating(true)

		function handleAnimationComplete() {
			setIsAnimating(false)
			cleanSwipedStateOnAnimationEnd()
		}

		async function swipeManually(answer: boolean) {
			const { moveDistance, targetRotation } = calculateMoveParameters()
			const elements = scope.current.querySelectorAll(".swipeable")
			// TODO: SHOULD BE THE FIRST ELEMENT
			const target = elements[elements.length - 1]
			if (!target) {
				return
			}
			switch (answer) {
				case true:
					// TODO: EXTRACT TO A FUNCTION
					await animate(target, { rotate: targetRotation, x: moveDistance }, { duration: 0.5 })
					return handleSwipe(answer)
				default:
					// TODO: EXTRACT TO A FUNCTION
					await animate(target, { rotate: -targetRotation, x: -moveDistance }, { duration: 0.5 })
					return handleSwipe(answer)
			}
		}

		React.useEffect(() => {
			setCurrentCards(swiperData.originalTerms)
		}, [swiperData.originalTerms])

		return (
			<section className={"container flex-center"}>
				<div
					ref={scope}
					className={cn("w-360 h-[30rem] mt-4 640:w-428 768:w-640 768:h-640 768:mt-8 1024:w-768 relative", className)}
				>
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
							answer={card.answer}
						>
							<Component
								{...card}
								isAnimating={isAnimating}
								className={cn({ "opacity-0": index !== getArrLastIndex(currentCards) })}
							/>
						</Swipeable>
					))}
					<div className={"w-full px-4 absolute -bottom-[3.2rem] flex justify-between 768:-bottom-[4rem]"}>
						<Button onClick={() => swipeManually(false)} variant={"none"} className={"w-min"}>
							<ArrowLeft className={"text-primary hover:text-green transition-colors"} />
						</Button>
						<Button
							variant={"none"}
							disabled={swiperData.originalTerms.length === currentCards.length || isAnimating}
							className={cn("absolute-x-center text-black cursor-pointer w-min", {
								"opacity-30": swiperData.originalTerms.length === currentCards.length || isAnimating,
							})}
							onClick={handleBack}
						>
							<TurnLeftIcon className={"text-primary"} />
						</Button>
						<Button onClick={() => swipeManually(true)} variant={"none"} className={"w-min"}>
							<ArrowRight className={"text-primary hover:text-green transition-colors"} />
						</Button>
					</div>
				</div>
			</section>
		)
	}
}
