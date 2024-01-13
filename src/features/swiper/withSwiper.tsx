"use client"
import React from "react"
import { calculateProgress, cn } from "src/lib"
import { Button, CircularProgressBar, Confetti, ConfettiIcon, FlatProgressBar } from "~/shared"
import { PropsWithClassName, WithId } from "~/app/types"
import { TurnLeftIcon } from "~/shared/ui/icons/TurnLeftIcon"
import { getRandomInspirationalMessage } from "./lib/inspirationalMessages"
import {
	getArrLastIndex,
	getArrLastItem,
	removeArrLastItem,
	Swipeable,
	SwipedCard,
	SwipeDirection,
	updateSwipedTowards,
} from "../swipeable/"
import { getNegativeAnswers, getPositiveAnswers } from "~/features/swiper/lib/utils"

export type SwiperCard<T> = T & SwipedCard & WithId
type SwiperData<T> = {
	rightSwipesCounter: number
	leftSwipesCounter: number
	swipedCards: SwiperCard<T>[]
}
type SwiperProps<T> = {
	cards: (T & WithId)[]
} & PropsWithClassName

export function withSwiper<DataType>(Component: React.ComponentType<DataType>) {
	return function Swiper(props: SwiperProps<DataType>) {
		const { cards, className } = props
		const [swiperData, setSwiperData] = React.useState<SwiperData<DataType>>({
			leftSwipesCounter: 0,
			rightSwipesCounter: 0,
			swipedCards: [],
		})
		const [currentCards, setCurrentCards] = React.useState<SwiperCard<DataType>[]>(cards)
		const [progress, setProgress] = React.useState(0)

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

		React.useEffect(() => {
			setProgress(calculateProgress(swiperData.rightSwipesCounter + swiperData.leftSwipesCounter, cards.length))
		}, [cards.length, swiperData])

		const negativeAnswers = getNegativeAnswers(swiperData.swipedCards)
		const positiveAnswers = getPositiveAnswers(swiperData.swipedCards)

		return (
			<section className={"container flex-center"}>
				<FlatProgressBar progress={progress} className={"absolute inset-0 w-full"} />
				{progress !== 100 && (
					<div
						id={"swiper"}
						className={cn("w-360 h-428 640:w-428 768:w-640 768:h-640 1024:w-768 relative ", className)}
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
								swipedTowards={card.swipedTowards}
							>
								<Component {...card} className={cn({ "opacity-0": index !== getArrLastIndex(currentCards) })} />
							</Swipeable>
						))}
						<Button
							variant={"none"}
							disabled={!swiperData.swipedCards.length || isAnimating}
							className={cn("absolute-x-center -bottom-[15%] 768:-bottom-[10%] text-black cursor-pointer w-min", {
								"opacity-30": !swiperData.swipedCards.length || isAnimating,
							})}
							onClick={handleBack}
						>
							<TurnLeftIcon />
						</Button>
					</div>
				)}
				{progress === 100 && (
					<div className={"w-[100%] h-[100%]"}>
						<Confetti />
						<div className={"flex-center mt-12 mb-12"}>
							<h1 className={"h1 mr-3"}>{getRandomInspirationalMessage()}</h1>
							<ConfettiIcon className={"w-[10rem] h-[10rem]"} />
						</div>

						<div className={"flex items-center gap-8 mb-12"}>
							<CircularProgressBar progress={calculateProgress(positiveAnswers.length, cards.length)} />
							<div className={"w-[30%]"}>
								<div
									className={
										"flex justify-between items-center mb-4 text-green text-[1.2rem] border-2 border-[#A1EEBD] rounded-full py-1 px-4"
									}
								>
									<span>Знаю</span>
									<span className={"w-8 h-8 rounded-full flex-center border-[1px] border-green text-body-1"}>
										{positiveAnswers.length}
									</span>
								</div>
								<div
									className={
										"flex justify-between items-center text-[#DC8686] text-[1.2rem] border-2 border-[#FF8080] rounded-full py-1 px-4"
									}
								>
									<span>Еще изучаю</span>
									<span className={"w-8 h-8 rounded-full flex-center border-[1px] border-[#DC8686] text-body-1"}>
										{negativeAnswers.length}
									</span>
								</div>
							</div>
						</div>

						{negativeAnswers.length && (
							<Button className={"mb-4 mx-auto w-[20rem]"}>
								Продолжить изучение - {negativeAnswers.length} терминов
							</Button>
						)}
						<Button className={"w-[20rem] mx-auto"} variant={"secondary"}>
							Начать заново
						</Button>
					</div>
				)}
			</section>
		)
	}
}
