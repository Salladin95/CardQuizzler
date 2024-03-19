import React from "react"
import * as Yup from "~/yup"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { checkEmailFormat, cn, Input, useRequestEmailVerificationCtx, useTranslatedFieldErrorMessages } from "~/shared"

const RequestEmailVerificationSchema = Yup.object({
	email: Yup.string().required().email(),
})
export type RequestEmailVerificationFormType = Yup.InferType<typeof RequestEmailVerificationSchema>

export enum RequestEmailVerificationFormEnum {
	EMAIL = "email",
}

function getFormDefaultValues() {
	return { email: "" }
}

export function RequestEmailVerification() {
	const t = useTranslations()

	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset: resetForm,
		watch,
	} = useForm<RequestEmailVerificationFormType>({
		defaultValues: getFormDefaultValues(),
		resolver: yupResolver(RequestEmailVerificationSchema),
		mode: "onChange",
	})
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	const email = watch(RequestEmailVerificationFormEnum.EMAIL)
	const isEmailValid = isDirty && checkEmailFormat(email)

	const requestEmailVerificationCtx = useRequestEmailVerificationCtx()

	const requestEmailVerification = requestEmailVerificationCtx.requestEmailVerification
	requestEmailVerificationCtx.resetForm = resetForm

	function onSummit(formData: RequestEmailVerificationFormType) {
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
				id={RequestEmailVerificationFormEnum.EMAIL}
				error={translatedErrorMessages.get(RequestEmailVerificationFormEnum.EMAIL)}
				className={cn({ "text-red-400": !isEmailValid && isDirty })}
			>
				<Input
					{...register(RequestEmailVerificationFormEnum.EMAIL)}
					className={"mb-8"}
					error={isDirty && !isEmailValid}
					placeholder={t("Placeholders.email")}
					id={RequestEmailVerificationFormEnum.EMAIL}
				/>
			</FormFieldWithLabel>
			<ActionBtn disabled={!isEmailValid} loading={requestEmailVerification.isPending} type={"submit"}>
				{t("Features.requestCode")}
			</ActionBtn>
		</form>
	)
}
