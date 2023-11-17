"use client"
import React from "react"

type SlideProps = {
	slide: string | number
}

export const Slide = (props: SlideProps) => {
	const { slide } = props
	/**
	 * Applies styles when user is dragging a card
	 * */
	const [dragging, setDragging] = React.useState(false)
	/**
	 * We need to distinguish when user dragged it to the left or to the right
	 * */
	const [dragDirection, setDragDirection] = React.useState<"left" | "right" | null>(null)

	const handleDragStart = () => setDragging(true)

	// The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
	const handleDragLeft = (e: React.DragEvent) => {
		const mouseXCoordinate = e.clientX
		const dragElementWidth = e.currentTarget.clientWidth
		// if mouse coordinate exceeds the element width it means we're dragging it to the right
		setDragDirection(mouseXCoordinate > dragElementWidth ? "right" : "left")
	}

	// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
	const handleDragEnter = () => {
		setDragDirection(null)
	}

	// The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
	const handleDragEnd = () => {
		setDragging(false)
		setDragDirection(null)
	}

	return (
		<div
			className={"min-w-[100%]  h-xs bg-green-300 cursor-grab draggable-card relative"}
			data-dragging={dragging}
			onDragStart={handleDragStart}
			onDragLeave={handleDragLeft}
			onDragEnd={handleDragEnd}
			onDragEnter={handleDragEnter}
			draggable={true}
		>
			{slide}
			{dragDirection === "left" && <span className={"absolute top-6 left-0"}>#</span>}
			{dragDirection === "right" && <span className={"absolute top-6 right-0"}>*</span>}
		</div>
	)
}
