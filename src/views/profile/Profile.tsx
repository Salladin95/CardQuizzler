import React from "react"
import { TextWithLabel } from "~/entites"
import { fullDateFormatter } from "~/shared/lib"
import { Profile as ProfileType } from "~/app/models"
import { ResetEmail, ResetPassword, UpdatePassword } from "~/features"
import { RequestEmailVerification } from "~/features/requestEmailVerification"
import {
	Button,
	LoadingDataRenderer,
	profileQueryKey,
	RequestEmailVerificationCtxProvider,
	signOut,
	useProtectedProfile,
} from "~/shared"
import { useQueryClient } from "@tanstack/react-query"

function Profile(profile: ProfileType) {
	const queryClient = useQueryClient()

	async function handleSignOut() {
		await signOut()
		queryClient.resetQueries({ queryKey: [profileQueryKey], exact: true })
	}
	return (
		<RequestEmailVerificationCtxProvider>
			<main className={"container text-primary"}>
				<div>
					<h1 className={"h3 separator mb-8"}>My profile</h1>
					{/* TODO: ADD AVATAR COMPONENT */}
					<div className={"mb-4 w-4 h-4 p-4 border-1.5px border-primary rounded-full flex-center"}>
						{profile.name.substring(0, 2)}
					</div>

					<TextWithLabel label={"Name"} title={profile.name} />
					<TextWithLabel label={"Birthday"} title={profile.birthday} />
					<TextWithLabel className={"mb-4"} label={"Here since"} title={fullDateFormatter(profile.createdAt)} />
					<ResetEmail currentEmail={profile.email} id={profile.id} />
					<ResetPassword
						requestEmailVerification={<RequestEmailVerification />}
						trigger={
							<Button variant={"secondary"} className={"mb-2 max-w-[12rem]"}>
								Reset password
							</Button>
						}
					/>
					<UpdatePassword profile={profile} />
					<Button className={"mt-8 w-min"} onClick={handleSignOut}>
						Выйти
					</Button>
				</div>
			</main>
		</RequestEmailVerificationCtxProvider>
	)
}

export function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
