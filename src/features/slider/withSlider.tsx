"use client"
import React from "react"
import { PropsWithClassName, WithId } from "~/app/types"
import { cn } from "src/lib"

type AnswersCounter = {
	positiveAnswerCounter: number
	negativeAnswerCounter: number
	answersStack: ("positive" | "negative")[]
}
type SliderProps<T> = {
	slides: (WithId & T)[]
} & PropsWithClassName

const offset = 16

export function withSlider<ComponentProps>(Component: React.ComponentType<ComponentProps>) {
	return function Slider(props: SliderProps<ComponentProps>) {
		const { slides, className, ...rest } = props
		const [sliderCounter, setSlideCounter] = React.useState(0)
		const [answersCounter, setAnswersCounter] = React.useState<AnswersCounter>({
			positiveAnswerCounter: 0,
			negativeAnswerCounter: 0,
			answersStack: [],
		})
		const slider = React.useRef<HTMLDivElement>(null!)

		const move = (newCounter: number) => {
			if (!slider.current.children.length) return
			// All elements have the same width
			const element = slider.current.children[0] as HTMLDivElement
			// All elements have the same width, it means if multiply the sliderCounter to the element's width, we get its position
			slider.current.style.transform = `translate(-${(element.clientWidth + offset) * newCounter}px)`
			setSlideCounter(newCounter)
		}

		const handlePositiveAnswer = () => {
			const nextCounter = sliderCounter + 1
			if (nextCounter > slides.length) return
			move(nextCounter)
			setAnswersCounter({
				...answersCounter,
				positiveAnswerCounter: Math.min(slides.length, answersCounter.positiveAnswerCounter + 1),
				answersStack: [...answersCounter.answersStack, "positive"],
			})
		}

		const handleNegativeAnswer = () => {
			const nextCounter = sliderCounter + 1
			if (nextCounter > slides.length) return
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
					{slides.map((slide) => (
						<Component
							{...slide}
							{...rest}
							key={slide.id}
							// Min width always has to be 100%
							className={cn("dark-blue-gradient h-[50vh] relative", className, "min-w-full")}
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
}
