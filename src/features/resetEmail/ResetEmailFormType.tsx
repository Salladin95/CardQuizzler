import React from "react"
import * as Yup from "~/yup"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { Input, useTranslatedFieldErrorMessages } from "~/shared"

const resetEmailFormSchema = Yup.object({
	email: Yup.string().required().email(),
	code: Yup.number().codeLength().required().nullable(),
})
export type ResetEmailFormType = Yup.InferType<typeof resetEmailFormSchema>

export enum ResetEmailFormEnum {
	EMAIL = "email",
	CODE = "code",
}

export function getResetFormDefaultValues(): ResetEmailFormType {
	return {
		email: "",
		code: null,
	}
}

type ResetEmailFormProps = {
	currentEmail: string
	isSubmitting: boolean
	hasSubmitError: boolean
	onSubmit: (form: ResetEmailFormType) => void
}

export function ResetEmailForm(props: ResetEmailFormProps) {
	const t = useTranslations()
	const { isSubmitting, hasSubmitError, onSubmit: onSubmitProp } = props

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		reset,
	} = useForm<ResetEmailFormType>({
		defaultValues: getResetFormDefaultValues(),
		resolver: yupResolver(resetEmailFormSchema),
		mode: "onTouched",
	})

	const newEmail = watch(ResetEmailFormEnum.EMAIL)

	function onSubmit(form: ResetEmailFormType) {
		reset(getResetFormDefaultValues)
		onSubmitProp(form)
	}

	const translatedErrors = useTranslatedFieldErrorMessages(errors)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"text-primary"}>
			<FormFieldWithLabel
				label={t("Labels.code")}
				id={ResetEmailFormEnum.CODE}
				error={translatedErrors.get(ResetEmailFormEnum.CODE)}
			>
				<Input
					{...register(ResetEmailFormEnum.CODE)}
					id={ResetEmailFormEnum.CODE}
					error={Boolean(errors?.code)}
					className={"mb-8"}
					placeholder={t("Placeholders.code")}
				/>
			</FormFieldWithLabel>
			<FormFieldWithLabel
				label={t("Labels.email")}
				id={ResetEmailFormEnum.EMAIL}
				error={translatedErrors.get(ResetEmailFormEnum.EMAIL)}
			>
				<Input
					{...register(ResetEmailFormEnum.EMAIL)}
					id={ResetEmailFormEnum.EMAIL}
					error={Boolean(errors?.email)}
					className={"mb-8"}
					placeholder={t("Placeholders.email")}
				/>
			</FormFieldWithLabel>

			<ActionBtn
				disabled={!newEmail || hasSubmitError || Boolean(Object.keys(errors).length)}
				loading={isSubmitting}
				type={"submit"}
			>
				{t("Generics.submit")}
			</ActionBtn>
		</form>
	)
}
