"use client"
import React from "react"
import { DraggableSlide } from "@/components/DraggableSlide"

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
		<section className={"max-w-2lg h-[70vh] relative"}>
			<div className="mb-4 p-4" ref={slider}>
				{slides.map((slide, index) => (
					<DraggableSlide slide={slide} key={slide} index={index} onDrop={() => console.log("DROPPED")} />
				))}
			</div>
		</section>
	)
}
