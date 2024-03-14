import React from "react"
import * as Yup from "yup"
import { useResetPassword } from "./api"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import {
	codeRequiredErrMsg,
	confirmPasswordRequiredMsg,
	passwordRequiredMsg,
	passwordsMustMatchMsg,
} from "~/app/constants"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { Dialog, Input, profileQueryKey, useToast } from "~/shared"
import { useRequestEmailVerificationCtx } from "~/shared/context/RequestEmailVerificationCtxProvider"

const resetPasswordSchema = Yup.object({
	newPassword: Yup.string().required(passwordRequiredMsg).password(),
	confirmPassword: Yup.string()
		.required(confirmPasswordRequiredMsg)
		.oneOf([Yup.ref("newPassword"), ""], passwordsMustMatchMsg)
		.password(),
	code: Yup.number().codeLength().required(codeRequiredErrMsg).nullable(),
})
export type ResetPasswordFormType = Yup.InferType<typeof resetPasswordSchema>

export enum ResetPasswordFormEnum {
	NEW_PASSWORD = "newPassword",
	CONFIRM_PASSWORD = "confirmPassword",
	CODE = "code",
}

type ResetPasswordProps = {
	trigger: React.ReactNode
	requestEmailVerification: React.ReactNode
}

function getDefaultValues() {
	return {
		code: null,
		newPassword: "",
		confirmPassword: "",
	}
}

export function ResetPassword(props: ResetPasswordProps) {
	const [isOpen, setIsOpen] = React.useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset: resetForm,
	} = useForm<ResetPasswordFormType>({
		defaultValues: getDefaultValues(),
		resolver: yupResolver(resetPasswordSchema),
		mode: "onTouched",
	})

	const { resetForm: resetReqEmailVerForm, email, requestEmailVerification } = useRequestEmailVerificationCtx()

	const toast = useToast()
	const queryClient = useQueryClient()
	const resetPassword = useResetPassword({
		onSuccess: () => {
			toast({ variant: "primary", title: "Success", description: "Password has been updated" })
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
			setIsOpen(false)
			reset()
		},
		onError: () => {
			reset()
			toast({ variant: "error", title: "Failure", description: "Failed to update password" })
		},
	})

	function reset() {
		resetForm()
		resetPassword.reset()
		requestEmailVerification.reset()
		resetReqEmailVerForm && resetReqEmailVerForm()
	}

	function onSubmit(formData: ResetPasswordFormType) {
		if (!formData.code) return
		resetPassword.mutate({
			email: email,
			newPassword: formData.newPassword,
			code: formData.code,
		})
	}

	return (
		<div className={"flex items-center justify-between"}>
			<Dialog
				className={"p-8 w-[90%] py-12"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={() => {
					resetForm()
					resetPassword.reset()
					setIsOpen(false)
					requestEmailVerification.reset()
				}}
				trigger={props.trigger}
			>
				{props.requestEmailVerification}
				{requestEmailVerification.isSuccess && (
					<form onSubmit={handleSubmit(onSubmit)} className={"text-primary"}>
						<FormFieldWithLabel label={"Code"} id={ResetPasswordFormEnum.CODE} error={errors?.code}>
							<Input
								{...register(ResetPasswordFormEnum.CODE)}
								id={ResetPasswordFormEnum.CODE}
								error={Boolean(errors?.code)}
								className={"mb-8"}
								placeholder={"Enter code..."}
							/>
						</FormFieldWithLabel>
						<FormFieldWithLabel label={"Password"} id={ResetPasswordFormEnum.NEW_PASSWORD} error={errors?.newPassword}>
							<PasswordInput
								{...register(ResetPasswordFormEnum.NEW_PASSWORD)}
								id={ResetPasswordFormEnum.NEW_PASSWORD}
								error={Boolean(errors?.newPassword)}
								className={"mb-8"}
								placeholder={"Enter new password"}
								autoComplete={"new-password"}
							/>
						</FormFieldWithLabel>
						<FormFieldWithLabel
							label={"Confirm password"}
							id={ResetPasswordFormEnum.CONFIRM_PASSWORD}
							error={errors?.confirmPassword}
						>
							<PasswordInput
								{...register(ResetPasswordFormEnum.CONFIRM_PASSWORD)}
								id={ResetPasswordFormEnum.CONFIRM_PASSWORD}
								error={Boolean(errors?.confirmPassword)}
								className={"mb-8"}
								placeholder={"Enter password again"}
								autoComplete={"new-password"}
							/>
						</FormFieldWithLabel>
						<ActionBtn disabled={Boolean(Object.keys(errors).length)} loading={resetPassword.isPending} type={"submit"}>
							Reset password
						</ActionBtn>
					</form>
				)}
			</Dialog>
		</div>
	)
}
