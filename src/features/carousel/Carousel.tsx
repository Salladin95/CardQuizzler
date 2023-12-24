"use client"
import React from "react"
import { PropsWithClassName } from "~/app/types"
import { cn } from "~/lib"
import { Card } from "~/entites"
import { CardType } from "~/features/quizCard/model"

type AnswersCounter = {
	positiveAnswerCounter: number
	negativeAnswerCounter: number
	answersStack: ("positive" | "negative")[]
}
type CarouselProps = {
	cards: CardType[]
	inView?: number
} & PropsWithClassName

export function Carousel(props: CarouselProps) {
	const { cards, className, inView = 1 } = props
	const [sliderCounter, setSlideCounter] = React.useState(0)
	const [answersCounter, setAnswersCounter] = React.useState<AnswersCounter>({
		positiveAnswerCounter: 0,
		negativeAnswerCounter: 0,
		answersStack: [],
	})
	const slider = React.useRef<HTMLDivElement>(null!)

	function move(newCounter: number) {
		// Check if there are any card elements in the slider
		if (!slider.current.children.length) return

		const translationDistance = (slider.current.clientWidth - slider.current.offsetLeft) * newCounter

		// Apply the translation to the slider using the transform CSS property
		slider.current.style.transform = `translate(-${translationDistance}px)`

		// Update the slide counter state with the newCounter value
		setSlideCounter(newCounter)
	}

	const handlePositiveAnswer = () => {
		const nextCounter = sliderCounter + 1
		if (nextCounter > cards.length) return
		move(nextCounter)
		setAnswersCounter({
			...answersCounter,
			positiveAnswerCounter: Math.min(cards.length, answersCounter.positiveAnswerCounter + 1),
			answersStack: [...answersCounter.answersStack, "positive"],
		})
	}

	const handleNegativeAnswer = () => {
		const nextCounter = sliderCounter + 1
		if (nextCounter > cards.length) return
		move(nextCounter)
		setAnswersCounter({
			...answersCounter,
			positiveAnswerCounter: Math.max(0, answersCounter.positiveAnswerCounter - 1),
			answersStack: [...answersCounter.answersStack, "negative"],
		})
	}

	const handleBack = () => {
		const prevCounter = sliderCounter - 1
		if (prevCounter < 0) return
		move(prevCounter)
		setAnswersCounter({
			...answersCounter,
			answersStack: answersCounter.answersStack.slice(0, answersCounter.answersStack.length - 1),
		})
	}

	return (
		<section className={"overflow-hidden container"}>
			<div className="flex mb-4 p-4 gap-x-4 transition-transform" ref={slider}>
				{cards.map((card) => (
					<Card
						key={card.id}
						{...card}
						className={cn("bg-gray-800 h-[50vh] relative text-white box-border", className)}
						style={{
							minWidth: `calc((100% - 32px) / ${inView})`,
						}}
					/>
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
