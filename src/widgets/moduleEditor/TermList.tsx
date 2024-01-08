import React from "react"
import { TermType } from "~/app/models"
import { TermListItem } from "./TermListItem"
import { AnimatePresence } from "framer-motion"
import { SortableItem, withSortableGroup } from "~/features/sortable"

export type TermListProps = {
	items: TermType[]
	onUpdate: (updatedTerm: TermType, index: number) => void
	onDelete: (index: number) => void
	onAddTerm: (at: number) => void
}

function TermListComponent(props: TermListProps) {
	const { items, onAddTerm, onDelete, onUpdate } = props
	return (
		<AnimatePresence initial={false}>
			{items.map((term, index) => (
				<SortableItem key={term.id} {...term}>
					<TermListItem index={index} term={term} onUpdate={onUpdate} onDelete={onDelete} onAddTerm={onAddTerm} />
				</SortableItem>
			))}
		</AnimatePresence>
	)
}

export const TermList = withSortableGroup<TermType, Omit<TermListProps, "items">>(TermListComponent)
