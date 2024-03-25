import React from "react"
import { TermType } from "~/app/models"
import { useFlippable } from "~/shared/"
import { FlippableContent } from "~/entites/"
import { PropsWithClassName } from "~/app/types"
import { DisplayEditorContent } from "./DisplayEditorContent"

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

	const term: TermType = { title, description, id: props.id, moduleID: props.moduleID }

	return (
		<FlippableContent
			className={`${className} quiz-card`}
			frontSideContent={<DisplayEditorContent term={term} onClick={handleClick} content={title} />}
			backSideContent={<DisplayEditorContent term={term} onClick={handleClick} content={description} />}
		/>
	)
}
