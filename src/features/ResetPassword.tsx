import React from "react"
import * as Yup from "~/yup"
import {
	Input,
	PasswordInput,
	profileQueryKey,
	useResetPassword,
	useToast,
	useTranslatedFieldErrorMessages,
} from "~/shared"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { ActionBtn, FormFieldWithLabel } from "~/entites"

export const resetPasswordSchema = Yup.object({
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
	email: string
	reset: () => void
}

export function getResetPasswordFormDefaultValues() {
	return {
		code: null,
		newPassword: "",
		confirmPassword: "",
	}
}

export function ResetPassword(props: ResetPasswordProps) {
	const { email } = props
	const t = useTranslations()
	const toast = useToast()

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset: resetForm,
	} = useForm<ResetPasswordFormType>({
		defaultValues: getResetPasswordFormDefaultValues(),
		resolver: yupResolver(resetPasswordSchema),
		mode: "onTouched",
	})

	function reset() {
		resetForm()
		resetPassword.reset()
		props.reset()
	}

	const queryClient = useQueryClient()
	const resetPassword = useResetPassword({
		onSuccess: () => {
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("Features.messages.updatePasswordSuccess"),
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
			reset()
		},
		onError: () => {
			reset()
			toast({ variant: "error", title: t("Generics.error"), description: t("Features.messages.updatePasswordFailure") })
		},
	})

	function onSubmit({ newPassword, code }: ResetPasswordFormType) {
		if (!code) return
		resetPassword.mutate({
			email,
			newPassword: newPassword,
			code: code,
		})
	}

	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	return (
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
	)
}
