import React from "react"
import { useTranslations } from "~/app/i18n"
import { ResetEmailForm } from "./ResetEmailFormType"
import { useQueryClient } from "@tanstack/react-query"
import { profileQueryKey, useRequestEmailVerification, useToast, useUpdateEmail } from "~/shared"

type ResetEmailProps = {
	currentEmail: string
	id: string
	reset: () => void
}

export function ResetEmail(props: ResetEmailProps) {
	const { currentEmail, id } = props
	const t = useTranslations()

	const queryClient = useQueryClient()
	const requestEmailVerification = useRequestEmailVerification()

	function reset() {
		requestEmailVerification.reset()
		updateEmail.reset()
		props.reset()
	}

	const toast = useToast()

	const updateEmail = useUpdateEmail({
		onSuccess: () => {
			reset()
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("Features.messages.updateEmailSuccess"),
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
		},
		onError: (err) => {
			reset()
			toast({
				variant: "error",
				title: t("Generics.error"),
				description: JSON.stringify(err.response?.data) || err.message,
			})
		},
	})

	return (
		<ResetEmailForm
			currentEmail={currentEmail}
			isSubmitting={updateEmail.isPending}
			hasSubmitError={Boolean(updateEmail.error)}
			onSubmit={(form) => {
				form.code &&
					updateEmail.mutate({
						code: form.code,
						email: form.email,
						id: id,
					})
			}}
		/>
	)
}
