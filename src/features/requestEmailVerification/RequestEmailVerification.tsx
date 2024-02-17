import React from "react"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { emailRequiredMsg, invalidEmailMsg } from "~/app/constants"
import { checkEmailFormat, Input, useRequestEmailVerificationCtx } from "~/shared"

const RequestEmailVerificationSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
})
export type RequestEmailVerificationFormType = Yup.InferType<typeof RequestEmailVerificationSchema>

export enum RequestEmailVerificationFormEnum {
	EMAIL = "email",
}

function getFormDefaultValues() {
	return { email: "" }
}

export function RequestEmailVerification() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset: resetForm,
		watch,
	} = useForm<RequestEmailVerificationFormType>({
		defaultValues: getFormDefaultValues(),
		resolver: yupResolver(RequestEmailVerificationSchema),
		mode: "onTouched",
	})

	const email = watch(RequestEmailVerificationFormEnum.EMAIL)
	const isEmailValid = checkEmailFormat(email)

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
		<form onSubmit={handleSubmit(onSummit)}>
			<FormFieldWithLabel label={"Email"} id={RequestEmailVerificationFormEnum.EMAIL} error={errors?.email}>
				<Input
					{...register(RequestEmailVerificationFormEnum.EMAIL)}
					className={"mb-8"}
					error={!isEmailValid}
					placeholder={"Enter your email"}
					id={RequestEmailVerificationFormEnum.EMAIL}
				/>
			</FormFieldWithLabel>
			<ActionBtn disabled={!isEmailValid} loading={requestEmailVerification.isPending} type={"submit"}>
				Send verification code
			</ActionBtn>
		</form>
	)
}
