"use client"
import React from "react"

type SlideProps = {
	slide: string | number
	index: number
	onDrop?: (e?: React.SyntheticEvent) => void
}

export const DraggableSlide = (props: SlideProps) => {
	const { slide, onDrop, index } = props
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

		if (mouseXCoordinate === 0) return

		// if mouse coordinate exceeds the element width it means we're dragging it to the right
		setDragDirection(mouseXCoordinate > dragElementWidth ? "right" : "left")
	}

	// The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
	const handleDragEnd = (e?: React.SyntheticEvent) => {
		if (dragDirection && onDrop) {
			if (dragDirection === "right") {
				console.log(dragDirection)
				onDrop(e)
			} else if (dragDirection === "left") {
				console.log(dragDirection)
				onDrop(e)
			}
		}
		setDragging(false)
		setDragDirection(null)
	}

	// The dragover event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
	const handleDragOver = (e: React.DragEvent) => {}

	const [offsetX, setOffsetX] = React.useState<number>(null!)
	const [offsetY, setOffsetY] = React.useState<number>(null!)
	const handleDrag = (e: React.DragEvent) => {
		const mouseXCoordinate = e.clientX
		const dragElementWidth = e.currentTarget.clientWidth
		const slide = e.currentTarget as HTMLDivElement
	}

	return (
		<div
			className={`card]`}
			data-dragging={dragging}
			onDragStart={handleDragStart}
			onDragLeave={handleDragLeft}
			onDragEnd={handleDragEnd}
			// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
			onDragEnter={() => setDragDirection(null)}
			onDragOver={handleDragOver}
			onDrag={handleDrag}
			draggable={Boolean(onDrop)}
		>
			{slide}
			{dragDirection === "left" && <span className={"absolute top-6 left-0"}>#</span>}
			{dragDirection === "right" && <span className={"absolute top-6 right-0"}>*</span>}
		</div>
	)
}
