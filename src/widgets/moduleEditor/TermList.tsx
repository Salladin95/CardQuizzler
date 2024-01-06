import React from "react"
import { TermType } from "~/app/models"
import { TermEditor } from "./TermEditor"
import { AddIcon, Button } from "~/shared"
import { AnimatePresence, Reorder } from "framer-motion"

type TermListProps = {
	terms: TermType[]
	onReorder: (terms: TermType[]) => void
	onUpdate: (updatedTerm: TermType, index: number) => void
	onDelete: (index: number) => void
	onAddTerm: (at: number) => void
}

export function TermList(props: TermListProps) {
	const { terms, onAddTerm, onDelete, onReorder, onUpdate } = props
	return (
		<Reorder.Group axis="y" values={terms} onReorder={onReorder} className="flex flex-col">
			<AnimatePresence initial={false}>
				{terms.map((term, index) => (
					<Reorder.Item
						key={term.id}
						value={term}
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
						}}
						exit={{ opacity: 0, height: 0 }}
						transition={{ opacity: { duration: 0.4 }, height: { duration: 0.4 }, ease: "easeOut" }}
						className="hover:cursor-grab relative"
					>
						<div className={"mb-4"}>
							<TermEditor index={index} term={term} onUpdate={onUpdate} onDelete={onDelete} />
							<Button
								variant="secondary"
								className="w-min mx-auto absolute-x-center z-50 -bottom-[3%] opacity-0 transition-opacity
								hover:opacity-100 before:absolute before:content-[''] before:w-[50vw] before:h-8"
								onClick={() => onAddTerm(index + 1)}
							>
								<AddIcon />
							</Button>
						</div>
					</Reorder.Item>
				))}
			</AnimatePresence>
		</Reorder.Group>
	)
}
