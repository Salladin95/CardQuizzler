import React from "react"
import * as Yup from "yup"
import { InferType } from "yup"
import { useForm } from "react-hook-form"
import { Input } from "~/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { emailRequiredMsg, invalidEmailMsg } from "~/app/auth/validation"
import { useRequestEmailVerificationCtx } from "~/providers/RequestEmailVerificationCtxProvider"

const RequestEmailVerificationSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
})
export type RequestEmailVerificationFormType = InferType<typeof RequestEmailVerificationSchema>

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

	const requestEmailVerificationCtx = useRequestEmailVerificationCtx()

	const requestEmailVerification = requestEmailVerificationCtx.requestEmailVerification
	requestEmailVerificationCtx.resetForm = resetForm

	function onSummit(formData: RequestEmailVerificationFormType) {
		requestEmailVerification.mutate(formData)
	}

	if (requestEmailVerification.isSuccess) {
		requestEmailVerificationCtx.setEmail(email)
		return null
	}

	return (
		<form onSubmit={handleSubmit(onSummit)}>
			<FormFieldWithLabel label={"Email"} id={RequestEmailVerificationFormEnum.EMAIL} error={errors?.email}>
				<Input
					{...register(RequestEmailVerificationFormEnum.EMAIL)}
					id={RequestEmailVerificationFormEnum.EMAIL}
					error={Boolean(errors?.email)}
					className={"mb-8"}
					placeholder={"Enter your email"}
				/>
			</FormFieldWithLabel>
			<ActionBtn
				disabled={!email || Boolean(errors?.email)}
				loading={requestEmailVerification.isPending}
				type={"submit"}
			>
				Send verification code
			</ActionBtn>
		</form>
	)
}
