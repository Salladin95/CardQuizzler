import React from "react"
import * as Yup from "~/yup"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormFieldWithLabel } from "~/entites/index"
import { checkEmailFormat, cn, Input, useTranslatedFieldErrorMessages } from "~/shared"

const EmailFormSchema = Yup.object({
	email: Yup.string().required().email(),
})
export type EmailFormType = Yup.InferType<typeof EmailFormSchema>

export enum EmailFormEnum {
	EMAIL = "email",
}

function getFormDefaultValues() {
	return { email: "" }
}

type EmailFormProps = {
	onSubmit: (formType: EmailFormType) => void
	renderSubmitBtn: (isDisabled: boolean) => React.ReactNode
}

export function EmailForm(props: EmailFormProps) {
	const t = useTranslations()
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset: resetForm,
		watch,
	} = useForm<EmailFormType>({
		defaultValues: getFormDefaultValues(),
		resolver: yupResolver(EmailFormSchema),
		mode: "onChange",
	})
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	const email = watch(EmailFormEnum.EMAIL)
	const isEmailValid = checkEmailFormat(email)

	function onSubmit(formData: EmailFormType) {
		props.onSubmit(formData)
		resetForm()
	}

	return (
		// USING FORM SO WE COULD SUBMIT WITH ENTER
		<form onSubmit={handleSubmit(onSubmit)} className={""}>
			<FormFieldWithLabel
				label={t("Labels.email")}
				id={EmailFormEnum.EMAIL}
				error={translatedErrorMessages.get(EmailFormEnum.EMAIL)}
				className={cn({ "text-red-400": !isEmailValid && isDirty })}
			>
				<Input
					{...register(EmailFormEnum.EMAIL)}
					className={"mb-8"}
					error={isDirty && !isEmailValid}
					placeholder={t("Placeholders.email")}
					id={EmailFormEnum.EMAIL}
				/>
			</FormFieldWithLabel>
			{props.renderSubmitBtn(!isEmailValid)}
		</form>
	)
}
