import React from "react"
import { Card } from "~/entites"
import { TermType } from "~/app/models"
import { PropsWithClassName } from "~/app/types"
import { FlippableContent } from "../flippable/FlippableContent"
import { useFlippable } from "../flippable/useFlippable"

export type QuizCardProps = TermType & PropsWithClassName

export function QuizCard(props: QuizCardProps) {
	const { title, description, className } = props
	const [isFlipped, setIsFlipped] = React.useState(false)

	const swipeable = document.getElementById("swiper")?.lastElementChild?.querySelector("#swipeable")
	useFlippable(swipeable, Boolean(isFlipped))

	function handleClick() {
		const isDragging = document.querySelector("[data-drag-active='true']")
		if (isDragging) return
		setIsFlipped(!isFlipped)
	}
	return (
		<FlippableContent
			onClick={handleClick}
			className={className}
			frontSideContent={<Card title={title} />}
			backSideContent={<Card title={description} />}
		/>
	)
}
