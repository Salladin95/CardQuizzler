import React from "react"
import * as Yup from "~/yup"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { checkEmailFormat, cn, Input, useRequestEmailVerificationCtx, useTranslatedFieldErrorMessages } from "~/shared"

const ForgotPasswordEmailFormSchema = Yup.object({
	email: Yup.string().required().email(),
})
export type ForgotPasswordEmailFormType = Yup.InferType<typeof ForgotPasswordEmailFormSchema>

export enum ForgotPasswordEmailFormEnum {
	EMAIL = "email",
}

function getFormDefaultValues() {
	return { email: "" }
}

// RETRIEVES EMAIL FROM USER"S INPUT AND MAKES EMAIL VERIFICATION REQUEST
// SETS EMAIL & RESET FORM IN CONTEXT, SO WE COULD USE IT FURTHER
export function ForgotPasswordEmailForm() {
	const t = useTranslations()
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset: resetForm,
		watch,
	} = useForm<ForgotPasswordEmailFormType>({
		defaultValues: getFormDefaultValues(),
		resolver: yupResolver(ForgotPasswordEmailFormSchema),
		mode: "onChange",
	})
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	const email = watch(ForgotPasswordEmailFormEnum.EMAIL)
	const isEmailValid = isDirty && checkEmailFormat(email)

	const requestEmailVerificationCtx = useRequestEmailVerificationCtx()

	const requestEmailVerification = requestEmailVerificationCtx.requestEmailVerification
	requestEmailVerificationCtx.resetForm = resetForm

	function onSummit(formData: ForgotPasswordEmailFormType) {
		requestEmailVerification.mutate(formData)
		requestEmailVerificationCtx.setEmail(email)
	}

	if (requestEmailVerification.isSuccess) {
		return null
	}

	return (
		// USING FORM SO WE COULD SUBMIT WITH ENTER
		<form onSubmit={handleSubmit(onSummit)} className={""}>
			<FormFieldWithLabel
				label={t("Labels.email")}
				id={ForgotPasswordEmailFormEnum.EMAIL}
				error={translatedErrorMessages.get(ForgotPasswordEmailFormEnum.EMAIL)}
				className={cn({ "text-red-400": !isEmailValid && isDirty })}
			>
				<Input
					{...register(ForgotPasswordEmailFormEnum.EMAIL)}
					className={"mb-8"}
					error={isDirty && !isEmailValid}
					placeholder={t("Placeholders.email")}
					id={ForgotPasswordEmailFormEnum.EMAIL}
				/>
			</FormFieldWithLabel>
			<ActionBtn disabled={!isEmailValid} loading={requestEmailVerification.isPending} type={"submit"}>
				{t("Features.requestCode")}
			</ActionBtn>
		</form>
	)
}
