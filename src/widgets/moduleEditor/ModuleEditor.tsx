"use client"
import React from "react"
import * as Yup from "~/yup"
import { ActionBtn } from "~/entites"
import { AccessType } from "~/app/types"
import { useTranslations } from "~/app/i18n"
import { ModuleType, TermType } from "~/app/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useFieldArray, useForm } from "react-hook-form"
import { createEmptyTerm, createEmptyTerms } from "./lib"
import { TermList } from "~/widgets/moduleEditor/TermList"
import { ACCESS_TYPE_KEYS, getAccessTypeSelectOptions } from "~/app/constants"
import { Button, createPasswordValidation, Input, Select, useAddClassToTag } from "~/shared"

type ModuleEditorProps = {
	module?: ModuleType
	onSubmit: (moduleName: string, terms: TermType[], access: AccessType, password: string) => void
	hasSubmitted?: boolean
	isSubmitting?: boolean
}

const getModuleEditorSchema = (isEditMode: boolean, currentAccess?: AccessType) => {
	return Yup.object({
		title: Yup.string().required(),
		access: Yup.string().required().oneOf(ACCESS_TYPE_KEYS),
		password: createPasswordValidation(isEditMode, currentAccess),
		terms: Yup.array()
			.of(
				Yup.object().shape({
					id: Yup.string().required(),
					moduleID: Yup.string().required(),
					title: Yup.string().required(),
					description: Yup.string().required(),
				}),
			)
			.required(),
	})
}

type ModuleEditorFormType = {
	title: string
	access: AccessType
	password?: string
	terms: TermType[]
}

function getModuleEditorFormDefValues(module?: ModuleType) {
	return {
		title: module?.title || "",
		access: module?.access || AccessType.OPEN,
		password: "",
		terms: module?.terms || createEmptyTerms(),
	}
}

export function ModuleEditor(props: ModuleEditorProps) {
	const t = useTranslations()
	const { onSubmit, hasSubmitted, isSubmitting, module } = props

	const isEditMode = Boolean(module)

	const schema = React.useMemo(() => {
		return getModuleEditorSchema(isEditMode, module?.access)
	}, [isEditMode, module?.access])

	const formDefValues = React.useMemo(() => {
		return getModuleEditorFormDefValues(module)
	}, [module])

	const {
		control,
		handleSubmit: handleFormSubmit,
		formState: { errors },
		register,
		watch,
		resetField,
		setValue,
	} = useForm({
		mode: "onTouched",
		resolver: yupResolver(schema),
		defaultValues: formDefValues,
	})

	const accessOption = watch("access")
	const password = watch("password")
	const terms = watch("terms")

	const setTerms = React.useCallback((newTerms: TermType[]) => setValue("terms", newTerms), [setValue])

	const { remove: handleRemoveTerm, insert: handleInsertTerm } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "terms", // unique name for your Field Array
	})

	const handleUpdateTerm = React.useCallback(
		(index: number, updatedTerm: TermType) => {
			setTerms(terms.map((t, i) => (i === index ? updatedTerm : t)))
		},
		[setTerms, terms],
	)

	useAddClassToTag("hide-scrollbar", "body")

	const title = !isEditMode ? t("Widgets.createNewModule") : t("Widgets.updateModule")
	const submitBtnTitle = !isEditMode ? t("Generics.create") : t("Generics.save")

	function handleSubmit(data: ModuleEditorFormType) {
		console.log("submitForm", data)
	}

	React.useEffect(() => {
		console.log("errors", errors)
	}, [errors])

	React.useEffect(() => {
		console.log("terms", terms)
	}, [terms])

	return (
		<form onSubmit={handleFormSubmit(handleSubmit)}>
			<section className={"overflow-hidden p-1"}>
				<div className="flex justify-between mb-4">
					<h1 className="h2 text-primary">{title}</h1>
					<Button disabled={false} className="w-min" type={"submit"}>
						{submitBtnTitle}
					</Button>
				</div>
				<Input
					{...register("title")}
					placeholder={t("Placeholders.module")}
					className={"mb-8"}
					error={!!errors.title}
				/>
				<div className={"flex gap-4 mb-8"}>
					<Select
						defaultValue={accessOption}
						// onChange={(option) => setAccessOption(option as AccessType)}
						placeholder={"Select access"}
						options={getAccessTypeSelectOptions(t)}
						className={"flex-1"}
					/>
					{accessOption === AccessType.PASSWORD && (
						<Input
							value={password}
							onChange={(e) => {
								const value = e.currentTarget.value
								// setPassword(value)
							}}
							placeholder={t("Placeholders.password")}
							className={"flex-1"}
							// error={hasPasswordError}
						/>
					)}
				</div>
				<TermList
					items={terms}
					onReorder={setTerms}
					onUpdate={handleUpdateTerm}
					onDelete={handleRemoveTerm}
					onAddTerm={(index: number) => handleInsertTerm(index, createEmptyTerm())}
				/>
				<Button className="w-min mx-auto mb-12" onClick={() => handleInsertTerm(terms.length, createEmptyTerm())}>
					{t("Generics.add")}
				</Button>
				<ActionBtn
					loading={isSubmitting}
					// disabled={isSubmitDisabled}
					className="w-min ml-auto px-8 py-6"
					// onClick={handleSubmit}
				>
					{submitBtnTitle}
				</ActionBtn>
			</section>
		</form>
	)
}
