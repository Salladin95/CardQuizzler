"use client"
import React from "react"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { PropsWithChildren, WithId } from "~/app/types"

type SortableItemProps = PropsWithChildren & WithId

export function SortableItem(props: SortableItemProps) {
	const { children, id } = props

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div {...attributes} {...listeners} ref={setNodeRef} style={style}>
			{children}
		</div>
	)
}
