import React from "react"
import { cn } from "~/shared/lib"
import { TermType } from "~/app/models"
import { TermEditor } from "./TermEditor"
import { AddIcon, Button } from "~/shared"
import { AnimatePresence, motion } from "framer-motion"
import { SortableItem, withSortableGroup } from "~/features/sortable"

export type TermListProps = {
	items: TermType[]
	onUpdate: (index: number, updatedTerm: TermType) => void
	onDelete: (index: number) => void
	onAddTerm: (at: number) => void
}

function TermListComponent(props: TermListProps) {
	const { items, onAddTerm, onDelete, onUpdate } = props
	return (
		<AnimatePresence initial={false}>
			{items.map((term, index) => (
				<SortableItem key={term.id} {...term}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
						}}
						exit={{ opacity: 0, height: 0 }}
						transition={{ opacity: { duration: 0.3 }, height: { duration: 0.4 }, ease: "easeOut" }}
						className="relative"
					>
						<div className={cn("mb-4", { "mb-12": index === items.length - 1 })}>
							<TermEditor index={index} term={term} onUpdate={onUpdate} onDelete={onDelete} />
							<Button
								variant="secondary"
								className="w-min mx-auto absolute-x-center z-[200] -bottom-[1.8rem] opacity-0 transition-opacity hover:opacity-100"
								onClick={() => onAddTerm(index + 1)}
								data-no-dnd="true"
							>
								<AddIcon />
							</Button>
						</div>
					</motion.div>
				</SortableItem>
			))}
		</AnimatePresence>
	)
}

export const TermList = withSortableGroup<TermType, Omit<TermListProps, "items">>(TermListComponent)
