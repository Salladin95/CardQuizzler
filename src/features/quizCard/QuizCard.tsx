import React from "react"
import { TermType } from "~/app/models"
import { PropsWithClassName } from "~/app/types"
import { DisplayEditorContent, FlippableContent, useFlippable } from "~/features/"

export type QuizCardProps = TermType &
	PropsWithClassName & {
		isAnimating?: boolean
	}

export function QuizCard(props: QuizCardProps) {
	const { title, description, className, isAnimating } = props
	const [isFlipped, setIsFlipped] = React.useState(false)
	const [flippableTarget, setFlippableTarget] = React.useState<Element | null>(null)

	const isFlipping = useFlippable(flippableTarget, Boolean(isFlipped))

	function handleClick(e: React.SyntheticEvent) {
		const isDragging = e.currentTarget.closest("[data-drag-active='true']")
		if (isDragging || isAnimating || isFlipping) return
		setIsFlipped(!isFlipped)
		setFlippableTarget(e.currentTarget.closest(".swipeable"))
	}

	return (
		<FlippableContent
			className={`${className} quiz-card`}
			frontSideContent={<DisplayEditorContent onClick={handleClick} content={title} />}
			backSideContent={<DisplayEditorContent onClick={handleClick} content={description} />}
		/>
	)
}
