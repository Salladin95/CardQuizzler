import React from "react"
import { TermType } from "~/app/models"
import { AddIcon, Button } from "~/shared"
import { mockEmptyTerm } from "~/lib/mock"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import { TermEditor } from "~/widgets/moduleEditor/TermEditor"

type TermListProps = {
	terms: TermType[]
	onReorder: (terms: TermType[]) => void
	onUpdate: (updatedTerm: TermType, index: number) => void
	onDelete: (index: number) => void
	onInsert: (newTerm: TermType, at: number) => void
	onAddTerm: () => void
	submitBtnTitle: string
	onSubmit: () => void
}

export function TermList(props: TermListProps) {
	const { terms, onInsert, onDelete, onReorder, onUpdate, onAddTerm, onSubmit, submitBtnTitle } = props
	return (
		<Reorder.Group axis="y" values={terms} onReorder={onReorder} className="flex flex-col gap-4">
			<AnimatePresence initial={false}>
				{terms.map((term, index) => (
					<Reorder.Item
						value={term}
						key={term.id}
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
						}}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="relative hover:cursor-grab"
					>
						<motion.div>
							<TermEditor index={index} term={term} onUpdate={onUpdate} onDelete={onDelete} />
							<motion.div
								layout
								initial={false}
								whileHover={{ opacity: 1 }}
								className="w-full flex-center absolute z-50 -bottom-[13%]"
								style={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<Button variant="secondary" className="w-min" onClick={() => onInsert(mockEmptyTerm(), index + 1)}>
									<AddIcon />
								</Button>
							</motion.div>
						</motion.div>
					</Reorder.Item>
				))}

				{/* TODO: FIX - THESE BUTTONS SHOULDN"T BE HERE, BUT I PLACE IT HERE BECAUSE THEY JUMP WHEN I DELETE TERM */}
				<motion.div layout initial={false} animate={{ height: "auto" }} transition={{ duration: 0.5 }}>
					<Button className="w-min mx-auto mt-12" onClick={onAddTerm}>
						Добавить
					</Button>
					<Button className="w-min ml-auto px-8 py-6" onClick={onSubmit}>
						{submitBtnTitle}
					</Button>
				</motion.div>
			</AnimatePresence>
		</Reorder.Group>
	)
}
