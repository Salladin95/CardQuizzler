import React from "react"
import * as Yup from "~/yup"
import { Button, Input } from "~/shared"
import { useForm } from "react-hook-form"
import { ActionBtn, FormField } from "~/entites"
import { yupResolver } from "@hookform/resolvers/yup"
import { codeRequiredErrMsg, emailRequiredMsg, invalidEmailMsg } from "~/app/constants"

const resetEmailFormSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	code: Yup.number().codeLength().required(codeRequiredErrMsg).nullable(),
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
	const { currentEmail, isSubmitting, hasSubmitError, onSubmit: onSubmitProp } = props

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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p className={"mb-6"}>
				Your current email is <b className={"bold"}>{currentEmail}</b>. We&apos;ve sent a temporary verification code to
				this email.
			</p>
			<FormField error={errors?.code}>
				<Input
					{...register(ResetEmailFormEnum.CODE)}
					error={Boolean(errors?.code)}
					className={"mb-8"}
					placeholder={"Enter verification code"}
				/>
			</FormField>
			{!showEmailField && (
				<Button disabled={Boolean(errors?.code) || !code} onClick={() => setShowEmailField(true)}>
					Continue
				</Button>
			)}
			{showEmailField && (
				<>
					<p className={"mb-4 text-body-2 italic"}>
						Please enter new email and submit it and if you typed valid code we will update your email.
					</p>
					<FormField error={errors?.email}>
						<Input
							{...register(ResetEmailFormEnum.EMAIL)}
							error={Boolean(errors?.email)}
							className={"mb-8"}
							placeholder={"Enter new email"}
						/>
					</FormField>

					<ActionBtn
						disabled={!newEmail || hasSubmitError || Boolean(Object.keys(errors).length)}
						loading={isSubmitting}
						type={"submit"}
					>
						Submit
					</ActionBtn>
				</>
			)}
		</form>
	)
}
