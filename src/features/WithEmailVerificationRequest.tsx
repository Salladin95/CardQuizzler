import React from "react"
import { ActionBtn } from "~/entites"
import { useTranslations } from "~/app/i18n"
import { Button, Dialog, useRequestEmailVerification } from "~/shared"

type WithEmailVerificationProps = {
	currentEmail: string
	triggerTitle: string
	render: () => React.ReactNode
}

export function WithEmailVerification(props: WithEmailVerificationProps) {
	const t = useTranslations()
	const { render, currentEmail, triggerTitle } = props
	const [isOpen, setIsOpen] = React.useState(false)

	const requestEmailVerification = useRequestEmailVerification()

	function reset() {
		requestEmailVerification.reset()
		setIsOpen(false)
	}

	return (
		<div className={"flex items-center justify-between"}>
			<Dialog
				className={"p-8 py-12 w-[90%] 768:w-[55%] 1024:w-[40%]"}
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
						<p className={"mb-6"}>{t("Features.emailVerificationMessage", { currentEmail })}</p>
						<ActionBtn
							loading={requestEmailVerification.isPending}
							onClick={() => requestEmailVerification.mutate({ email: currentEmail })}
						>
							{t("Features.requestCode")}
						</ActionBtn>
					</>
				)}
				{requestEmailVerification.isSuccess && render()}
			</Dialog>
		</div>
	)
}
