import React from "react"
import * as Yup from "yup"
import { useResetPassword } from "./api"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { Dialog, Input, profileQueryKey, useToast, useTranslatedFieldErrorMessages } from "~/shared"
import { useRequestEmailVerificationCtx } from "~/shared/context/RequestEmailVerificationCtxProvider"

const resetPasswordSchema = Yup.object({
	newPassword: Yup.string().required().password(),
	confirmPassword: Yup.string()
		.required()
		.oneOf([Yup.ref("newPassword"), ""])
		.password(),
	code: Yup.number().required().codeLength().nullable(),
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
	const t = useTranslations()

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
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("features.messages.updatePasswordSuccess"),
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
			setIsOpen(false)
			reset()
		},
		onError: () => {
			reset()
			toast({ variant: "error", title: t("Generics.error"), description: t("features.messages.updatePasswordFailure") })
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

	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	return (
		<div className={"flex items-center justify-between text-primary"}>
			<Dialog
				className={"p-8 py-12 w-[90%] 768:w-[55%] 1024:w-[40%]"}
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
						<FormFieldWithLabel
							label={"Code"}
							id={ResetPasswordFormEnum.CODE}
							error={translatedErrorMessages.get(ResetPasswordFormEnum.CODE)}
						>
							<Input
								{...register(ResetPasswordFormEnum.CODE)}
								id={ResetPasswordFormEnum.CODE}
								error={Boolean(errors?.code)}
								className={"mb-8"}
								placeholder={t("Placeholders.code")}
							/>
						</FormFieldWithLabel>
						<FormFieldWithLabel
							label={t("Labels.password")}
							id={ResetPasswordFormEnum.NEW_PASSWORD}
							error={translatedErrorMessages.get(ResetPasswordFormEnum.NEW_PASSWORD)}
						>
							<PasswordInput
								{...register(ResetPasswordFormEnum.NEW_PASSWORD)}
								id={ResetPasswordFormEnum.NEW_PASSWORD}
								error={Boolean(errors?.newPassword)}
								className={"mb-8"}
								placeholder={t("Placeholders.newPassword")}
								autoComplete={"new-password"}
							/>
						</FormFieldWithLabel>
						<FormFieldWithLabel
							label={t("Labels.confirmPassword")}
							id={ResetPasswordFormEnum.CONFIRM_PASSWORD}
							error={translatedErrorMessages.get(ResetPasswordFormEnum.CONFIRM_PASSWORD)}
						>
							<PasswordInput
								{...register(ResetPasswordFormEnum.CONFIRM_PASSWORD)}
								id={ResetPasswordFormEnum.CONFIRM_PASSWORD}
								error={Boolean(errors?.confirmPassword)}
								className={"mb-12"}
								placeholder={t("Placeholders.confirmPassword")}
								autoComplete={"new-password"}
							/>
						</FormFieldWithLabel>
						<ActionBtn disabled={Boolean(Object.keys(errors).length)} loading={resetPassword.isPending} type={"submit"}>
							{t("Features.resetPassword")}
						</ActionBtn>
					</form>
				)}
			</Dialog>
		</div>
	)
}
