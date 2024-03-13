import React from "react"
import { TextWithLabel } from "~/entites"
import { fullDateFormatter } from "~/shared/lib"
import { Profile as ProfileType } from "~/app/models"
import { ResetEmail, ResetPassword, UpdatePassword } from "~/features"
import { RequestEmailVerification } from "~/features/requestEmailVerification"
import { Button, LoadingDataRenderer, RequestEmailVerificationCtxProvider, useProtectedProfile } from "~/shared"

function Profile(profile: ProfileType) {
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
					<TextWithLabel className={"mb-0"} label={"Here since"} title={fullDateFormatter(profile.createdAt)} />
				</div>
			</main>
		</RequestEmailVerificationCtxProvider>
	)
}

export function ProfilePage() {
	const { data: profile, isPending } = useProtectedProfile()
	return <LoadingDataRenderer Comp={Profile} data={profile} isLoading={isPending} />
}
