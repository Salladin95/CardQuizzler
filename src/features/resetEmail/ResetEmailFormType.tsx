import React from "react"
import * as Yup from "~/yup"
import { Button, Input, useTranslatedFieldErrorMessages } from "~/shared"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { ActionBtn, FormField } from "~/entites"
import { yupResolver } from "@hookform/resolvers/yup"

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

	const [showEmailField, setShowEmailField] = React.useState(false)

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
	const code = watch(ResetEmailFormEnum.CODE)

	function onSubmit(form: ResetEmailFormType) {
		reset(getResetFormDefaultValues)
		onSubmitProp(form)
	}

	const translatedErrors = useTranslatedFieldErrorMessages(errors)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"text-primary"}>
			<FormField error={translatedErrors.get(ResetEmailFormEnum.CODE)}>
				<Input
					{...register(ResetEmailFormEnum.CODE)}
					error={Boolean(errors?.code)}
					className={"mb-8"}
					placeholder={t("Placeholders.code")}
				/>
			</FormField>
			{!showEmailField && (
				<Button disabled={Boolean(errors?.code) || !code} onClick={() => setShowEmailField(true)}>
					{t("Generics.continue")}
				</Button>
			)}
			{showEmailField && (
				<>
					<p className={"mb-4 text-body-2 italic"}>{t("Labels.email")}</p>
					<FormField error={translatedErrors.get(ResetEmailFormEnum.EMAIL)}>
						<Input
							{...register(ResetEmailFormEnum.EMAIL)}
							error={Boolean(errors?.email)}
							className={"mb-8"}
							placeholder={t("Placeholders.email")}
						/>
					</FormField>

					<ActionBtn
						disabled={!newEmail || hasSubmitError || Boolean(Object.keys(errors).length)}
						loading={isSubmitting}
						type={"submit"}
					>
						{t("Generics.submit")}
					</ActionBtn>
				</>
			)}
		</form>
	)
}
