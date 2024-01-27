"use client"
import React from "react"
import { cn, fullDateFormatter } from "~/lib"
import { Header } from "~/widgets"
import {
	Profile,
	profileQueryKey,
	requestResetEmailQueryKey,
	useProtectedProfile,
	useRequestEmailVerification,
	useUpdateEmail,
} from "~/api"
import { PropsWithClassName } from "~/app/types"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Dialog, Input, Loader, LoadingDataRenderer, useToast } from "~/shared"

function Profile(profile: Profile) {
	return (
		<>
			<Header />
			<main className={"container text-primary"}>
				<div>
					<h1 className={"h3 separator mb-8"}>My profile</h1>
					{/* TODO: ADD AVATAR COMPONENT */}
					<div className={"mb-4 w-4 h-4 p-4 border-1.5px border-primary rounded-full flex-center"}>
						{profile.name.substring(0, 2)}
					</div>

					<WithLabel label={"Name"} title={profile.name} />
					<WithLabel label={"Birthday"} title={profile.birthday} />
					<ResetEmail email={profile.email} />
					<WithLabel className={"mb-0"} label={"Here since"} title={fullDateFormatter(profile.createdAt)} />
				</div>
			</main>
		</>
	)
}

type ResetEmailProps = {
	email: string
}

function ResetEmail(props: ResetEmailProps) {
	const { email } = props
	const [isOpen, setIsOpen] = React.useState(false)

	const [code, setCode] = React.useState("")

	const [showEmailInput, setShowEmailInput] = React.useState(false)
	const [newEmail, setNewEmail] = React.useState("")

	const queryClient = useQueryClient()
	const { isFetching, isSuccess, refetch } = useRequestEmailVerification({
		enabled: false,
	})

	function reset() {
		queryClient.removeQueries({
			queryKey: [requestResetEmailQueryKey],
		})
		setIsOpen(false)
		setShowEmailInput(false)
		setNewEmail("")
		setCode("")
	}

	const toast = useToast()

	const verifyEmail = useUpdateEmail({
		onSuccess: () => {
			verifyEmail.reset()
			reset()
			toast({
				variant: "primary",
				title: "Email is updated",
				description: "You successfully have updated your email!!!",
			})
			queryClient.invalidateQueries({ queryKey: [profileQueryKey] })
		},
		onError: (err) => {
			verifyEmail.reset()
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
			<WithLabel label={"Email"} title={email} />
			<Dialog
				className={"p-8 max-w-428"}
				open={isOpen}
				onOpenChange={setIsOpen}
				onOverlayClick={reset}
				trigger={
					<Button className={"w-[9rem]"} variant={"secondary"}>
						Change email
					</Button>
				}
			>
				{!isSuccess && (
					<>
						<p className={"mb-6"}>
							Your current email is <b className={"bold"}>{email}</b>. We&apos;ll send a temporary verification code to
							this email.
						</p>
						<Button loading={isFetching} className={"relative"} onClick={() => refetch()}>
							{isFetching && <Loader className={"absolute-center"} variant={"secondary"} />}
							{!isFetching && "Send verification code"}
						</Button>
					</>
				)}

				{isSuccess && (
					<>
						<p className={"mb-6"}>
							Your current email is <b className={"bold"}>{email}</b>. We&apos;ve sent a temporary verification code to
							this email.
						</p>
						<Input
							value={code}
							onChange={(e) => setCode(e.currentTarget.value)}
							className={"mb-4"}
							placeholder={"Enter verification code"}
						/>
						{!showEmailInput && <Button onClick={() => setShowEmailInput(true)}>Continue</Button>}

						{showEmailInput && (
							<>
								<p className={"mb-4 text-body-2 italic"}>
									Please enter new email and submit it and if you typed valid code we will update your email.
								</p>
								<Input
									value={newEmail}
									onChange={(e) => setNewEmail(e.currentTarget.value)}
									className={"mb-8"}
									placeholder={"Enter new email"}
								/>
								<Button
									className={"relative"}
									disabled={!newEmail || !!verifyEmail.error}
									loading={verifyEmail.isPending}
									onClick={() =>
										verifyEmail.mutate({
											code: +code,
											email: newEmail,
										})
									}
								>
									{verifyEmail.isPending && <Loader className={"absolute-center"} variant={"secondary"} />}
									{!verifyEmail.isPending && "Submit"}
								</Button>
							</>
						)}
					</>
				)}
			</Dialog>
		</div>
	)
}

type WithLabelProps = {
	label: string
	title: string
} & PropsWithClassName

function WithLabel(props: WithLabelProps) {
	const { label, title, className } = props
	return (
		<div className={cn("mb-4", className)}>
			<p className={"mb-1"}>{label}</p>
			<p className={"text-sub-primary text-body-2"}>{title}</p>
		</div>
	)
}

export default function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
