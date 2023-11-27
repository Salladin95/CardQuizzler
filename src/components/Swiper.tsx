"use client"
import React from "react"
import AnimatedCard from "~/components/AnimatedCard"
import { useAnimate } from "framer-motion"

const slides = [1, 2, 3, 4, 5, 6]

export const Swiper = () => {
	const [counter, setCounter] = React.useState(0)
	const slider = React.useRef<HTMLDivElement>(null!)
	const [scope, animate] = useAnimate()

	const move = (newCounter: number) => {
		if (!slider.current.children.length) return
		// All elements have the same width
		const firstChild = slider.current.children[0] as HTMLDivElement
		// All elements have the same width, it means if multiply the counter to the element's width, we get its position
		slider.current.style.transform = `translate(-${(firstChild.clientWidth + firstChild.offsetLeft) * newCounter}px)`
		setCounter(newCounter)
	}

	const handlePositiveAnswer = () => {
		const nextCounter = counter + 1
		nextCounter < slides.length && move(nextCounter)
	}

	const handleNegativeAnswer = () => {
		const nextCounter = counter + 1
		nextCounter < slides.length && move(nextCounter)
	}

	const [statedSlides, setStatedSlides] = React.useState(slides)
	const [swipedSlides, setSwipedSlides] = React.useState<number[]>([])

	const handleSwipe = () => {
		setSwipedSlides([...swipedSlides, statedSlides[0]])
		setStatedSlides(statedSlides.slice(1))
	}

	const [animateBack, setAnimateBack] = React.useState(false)
	const handleBack = () => {
		setStatedSlides([swipedSlides[swipedSlides.length - 1], ...statedSlides])
		setSwipedSlides(swipedSlides.slice(0, swipedSlides.length - 1))
		setAnimateBack(true)
	}

	React.useEffect(() => {
		console.log({
			swipedSlides,
			statedSlides,
		})
	}, [swipedSlides, statedSlides])

	return (
		<section className={"w-[100vw] h-[90vh] flex-center overflow-hidden"} ref={scope}>
			<div className="flex-center w-full h-full relative" ref={slider}>
				{statedSlides.map((slide) => (
					<AnimatedCard
						key={slide}
						index={slide}
						zIndex={slides.length - slide}
						onSwipe={handleSwipe}
						onBack={handleBack}
						animateBack={animateBack}
						onAnimateBackEnd={() => setAnimateBack(false)}
					/>
				))}
			</div>
		</section>
	)
}
