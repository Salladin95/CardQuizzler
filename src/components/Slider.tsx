"use client"
import React from "react"
import { Slide } from "./Slide"

const slides = [1, 2, 3, 4, 5, 6]

export const Slider = () => {
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
		<section className={"max-w-2lg overflow-hidden"}>
			<div className="flex mb-4 p-4 gap-x-4 transition-transform" ref={slider}>
				{slides.map((slide) => (
					<Slide slide={slide} key={slide} />
				))}
			</div>
			<div className={"flex gap-x-4 mb-4"}>
				<button onClick={handleNegativeAnswer} className={"p-2 border-[1px] border-danger-300 rounded"}>
					Negative
				</button>
				<button onClick={handlePositiveAnswer} className={"p-2 border-[1px] border-green-300 rounded"}>
					Positive
				</button>
			</div>
			<div>
				<button onClick={handleBack} className={"p-2 border-[1px] border-black-100 rounded"}>
					Back
				</button>
			</div>
		</section>
	)
}
