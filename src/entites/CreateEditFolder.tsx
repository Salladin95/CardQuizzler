"use client"
import React from "react"
import * as Yup from "~/yup"
import { AccessType } from "~/app/types"
import { FolderType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { FormField } from "~/entites/FormField"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { ACCESS_TYPE_KEYS, getAccessTypeSelectOptions } from "~/app/constants"
import {
	Button,
	CreateFolderPayload,
	Dialog,
	Input,
	PasswordInput,
	Select,
	useTranslatedFieldErrorMessages,
} from "~/shared"

type CreateEditFolderFormType = CreateFolderPayload

type CreateFolderProps = {
	onSubmit?: (payload: CreateEditFolderFormType) => void
	title?: string
	trigger?: React.ReactNode
	folder?: FolderType
	hasSubmitted?: boolean
}

function getCreateEditFormDefValues(folder?: FolderType): CreateEditFolderFormType {
	return {
		title: folder?.title || "",
		access: folder?.access || AccessType.OPEN,
		password: "",
	}
}

export function CreateEditFolder(props: CreateFolderProps) {
	const t = useTranslations()
	const { onSubmit, title, hasSubmitted, trigger, folder } = props

	// If true we are in edit mode
	const isEditMode = Boolean(folder)

	const [showDialog, setShowDialog] = React.useState(false)

	const createEditFolderValidationSchema = Yup.object({
		title: Yup.string().required(),
		access: Yup.string().required().oneOf(ACCESS_TYPE_KEYS),
		password: Yup.string().protectedByPassword(isEditMode, folder?.access),
	})

	const {
		handleSubmit: handleFormSubmit,
		register,
		formState: { errors },
		reset: resetForm,
		watch,
		control,
		resetField,
	} = useForm<CreateEditFolderFormType>({
		defaultValues: getCreateEditFormDefValues(folder),
		resolver: yupResolver(createEditFolderValidationSchema),
	})

	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	function handleSubmit(formData: CreateEditFolderFormType) {
		setShowDialog(false)
		onSubmit && onSubmit(formData)
		resetForm()
	}

	const accessOption = watch("access")
	const isSubmitDisabled = !!Object.keys(errors).length || hasSubmitted

	React.useEffect(() => {
		resetField("password")
	}, [accessOption, resetField])

	return (
		<Dialog open={showDialog} trigger={trigger} className={"w-[19.375rem] h-[22rem] 640:w-428 768:w-640  py-12 px-8"}>
			<form onSubmit={handleFormSubmit(handleSubmit)}>
				<div className={"relative w-full h-full"}>
					<h1 className={"mb-6 h2 640:h1 text-center text-primary"}>{title}</h1>
					<Input
						{...register("title")}
						placeholder={t("Placeholders.folder")}
						error={Boolean(errors.title)}
						className={"mb-4"}
					/>
					{/*<p className={"mb-2"}>{t("Placeholders.access")}</p>*/}
					<div className={"flex gap-4 mb-8"}>
						{/*<Controller*/}
						{/*	name={"access"}*/}
						{/*	control={control}*/}
						{/*	render={({ field }) => (*/}
						{/*		<Select*/}
						{/*			{...field}*/}
						{/*			placeholder={t("Placeholders.access")}*/}
						{/*			options={getAccessTypeSelectOptions(t)}*/}
						{/*			className={"flex-1"}*/}
						{/*			error={Boolean(errors.access)}*/}
						{/*		/>*/}
						{/*	)}*/}
						{/*/>*/}
						{accessOption === AccessType.PASSWORD && (
							<FormField error={translatedErrorMessages.get("password")}>
								<PasswordInput
									{...register("password")}
									placeholder={t("Placeholders.password")}
									className={"flex-1"}
									error={Boolean(errors.password)}
								/>
							</FormField>
						)}
					</div>
					<Button
						type={"submit"}
						className={"ml-auto w-[10rem]"}
						variant={"primary"}
						disabled={Boolean(isSubmitDisabled)}
					>
						{t("Generics.save")}
					</Button>
				</div>
			</form>
		</Dialog>
	)
}
