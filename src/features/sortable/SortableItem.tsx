"use client"
import React from "react"
import { cn } from "~/shared"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { PropsWithChildren, PropsWithClassName, WithId } from "~/app/types"

type SortableItemProps = PropsWithChildren & WithId & PropsWithClassName

export function SortableItem(props: SortableItemProps) {
	const { children, id, className } = props

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} className={cn("relative", className)}>
			<div {...attributes} {...listeners} className={"absolute inset-0 w-full h-[2rem] cursor-grab z-10"} />
			{children}
		</div>
	)
}
