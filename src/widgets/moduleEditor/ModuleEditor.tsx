"use client"
import React from "react"
import { TermType } from "~/app/models"
import { mockEmptyTerm, mockEmptyTerms } from "~/lib/mock"
import { Button, Input } from "~/shared"
import { TermList } from "./TermList"

type ModuleEditorProps = {
	terms?: TermType[]
	moduleName?: string
	onSubmit: (moduleName: string, terms: TermType[]) => void
}

export function ModuleEditor(props: ModuleEditorProps) {
	const { onSubmit } = props
	const [terms, setTerms] = React.useState<TermType[]>(props.terms || mockEmptyTerms())
	const [moduleName, setModuleName] = React.useState(props.moduleName || "")

	const insertTerm = (newTerm: TermType, at = terms.length) => {
		const updatedTerms = [...terms]
		updatedTerms.splice(at, 0, newTerm)
		setTerms(updatedTerms)
	}

	const handleUpdate = React.useCallback((updatedTerm: TermType, index: number) => {
		setTerms((prevTerms) => prevTerms.map((t, i) => (i === index ? updatedTerm : t)))
	}, [])

	const handleDelete = React.useCallback((index: number) => {
		setTerms((prevTerms) => prevTerms.filter((_, i) => i !== index))
	}, [])

	const handleReorder = (newTerms: TermType[]) => {
		setTerms(newTerms)
	}

	const handleSubmit = () => onSubmit(moduleName, terms)
	const title = !props.terms ? "Создать новый модуль" : "Обновить модуль"
	const submitBtnTitle = !props.terms ? "Создать" : "Сохранить"

	return (
		<section>
			<div className="flex justify-between mb-4">
				<h1 className="h2">{title}</h1>
				<Button className="w-min" onClick={handleSubmit}>
					{submitBtnTitle}
				</Button>
			</div>
			<Input
				value={moduleName}
				onChange={(e) => setModuleName(e.currentTarget.value)}
				placeholder={"Введите название молуя"}
				className={"mb-8"}
			/>
			<TermList
				terms={terms}
				onReorder={handleReorder}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
				onInsert={insertTerm}
				onSubmit={handleSubmit}
				submitBtnTitle={submitBtnTitle}
				onAddTerm={() => insertTerm(mockEmptyTerm())}
			/>
		</section>
	)
}
