"use client"
import React from "react"
import * as Yup from "~/yup"
import { ActionBtn } from "~/entites"
import { AccessType } from "~/app/types"
import { useTranslations } from "~/app/i18n"
import { ModuleType, TermType } from "~/app/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { TermList } from "~/widgets/moduleEditor/TermList"
import { ACCESS_TYPE_KEYS, getAccessTypeSelectOptions } from "~/app/constants"
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form"
import { Button, createEmptyTerm, CreateModulePayload, Input, PasswordInput, Select, useAddClassToTag } from "~/shared"

type ModuleEditorProps = {
	module?: ModuleType
	terms: TermType[]
	onSubmit: (payload: CreateModulePayload) => void
	hasSubmitted?: boolean
	isSubmitting?: boolean
}

const getModuleEditorSchema = (isEditMode: boolean, currentAccess?: AccessType) => {
	return Yup.object({
		title: Yup.string().required(),
		access: Yup.string().required().oneOf(ACCESS_TYPE_KEYS),
		password: Yup.string().protectedByPassword(isEditMode, currentAccess),
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

function getModuleEditorFormDefValues(terms: TermType[], module?: ModuleType) {
	return {
		title: module?.title || "",
		access: module?.access || AccessType.OPEN,
		password: "",
		terms: terms,
	}
}

export function ModuleEditor(props: ModuleEditorProps) {
	const t = useTranslations()
	const { terms, onSubmit, hasSubmitted, isSubmitting, module } = props

	const isEditMode = Boolean(module)

	const form = useForm({
		mode: "onTouched",
		resolver: yupResolver(getModuleEditorSchema(isEditMode, module?.access)),
		defaultValues: getModuleEditorFormDefValues(terms, module),
	})

	const {
		control,
		handleSubmit: handleFormSubmit,
		formState: { errors, isSubmitted: isFormSubmitted },
		register,
		watch,
		resetField,
		trigger,
	} = form

	const formTerms = watch("terms")
	const accessOption = watch("access")

	const {
		remove: handleRemoveTerm,
		insert: handleInsertTerm,
		update: updateTerm,
		replace: replaceTerms,
	} = useFieldArray({
		control,
		name: "terms",
	})

	const handleUpdateTerm = (index: number, term: TermType) => {
		updateTerm(index, term)
		isFormSubmitted && trigger("terms")
	}

	const isSubmitDisabled = !!Object.keys(errors).length || !!hasSubmitted
	const submitBtnTitle = !isEditMode ? t("Generics.create") : t("Generics.save")
	const title = !isEditMode ? t("Widgets.createNewModule") : t("Widgets.updateModule")

	useAddClassToTag("hide-scrollbar", "body")

	React.useEffect(() => {
		resetField("password")
		isFormSubmitted && trigger("password")
	}, [accessOption, isFormSubmitted, resetField, trigger])

	return (
		<FormProvider {...form}>
			<form onSubmit={handleFormSubmit(onSubmit)}>
				<section className={"overflow-hidden p-1"}>
					<div className="flex justify-between mb-4">
						<h1 className="h2 text-primary">{title}</h1>
						<ActionBtn
							type={"submit"}
							loading={isSubmitting}
							disabled={isSubmitDisabled}
							className="w-min ml-auto px-8 py-6"
						>
							{submitBtnTitle}
						</ActionBtn>
					</div>
					<Input
						{...register("title")}
						placeholder={t("Placeholders.module")}
						className={"mb-8"}
						error={!!errors.title}
					/>
					<div className={"flex gap-4 mb-8"}>
						<Controller
							name={"access"}
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									placeholder={t("Placeholders.access")}
									options={getAccessTypeSelectOptions(t)}
									className={"flex-1"}
									error={Boolean(errors.access)}
								/>
							)}
						/>
						{accessOption === AccessType.PASSWORD && (
							<PasswordInput
								{...register("password")}
								placeholder={t("Placeholders.password")}
								className={"flex-1"}
								error={Boolean(errors.password)}
							/>
						)}
					</div>
					<TermList
						items={formTerms}
						onReorder={replaceTerms}
						onUpdate={handleUpdateTerm}
						onDelete={handleRemoveTerm}
						onAddTerm={(index: number) => handleInsertTerm(index, createEmptyTerm())}
					/>
					<Button className="w-min mx-auto mb-12" onClick={() => handleInsertTerm(formTerms.length, createEmptyTerm())}>
						{t("Generics.add")}
					</Button>
					<ActionBtn
						type={"submit"}
						loading={isSubmitting}
						disabled={isSubmitDisabled}
						className="w-min ml-auto px-8 py-6"
					>
						{submitBtnTitle}
					</ActionBtn>
				</section>
			</form>
		</FormProvider>
	)
}
