"use client"
import React from "react"
import AnimatedCard from "~/components/AnimatedCard"
import { mockCards } from "~/components/utils"
import { Card, SwipeDirection, SwiperCard, SwiperData } from "~/components/AnimatedSlide/types"

export const Swiper = () => {
	const [swiperData, setSwiperData] = React.useState<SwiperData<Card>>({
		leftSwipesCounter: 0,
		rightSwipesCounter: 0,
		swipedCards: [],
	})
	const [currentSlides, setCurrentSlides] = React.useState<SwiperCard<Card>[]>([])

	const handleSwipe = (direction: SwipeDirection) => {
		const swipedSlide = { ...currentSlides[0], swipedTowards: direction }
		console.log("swipedSlide")
		console.log(swipedSlide)
		switch (direction) {
			case "left":
				setSwiperData({
					...swiperData,
					leftSwipesCounter: swiperData.leftSwipesCounter + 1,
					swipedCards: [...swiperData.swipedCards, swipedSlide],
				})
				setCurrentSlides(currentSlides.slice(1))
				break
			case "right":
				setSwiperData({
					...swiperData,
					rightSwipesCounter: swiperData.leftSwipesCounter + 1,
					swipedCards: [...swiperData.swipedCards, swipedSlide],
				})
				setCurrentSlides(currentSlides.slice(1))
				break
		}
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
				setCurrentSlides([previousCard, ...currentSlides])
				break
			case "right":
				setSwiperData({
					...swiperData,
					rightSwipesCounter: swiperData.rightSwipesCounter - 1,
					swipedCards: swiperData.swipedCards.slice(0, swiperData.swipedCards.length - 1),
				})
				setCurrentSlides([previousCard, ...currentSlides])
				break
		}
	}

	const cleanSwipedStateOnAnimationEnd = () => {
		const updatedCard = { ...currentSlides[currentSlides.length - 1], swipedTowards: null }
		const updateCurrentCards = [...currentSlides.slice(0, currentSlides.length - 1), updatedCard]
		setCurrentSlides(updateCurrentCards)
	}

	React.useEffect(() => {
		setCurrentSlides(mockCards())
	}, [])

	return (
		<section className={"w-[100vw] h-[90vh] flex-center overflow-hidden"}>
			<div className="flex-center w-full h-full relative">
				{currentSlides.map((slide, index) => (
					<AnimatedCard
						key={slide.id}
						zIndex={currentSlides.length - index}
						onSwipe={handleSwipe}
						card={slide}
						onBackAnimationEnd={cleanSwipedStateOnAnimationEnd}
					/>
				))}
				<button
					disabled={!swiperData.swipedCards.length}
					className={"absolute bottom-[22%] text-black"}
					onClick={handleBack}
				>
					back
				</button>
			</div>
		</section>
	)
}
