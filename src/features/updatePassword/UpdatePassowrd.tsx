import React from "react"
import * as Yup from "yup"
import { Profile } from "~/app/models"
import { useUpdatePassword } from "./api"
import { useForm } from "react-hook-form"
import { useTranslations } from "~/app/i18n"
import { ActionBtn, FormField } from "~/entites"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Dialog, PasswordInput, profileQueryKey, useToast, useTranslatedFieldErrorMessages } from "~/shared"

const updatePasswordSchema = Yup.object({
	currentPassword: Yup.string().required().password(),
	newPassword: Yup.string().required().password(),
	confirmPassword: Yup.string()
		.required()
		.oneOf([Yup.ref("newPassword"), ""])
		.password(),
})
export type UpdatePasswordFormType = Yup.InferType<typeof updatePasswordSchema>

export enum UpdatePasswordFormEnum {
	CURRENT_PASSWORD = "currentPassword",
	NEW_PASSWORD = "newPassword",
	CONFIRM_PASSWORD = "confirmPassword",
}

type UpdatePasswordProps = {
	profile: Profile
}

function getFormDefaultValues() {
	return {
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	}
}

export function UpdatePassword(props: UpdatePasswordProps) {
	const t = useTranslations()
	const [isOpen, setIsOpen] = React.useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset: resetForm,
	} = useForm<UpdatePasswordFormType>({
		defaultValues: getFormDefaultValues(),
		resolver: yupResolver(updatePasswordSchema),
	})
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	function reset() {
		resetForm()
		updatePassword.reset()
	}

	const toast = useToast()
	const queryClient = useQueryClient()
	const updatePassword = useUpdatePassword({
		onSuccess: () => {
			reset()
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("Features.messages.updatePasswordSuccess"),
			})
		},
		onError: () => {
			reset()
			toast({ variant: "error", title: t("Generics.error"), description: t("Features.messages.updatePasswordFailure") })
		},
	})

	function onSubmit(formData: UpdatePasswordFormType) {
		updatePassword.mutate({
			currentPassword: formData.currentPassword,
			newPassword: formData.newPassword,
			id: props.profile.id,
		})
	}

	return (
		<div className={"flex items-center justify-between text-primary"}>
			<Dialog
				className={"p-8 w-[90%] 768:w-[55%] 1024:w-[40%]"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"w-[12rem]"} variant={"secondary"}>
						{t("Features.updatePassword")}
					</Button>
				}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormField error={translatedErrorMessages.get(UpdatePasswordFormEnum.CURRENT_PASSWORD)}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.CURRENT_PASSWORD)}
							error={Boolean(errors?.currentPassword)}
							className={"mb-8"}
							placeholder={t("Placeholders.currentPassword")}
							autoComplete={"current-password"}
						/>
					</FormField>
					<FormField error={translatedErrorMessages.get(UpdatePasswordFormEnum.NEW_PASSWORD)}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.NEW_PASSWORD)}
							error={Boolean(errors?.newPassword)}
							className={"mb-8"}
							placeholder={t("Placeholders.newPassword")}
							autoComplete={"new-password"}
						/>
					</FormField>
					<FormField error={translatedErrorMessages.get(UpdatePasswordFormEnum.CONFIRM_PASSWORD)}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.CONFIRM_PASSWORD)}
							error={Boolean(errors?.confirmPassword)}
							className={"mb-8"}
							placeholder={t("Placeholders.confirmPassword")}
							autoComplete={"new-password"}
						/>
					</FormField>
					<ActionBtn disabled={Boolean(Object.keys(errors).length)} loading={updatePassword.isPending} type={"submit"}>
						{t("Features.updatePassword")}
					</ActionBtn>
				</form>
			</Dialog>
		</div>
	)
}
