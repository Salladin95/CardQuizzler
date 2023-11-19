"use client"
import React from "react"
import { DraggableSlide } from "./DraggableSlide"

const slides = [1, 2, 3, 4, 5, 6]

export const Swiper = () => {
	const [counter, setCounter] = React.useState(0)
	const slider = React.useRef<HTMLDivElement>(null!)

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

	const handleBack = () => {
		const prevCounter = counter - 1
		prevCounter >= 0 && move(prevCounter)
	}

	return (
		<section className={"container"}>
			<div
				style={{
					aspectRatio: "1 / 3",
					perspective: "1000px",
					perspectiveOrigin: "50%",
					transformStyle: "preserve-3d",
				}}
				className="mb-4 p-4 relative h-[70vh]"
				ref={slider}
			>
				{slides.map((slide, index) => (
					<DraggableSlide slide={slide} key={slide} index={index} onDrop={() => console.log("DROPPED")} />
				))}
			</div>
		</section>
	)
}
