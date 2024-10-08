import React from "react"
import { TextWithLabel } from "~/entites"
import { useTranslations } from "~/app/i18n"
import { fullDateFormatter } from "~/shared/lib"
import { Profile as ProfileType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { ResetEmail, ResetPassword, UpdatePassword, WithEmailVerificationRequest } from "~/features"
import { Button, LoadingDataRenderer, profileQueryKey, signOut, useProtectedProfile } from "~/shared"

function Profile(profile: ProfileType) {
	const queryClient = useQueryClient()
	const t = useTranslations()

	async function handleSignOut() {
		await signOut()
		queryClient.resetQueries({ queryKey: [profileQueryKey], exact: true })
	}
	return (
		<main className={"container text-primary"}>
			<div>
				<h1 className={"h3 separator mb-8"}>{t("Profile.title")}</h1>
				{/* TODO: ADD AVATAR COMPONENT */}
				<div className={"mb-4 w-4 h-4 p-4 border-1.5px border-primary rounded-full flex-center"}>
					{profile.name.substring(0, 2)}
				</div>
				<TextWithLabel label={t("Labels.name")} title={profile.name} />
				<TextWithLabel label={t("Labels.birthday")} title={profile.birthday} />
				<TextWithLabel className={"mb-4"} label={t("Labels.createdAt")} title={fullDateFormatter(profile.createdAt)} />
				<div className={"flex justify-between items-center"}>
					<TextWithLabel label={t("Labels.email")} title={profile.email} />
					<WithEmailVerificationRequest
						triggerTitle={t("Features.updateEmail")}
						currentEmail={profile.email}
						render={(reset) => <ResetEmail reset={reset} currentEmail={profile.email} id={profile.id} />}
					/>
				</div>
				<div className={"flex gap-x-6 items-center"}>
					<p>{t("Labels.password")}</p>
					<WithEmailVerificationRequest
						triggerTitle={t("Features.resetPassword")}
						currentEmail={profile.email}
						render={(reset) => <ResetPassword reset={reset} email={profile.email} />}
					/>
					<UpdatePassword profile={profile} />
				</div>
				<Button className={"mt-8 max-w-[10rem]"} onClick={handleSignOut}>
					{t("Auth.signOut")}
				</Button>
			</div>
		</main>
	)
}

export function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
