import React from "react"
import { TermType } from "~/app/models"
import { PropsWithClassName } from "~/app/types"
import { useFlippable } from "../flippable/useFlippable"
import { FlippableContent } from "../flippable/FlippableContent"
import { DisplayEditorContent } from "~/features/quizCard/DisplayEditorContent"

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
			frontSideContent={<DisplayEditorContent content={title} />}
			backSideContent={<DisplayEditorContent content={description} />}
		/>
	)
}
