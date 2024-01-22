"use client"
import React from "react"
import { TabTrigger } from "~/shared"
import { SignInTab } from "./ui/SignInTab"
import { SignUpTab } from "./ui/SignUpTab"
import { AuthTabsNames } from "~/app/auth/types"
import * as RadixTabs from "@radix-ui/react-tabs"
import { useRouter, useSearchParams } from "next/navigation"

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
				<TabTrigger isActive={activeTab === AuthTabsNames.SIGN_UP} name={AuthTabsNames.SIGN_UP} className={"mr-12"}>
					Зарегистрироваться
				</TabTrigger>
				<TabTrigger isActive={activeTab === AuthTabsNames.SIGN_IN} name={AuthTabsNames.SIGN_IN}>
					Войти
				</TabTrigger>
			</RadixTabs.List>
			<SignInTab onSubmit={() => router.push("/")} tabName={AuthTabsNames.SIGN_IN} />
			<SignUpTab onSubmit={() => handleValueChange(AuthTabsNames.SIGN_IN)} tabName={AuthTabsNames.SIGN_UP} />
		</RadixTabs.Root>
	)
}
