"use client"
import React from "react"
import { TermType } from "~/app/models"
import { TermEditor } from "~/widgets/moduleEditor/index"
import { mockEmptyTerm, mockEmptyTerms } from "~/lib/mock"
import { AddIcon, Button, Input } from "~/shared"
import { AnimatePresence, motion, Reorder } from "framer-motion"

type ModuleEditorProps = {
	terms?: TermType[]
	moduleName?: string
	onSubmit: (moduleName: string, terms: TermType[]) => void
}

export function ModuleEditor(props: ModuleEditorProps) {
	const { onSubmit } = props

	const [terms, setTerms] = React.useState<TermType[]>(props.terms || mockEmptyTerms())
	const [moduleName, setModuleName] = React.useState(props.moduleName || "")

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

	const handleSubmit = () => onSubmit(moduleName, terms)
	const title = !props.terms ? "Создать новый модуль" : "Обновить модуль"
	const submitBtnTitle = !props.terms ? "Создать" : "Сохранить"

	return (
		<section>
			<div className="flex justify-between mb-4">
				<h1 className={"h2"}>{title}</h1>
				<Button className={"w-min"} onClick={handleSubmit}>
					{submitBtnTitle}
				</Button>
			</div>
			<Input
				value={moduleName}
				onChange={(e) => setModuleName(e.currentTarget.value)}
				placeholder={"Введите название молуя"}
				className={"mb-8"}
			/>
			<Reorder.Group axis={"y"} values={terms} onReorder={setTerms} className={"flex flex-col gap-y-4 mb-12"}>
				<AnimatePresence initial={false}>
					{terms.map((term, index) => (
						<Reorder.Item
							value={term}
							key={term.id}
							initial={{ height: 0, opacity: 0 }}
							animate={{
								opacity: 1,
								height: "auto",
							}}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className={"relative hover:cursor-grab"}
						>
							<TermEditor index={index} term={term} onUpdate={handleUpdate} onDelete={handleDelete} />
							<motion.div
								whileHover={{ opacity: 1 }}
								className={"w-full flex-center absolute z-50 -bottom-[13%]"}
								style={{ opacity: 0 }}
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
						</Reorder.Item>
					))}
				</AnimatePresence>
			</Reorder.Group>
			<Button className={"w-min mx-auto"} onClick={() => insertTerm(mockEmptyTerm())}>
				Добавить
			</Button>
			<Button className={"w-min ml-auto px-8 py-6"} onClick={handleSubmit}>
				{submitBtnTitle}
			</Button>
		</section>
	)
}
