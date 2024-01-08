import React from "react"
import { TermType } from "~/app/models"
import { motion } from "framer-motion"
import { TermEditor } from "./TermEditor"
import { TermListProps } from "./TermList"
import { AddIcon, Button } from "~/shared"

type TermListItemProps = {
	index: number
	term: TermType
} & Omit<TermListProps, "items">

export function TermListItem(props: TermListItemProps) {
	const { term, index, onAddTerm, onDelete, onUpdate } = props
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
			}}
			exit={{ opacity: 0, height: 0 }}
			transition={{ opacity: { duration: 0.4 }, height: { duration: 0.4 }, ease: "easeOut" }}
			className="relative"
		>
			<div className={"mb-4"}>
				<TermEditor index={index} term={term} onUpdate={onUpdate} onDelete={onDelete} />
				<Button
					variant="secondary"
					className="w-min mx-auto absolute-x-center z-50 -bottom-[12%] opacity-0 transition-opacity hover:opacity-100"
					onClick={() => onAddTerm(index + 1)}
					data-no-dnd="true"
				>
					<AddIcon />
				</Button>
			</div>
		</motion.div>
	)
}
