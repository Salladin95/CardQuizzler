"use client"
import React from "react"
import { TermType } from "~/app/models"
import { TermEditor } from "~/app/module/create/ui"
import { mockEmptyTerm } from "~/lib/mock"
import { AddIcon, Button, Input } from "~/shared"
import { AnimatePresence, motion } from "framer-motion"

type ModuleEditorProps = {
	id?: string
}

export function ModuleEditor(props: ModuleEditorProps) {
	const { id } = props
	// TODO: FETCH MODULE IF THERE IS ID
	const [terms, setTerms] = React.useState<TermType[]>([mockEmptyTerm()])

	function insertTerm(newTerm: TermType, at = terms.length) {
		const updatedTerms = [...terms]
		updatedTerms.splice(at, 0, newTerm)
		setTerms(updatedTerms)
	}

	const handleUpdate = React.useCallback((updatedTerm: TermType, index: number) => {
		setTerms((prevTerms) => {
			return prevTerms.map((t, i) => {
				if (i === index) {
					return updatedTerm
				}
				return t
			})
		})
	}, [])

	const handleDelete = React.useCallback((index: number) => {
		setTerms((prevTerms) => prevTerms.filter((_, i) => i !== index))
	}, [])

	return (
		<section>
			<div className="flex justify-between mb-4">
				<h1 className={"h2"}>{!id ? "Создать новый модуль" : "Обновить модуль"}</h1>
				<Button className={"w-min"}>{!id ? "Создать" : "Сохранить"}</Button>
			</div>
			<Input placeholder={"Введите название молуя"} className={"mb-8"} />
			<section className={"flex flex-col gap-y-4 mb-12"}>
				<AnimatePresence initial={false}>
					{terms.map((term, index) => (
						<motion.div
							key={term.id}
							initial={{ height: 0, opacity: 0 }}
							animate={{
								opacity: 1,
								height: "auto",
							}}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className={"relative"}
						>
							<TermEditor index={index} term={term} onUpdate={handleUpdate} onDelete={handleDelete} />
							<motion.div
								whileHover={{ opacity: 1 }}
								className={"w-full flex-center absolute z-50 -bottom-[13%]"}
								initial={{ opacity: 0 }}
								transition={{ opacity: { duration: 0.1 } }}
							>
								<Button
									variant={"secondary"}
									className={"w-min"}
									onClick={() => insertTerm(mockEmptyTerm(), index + 1)}
								>
									<AddIcon />
								</Button>
							</motion.div>
						</motion.div>
					))}
				</AnimatePresence>
			</section>
			<Button className={"w-min mx-auto"} onClick={() => insertTerm(mockEmptyTerm())}>
				Добавить
			</Button>
			<Button className={"w-min ml-auto px-8 py-6"}>{!id ? "Создать" : "Сохранить"}</Button>
		</section>
	)
}
