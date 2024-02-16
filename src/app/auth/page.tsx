"use client"
import React from "react"
import { Button, TabTrigger } from "~/shared"
import { SignInTab } from "~/features/signInTab"
import { SignUpTab } from "~/features/signUpTab"
import { AuthTabsNames } from "~/app/auth/types"
import * as RadixTabs from "@radix-ui/react-tabs"
import { ResetPassword } from "~/features/resetPassword"
import { useRouter, useSearchParams } from "next/navigation"
import { RequestEmailVerification } from "~/features/requestEmailVerification"

export default function Auth() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const search = searchParams.get("active-tab")
	const [activeTab, setActiveTab] = React.useState(search || AuthTabsNames.SIGN_IN)

	function handleValueChange(newActiveTab: string) {
		setActiveTab(newActiveTab)
		router.push(`?active-tab=${newActiveTab}`)
	}

	return (
		<RadixTabs.Root onValueChange={handleValueChange} value={activeTab} className={"text-primary"}>
			<RadixTabs.List className="flex max-w-640 text-black mb-8" aria-label="Manage your account">
				<TabTrigger
					isActive={activeTab === AuthTabsNames.SIGN_UP}
					name={AuthTabsNames.SIGN_UP}
					className={"mr-8 428:mr-12"}
				>
					Зарегистрироваться
				</TabTrigger>
				<TabTrigger isActive={activeTab === AuthTabsNames.SIGN_IN} name={AuthTabsNames.SIGN_IN}>
					Войти
				</TabTrigger>
			</RadixTabs.List>
			<SignInTab
				resetPassword={
					<ResetPassword
						requestEmailVerification={<RequestEmailVerification />}
						trigger={
							<Button variant={"none"} className={"text-body-2"}>
								Forgot password?
							</Button>
						}
					/>
				}
				onSubmit={() => router.push("/")}
				tabName={AuthTabsNames.SIGN_IN}
			/>
			<SignUpTab onSubmit={() => handleValueChange(AuthTabsNames.SIGN_IN)} tabName={AuthTabsNames.SIGN_UP} />
		</RadixTabs.Root>
	)
}
