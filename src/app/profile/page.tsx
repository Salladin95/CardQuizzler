"use client"
import React from "react"
import { Header } from "~/widgets"
import { fullDateFormatter } from "~/lib"
import { ResetEmail } from "./ui/ResetEmail"
import { LoadingDataRenderer } from "~/shared"
import { Profile, useProtectedProfile } from "~/api"
import { WithLabel } from "~/app/profile/ui/WithLabel"

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
					<ResetEmail currentEmail={profile.email} id={profile.id} />
					<WithLabel className={"mb-0"} label={"Here since"} title={fullDateFormatter(profile.createdAt)} />
				</div>
			</main>
		</>
	)
}

export default function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
