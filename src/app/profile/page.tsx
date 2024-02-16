"use client"
import React from "react"
import { Header } from "~/widgets"
import { fullDateFormatter } from "~/lib"
import { ResetEmail } from "./ui/ResetEmail"
import { Profile, useProtectedProfile } from "~/api"
import { UpdatePassword } from "./ui/UpdatePassowrd"
import { Button, LoadingDataRenderer } from "~/shared"
import { WithLabel } from "~/app/profile/ui/WithLabel"
import { ResetPassword } from "~/features/resetPassword"
import { RequestEmailVerificationCtxProvider } from "~/providers/RequestEmailVerificationCtxProvider"
import { RequestEmailVerification } from "~/features/requestEmailVerification"

function Profile(profile: Profile) {
	return (
		<RequestEmailVerificationCtxProvider>
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
					<div className={"flex justify-between"}>
						<p>Password</p>
						<div className={"flex gap-x-4"}>
							<ResetPassword
								requestEmailVerification={<RequestEmailVerification />}
								trigger={
									<Button variant={"secondary"} className={"max-w-[12rem]"}>
										Reset password
									</Button>
								}
							/>
							<UpdatePassword profile={profile} />
						</div>
					</div>
					<WithLabel className={"mb-0"} label={"Here since"} title={fullDateFormatter(profile.createdAt)} />
				</div>
			</main>
		</RequestEmailVerificationCtxProvider>
	)
}

export default function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
