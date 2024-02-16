import React from "react"
import * as Yup from "yup"
import { InferType } from "yup"
import { Profile, profileQueryKey, useUpdatePassword } from "~/api"
import { ActionBtn, FormField } from "~/entites"
import { Button, Dialog, useToast } from "~/shared"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { getSignUpFormDefaultValues } from "~/features/signUpTab/SignUpTab"
import { useQueryClient } from "@tanstack/react-query"
import { confirmPasswordRequiredMsg, passwordRequiredMsg, passwordsMustMatchMsg } from "~/app/constants"

const updatePasswordSchema = Yup.object({
	currentPassword: Yup.string().required(passwordRequiredMsg).password(),
	newPassword: Yup.string().required(passwordRequiredMsg).password(),
	confirmPassword: Yup.string()
		.required(confirmPasswordRequiredMsg)
		.oneOf([Yup.ref("newPassword"), ""], passwordsMustMatchMsg)
		.password(),
})
export type UpdatePasswordFormType = InferType<typeof updatePasswordSchema>

export enum UpdatePasswordFormEnum {
	CURRENT_PASSWORD = "currentPassword",
	NEW_PASSWORD = "newPassword",
	CONFIRM_PASSWORD = "confirmPassword",
}

type UpdatePasswordProps = {
	profile: Profile
}

export function UpdatePassword(props: UpdatePasswordProps) {
	const [isOpen, setIsOpen] = React.useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset: resetForm,
	} = useForm<UpdatePasswordFormType>({
		defaultValues: getSignUpFormDefaultValues(),
		resolver: yupResolver(updatePasswordSchema),
	})

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
			toast({ variant: "primary", title: "Success", description: "Password has been updated" })
		},
		onError: () => {
			reset()
			toast({ variant: "error", title: "Failure", description: "Failed to update password" })
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
		<div className={"flex items-center justify-between"}>
			<Dialog
				className={"p-8 max-w-428"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"w-[12rem]"} variant={"secondary"}>
						Update password
					</Button>
				}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormField error={errors?.currentPassword}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.CURRENT_PASSWORD)}
							error={Boolean(errors?.currentPassword)}
							className={"mb-8"}
							placeholder={"Enter current password"}
							autoComplete={"current-password"}
						/>
					</FormField>
					<FormField error={errors?.newPassword}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.NEW_PASSWORD)}
							error={Boolean(errors?.newPassword)}
							className={"mb-8"}
							placeholder={"Enter new password"}
							autoComplete={"new-password"}
						/>
					</FormField>
					<FormField error={errors?.confirmPassword}>
						<PasswordInput
							{...register(UpdatePasswordFormEnum.CONFIRM_PASSWORD)}
							error={Boolean(errors?.confirmPassword)}
							className={"mb-8"}
							placeholder={"Enter password again"}
							autoComplete={"new-password"}
						/>
					</FormField>
					<ActionBtn disabled={Boolean(Object.keys(errors).length)} loading={updatePassword.isPending} type={"submit"}>
						Update password
					</ActionBtn>
				</form>
			</Dialog>
		</div>
	)
}
