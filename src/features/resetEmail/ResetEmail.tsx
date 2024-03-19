import React from "react"
import { useUpdateEmail } from "./api"
import { ActionBtn, TextWithLabel } from "~/entites"
import { ResetEmailForm } from "./ResetEmailFormType"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Dialog, profileQueryKey, useRequestEmailVerification, useToast } from "~/shared"
import { useTranslations } from "~/app/i18n"

type ResetEmailProps = {
	currentEmail: string
	triggerTitle?: string
	id: string
}

export function ResetEmail(props: ResetEmailProps) {
	const t = useTranslations()
	const { currentEmail, triggerTitle = t("Features.updateEmail.title") } = props
	const [isOpen, setIsOpen] = React.useState(false)

	const queryClient = useQueryClient()
	const requestEmailVerification = useRequestEmailVerification()

	function reset() {
		requestEmailVerification.reset()
		updateEmail.reset()
		setIsOpen(false)
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
		<div className={"flex items-center justify-between"}>
			<TextWithLabel label={t("Labels.email")} title={currentEmail} />
			<Dialog
				className={"p-8 w-[90%]"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"max-w-[12rem]"} variant={"secondary"}>
						{triggerTitle}
					</Button>
				}
			>
				{!requestEmailVerification.isSuccess && (
					<>
						<p className={"mb-6"}>{t("Features.updateEmail.mailVerificationMessage", { currentEmail })}</p>
						<ActionBtn
							loading={requestEmailVerification.isPending}
							onClick={() => requestEmailVerification.mutateAsync({ email: currentEmail })}
						>
							{t("Features.requestCode")}
						</ActionBtn>
					</>
				)}

				{requestEmailVerification.isSuccess && (
					<ResetEmailForm
						currentEmail={currentEmail}
						isSubmitting={updateEmail.isPending}
						hasSubmitError={Boolean(updateEmail.error)}
						onSubmit={(form) => {
							form.code &&
								updateEmail.mutate({
									code: form.code,
									email: form.email,
									id: props.id,
								})
						}}
					/>
				)}
			</Dialog>
		</div>
	)
}
