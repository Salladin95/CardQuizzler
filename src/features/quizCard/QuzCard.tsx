import React from "react"
import { TermType } from "~/app/models"
import { FlippableContent } from "~/features/flippable/FlippableContent"
import { PropsWithClassName } from "~/app/types"
import { Card } from "~/entites"
import { useFlippable } from "~/features/flippable/useFlippable"

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
