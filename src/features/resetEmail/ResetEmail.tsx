import React from "react"
import { useUpdateEmail } from "./api"
import { ActionBtn, TextWithLabel } from "~/entites"
import { ResetEmailForm } from "./ResetEmailFormType"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Dialog, profileQueryKey, useRequestEmailVerification, useToast } from "~/shared"

type ResetEmailProps = {
	currentEmail: string
	triggerTitle?: string
	id: string
}

export function ResetEmail(props: ResetEmailProps) {
	const { currentEmail, triggerTitle = "Update email" } = props
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
				title: "Email is updated",
				description: "You successfully have updated your email!!!",
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
		},
		onError: (err) => {
			reset()
			toast({
				variant: "error",
				title: "Failed to update the email",
				description: JSON.stringify(err.response?.data) || err.message,
			})
		},
	})

	return (
		<div className={"flex items-center justify-between"}>
			<TextWithLabel label={"Email"} title={currentEmail} />
			<Dialog
				className={"p-8 w-[90%]"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"w-[9rem]"} variant={"secondary"}>
						{triggerTitle}
					</Button>
				}
			>
				{!requestEmailVerification.isSuccess && (
					<>
						<p className={"mb-6"}>
							Your current email is <b className={"bold"}>{currentEmail}</b>. We&apos;ll send a temporary verification
							code to this email.
						</p>
						<ActionBtn
							loading={requestEmailVerification.isPending}
							onClick={() => requestEmailVerification.mutateAsync({ email: currentEmail })}
						>
							Send verification code
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
