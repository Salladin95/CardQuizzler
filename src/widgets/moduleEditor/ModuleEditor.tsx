"use client"
import React from "react"
import { TermType } from "~/app/models"
import { Button, Input } from "~/shared"
import { TermList } from "~/widgets/moduleEditor/TermList"
import { mockEmptyTerm, mockEmptyTerms } from "~/lib/mock"

type ModuleEditorProps = {
	terms?: TermType[]
	moduleName?: string
	onSubmit: (moduleName: string, terms: TermType[]) => void
}

export function ModuleEditor(props: ModuleEditorProps) {
	const { onSubmit } = props
	const [terms, setTerms] = React.useState<TermType[]>(props.terms || mockEmptyTerms())
	const [moduleName, setModuleName] = React.useState(props.moduleName || "")

	// Created separated value for error, because I don't want to show input's error state on first render
	const [hasError, setHasError] = React.useState(false)

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

	// For "disabled" state I don't use "hasError" value because I want to disable it for the first render
	const isSubmitDisabled = !terms.length || !moduleName

	return (
		<section className={"overflow-hidden p-1"}>
			<div className="flex justify-between mb-4">
				<h1 className="h2">{title}</h1>
				<Button disabled={isSubmitDisabled} className="w-min" onClick={handleSubmit}>
					{submitBtnTitle}
				</Button>
			</div>
			<Input
				value={moduleName}
				onChange={(e) => {
					const value = e.currentTarget.value
					setModuleName(value)
					setHasError(!value)
				}}
				placeholder={"Введите название молуя"}
				className={"mb-8"}
				error={hasError}
			/>
			<TermList
				items={terms}
				onReorder={handleReorder}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
				onAddTerm={(index: number) => insertTerm(mockEmptyTerm(), index)}
			/>
			<Button className="w-min mx-auto" onClick={() => insertTerm(mockEmptyTerm())}>
				Добавить
			</Button>
			<Button disabled={isSubmitDisabled} className="w-min ml-auto px-8 py-6" onClick={handleSubmit}>
				{submitBtnTitle}
			</Button>
		</section>
	)
}
