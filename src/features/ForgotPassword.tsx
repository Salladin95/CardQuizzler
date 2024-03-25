import React from "react"
import { useTranslations } from "~/app/i18n"
import { ActionBtn, EmailForm } from "~/entites"
import { Dialog, useRequestEmailVerification, useToast } from "~/shared"

type ForgotPasswordProps = {
	trigger: React.ReactNode
	renderResetPassword: (email: string) => React.ReactNode
}

export function ForgotPassword(props: ForgotPasswordProps) {
	const { trigger, renderResetPassword } = props
	const [isOpen, setIsOpen] = React.useState(false)
	const [email, setEmail] = React.useState("")
	const t = useTranslations()
	const toast = useToast()

	const requestEmailVerification = useRequestEmailVerification({
		onError: () => {
			toast({
				variant: "error",
				title: t("Generics.error"),
				description: t("Features.messages.reqEmailVerificationFailure"),
			})
		},
	})

	function onSubmit() {
		// requestEmailVerification.reset()
	}

	const hasRequestedVerification = requestEmailVerification.isSuccess

	return (
		<div className={"flex items-center justify-between text-primary"}>
			<Dialog
				className={"p-8 py-12 w-[90%] 768:w-[55%] 1024:w-[40%]"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={() => {
					setIsOpen(false)
					requestEmailVerification.reset()
				}}
				trigger={trigger}
			>
				{!hasRequestedVerification && (
					<EmailForm
						renderSubmitBtn={(isDisabled) => (
							<ActionBtn disabled={isDisabled} loading={requestEmailVerification.isPending} type={"submit"}>
								{t("Features.requestCode")}
							</ActionBtn>
						)}
						onSubmit={(formType) => {
							requestEmailVerification.mutate(formType)
							setEmail(email)
						}}
					/>
				)}
				{hasRequestedVerification && renderResetPassword(email)}
			</Dialog>
		</div>
	)
}
