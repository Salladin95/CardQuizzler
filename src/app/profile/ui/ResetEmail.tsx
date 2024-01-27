import React from "react"
import { ActionBtn } from "~/entites"
import { Button, Dialog, useToast } from "~/shared"
import { WithLabel } from "~/app/profile/ui/WithLabel"
import { useQueryClient } from "@tanstack/react-query"
import { ResetEmailForm } from "~/app/profile/ui/ResetFormType"
import { profileQueryKey, requestResetEmailQueryKey, useRequestEmailVerification, useUpdateEmail } from "~/api"

type ResetEmailProps = {
	currentEmail: string
	triggerTitle?: string
}

export function ResetEmail(props: ResetEmailProps) {
	const { currentEmail, triggerTitle = "Update email" } = props
	const [isOpen, setIsOpen] = React.useState(false)

	const queryClient = useQueryClient()
	const {
		isFetching: isCodeFetching,
		isSuccess: codeHasFetched,
		refetch: refetchCode,
	} = useRequestEmailVerification({
		enabled: false,
	})

	function reset() {
		queryClient.removeQueries({
			queryKey: [requestResetEmailQueryKey],
		})
		setIsOpen(false)
	}

	const toast = useToast()

	const updateEmail = useUpdateEmail({
		onSuccess: () => {
			updateEmail.reset()
			reset()
			toast({
				variant: "primary",
				title: "Email is updated",
				description: "You successfully have updated your email!!!",
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
		},
		onError: (err) => {
			updateEmail.reset()
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
			<WithLabel label={"Email"} title={currentEmail} />
			<Dialog
				className={"p-8 max-w-428"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"w-[9rem]"} variant={"secondary"}>
						{triggerTitle}
					</Button>
				}
			>
				{!codeHasFetched && (
					<>
						<p className={"mb-6"}>
							Your current email is <b className={"bold"}>{currentEmail}</b>. We&apos;ll send a temporary verification
							code to this email.
						</p>
						<ActionBtn loading={isCodeFetching} onClick={() => refetchCode()}>
							Send verification code
						</ActionBtn>
					</>
				)}

				{codeHasFetched && (
					<ResetEmailForm
						currentEmail={currentEmail}
						isSubmitting={updateEmail.isPending}
						hasSubmitError={Boolean(updateEmail.error)}
						onSubmit={(form) => {
							form.code &&
								updateEmail.mutate({
									code: form.code,
									email: form.email,
								})
						}}
					/>
				)}
			</Dialog>
		</div>
	)
}
