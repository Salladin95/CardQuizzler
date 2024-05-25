"use client"
import React from "react"
import { TermType } from "~/app/models"
import { ActionBtn } from "~/entites"
import { AccessType } from "~/app/types"
import { useTranslations } from "~/app/i18n"
import { createEmptyTerm, createEmptyTerms } from "./lib"
import { TermList } from "~/widgets/moduleEditor/TermList"
import useAddClassToTag from "~/shared/hooks/useAddClassToTag"
import { Button, createOption, Input, Select } from "~/shared"

type ModuleEditorProps = {
	terms?: TermType[]
	moduleName?: string
	onSubmit: (moduleName: string, terms: TermType[], access: AccessType, password: string) => void
	hasSubmitted?: boolean
	isSubmitting?: boolean
}

export function ModuleEditor(props: ModuleEditorProps) {
	const t = useTranslations()
	const { onSubmit, hasSubmitted, isSubmitting } = props
	const [terms, setTerms] = React.useState<TermType[]>(props.terms || createEmptyTerms())
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

	useAddClassToTag("hide-scrollbar", "body")

	const accessOptions = [
		[AccessType.OPEN, t("Labels.open")],
		[AccessType.PASSWORD, t("Labels.password")],
		[AccessType.ONLY_ME, t("Labels.onlyMe")],
	].map((option) => createOption(...option))

	const [accessOption, setAccessOption] = React.useState<AccessType>(AccessType.OPEN)
	const [password, setPassword] = React.useState("")

	const handleSubmit = () => onSubmit(moduleName, terms, accessOption, password)
	const title = !props.terms ? t("Widgets.createNewModule") : t("Widgets.updateModule")
	const submitBtnTitle = !props.terms ? t("Generics.create") : t("Generics.save")

	const hasPasswordError = accessOption === AccessType.PASSWORD && !password

	// For "disabled" state I don't use "hasError" value because I want to disable it for the first render
	const isSubmitDisabled = !terms.length || !moduleName || hasSubmitted || hasPasswordError

	return (
		<section className={"overflow-hidden p-1"}>
			<div className="flex justify-between mb-4">
				<h1 className="h2 text-primary">{title}</h1>
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
				placeholder={t("Placeholders.module")}
				className={"mb-8"}
				error={hasError}
			/>
			<div className={"flex gap-4 mb-8"}>
				<Select
					defaultValue={accessOption}
					onChange={(option) => setAccessOption(option as AccessType)}
					placeholder={"Select access"}
					options={accessOptions}
					className={"flex-1"}
				/>
				{accessOption === AccessType.PASSWORD && (
					<Input
						value={password}
						onChange={(e) => {
							const value = e.currentTarget.value
							setPassword(value)
						}}
						placeholder={t("Placeholders.password")}
						className={"flex-1"}
						error={!password}
					/>
				)}
			</div>

			<TermList
				items={terms}
				onReorder={handleReorder}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
				onAddTerm={(index: number) => insertTerm(createEmptyTerm(), index)}
			/>
			<Button className="w-min mx-auto mb-12" onClick={() => insertTerm(createEmptyTerm())}>
				{t("Generics.add")}
			</Button>
			<ActionBtn
				loading={isSubmitting}
				disabled={isSubmitDisabled}
				className="w-min ml-auto px-8 py-6"
				onClick={handleSubmit}
			>
				{submitBtnTitle}
			</ActionBtn>
		</section>
	)
}
