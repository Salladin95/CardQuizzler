"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { AuthTabsNames } from "./types"
import { SwitchLocale } from "~/features"
import { SignInTab } from "~/features/signInTab"
import { SignUpTab } from "~/features/signUpTab"
import * as RadixTabs from "@radix-ui/react-tabs"
import { useTranslations } from "~/app/i18n"
import { ResetPassword } from "~/features/resetPassword"
import BG from "~/../public/assets/images/purple-items.png"
import { useRouter, useSearchParams } from "next/navigation"
import { RequestEmailVerification } from "~/features/requestEmailVerification"
import { Button, Logo, RequestEmailVerificationCtxProvider, TabTrigger } from "~/shared"

const style: React.CSSProperties = {
	backgroundImage: `url(${BG.src})`,
	backgroundPosition: "top",
	backgroundSize: "cover",
}

export function AuthPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const t = useTranslations("Auth")

	const search = searchParams.get("active-tab")
	const [activeTab, setActiveTab] = React.useState(search || AuthTabsNames.SIGN_IN)

	function handleValueChange(newActiveTab: string) {
		setActiveTab(newActiveTab)
		router.push(`?active-tab=${newActiveTab}`)
	}

	return (
		<main style={style} className={"w-full h-ful flex flex-row justify-between relative"}>
			<SwitchLocale className={"absolute top-4 right-6"} />
			<section className={"hidden 768:block p-4 flex-1 relative"}>
				<p className={cn("font-y-today italic text-white text-[3rem] leading-[2.2rem]", "max-w-428 ")}>
					{t("messages.welcomeMessage")}
				</p>
				<Logo className={"absolute bottom-4 left-4"} />
			</section>
			<section className={"bg-white pt-[6rem] w-full 768:w-[60%] 1180:w-[45%] flex justify-center"}>
				<RequestEmailVerificationCtxProvider>
					<RadixTabs.Root onValueChange={handleValueChange} value={activeTab} className={"text-primary "}>
						<RadixTabs.List className="flex max-w-640 text-black mb-8" aria-label="Manage your account">
							<TabTrigger
								isActive={activeTab === AuthTabsNames.SIGN_UP}
								name={AuthTabsNames.SIGN_UP}
								className={"mr-8 428:mr-12"}
							>
								{t("signUp")}
							</TabTrigger>
							<TabTrigger isActive={activeTab === AuthTabsNames.SIGN_IN} name={AuthTabsNames.SIGN_IN}>
								{t("signIn")}
							</TabTrigger>
						</RadixTabs.List>
						<SignInTab
							resetPassword={
								<ResetPassword
									requestEmailVerification={<RequestEmailVerification />}
									trigger={
										<Button variant={"none"} className={"text-body-2"}>
											{t("forgotPassword")}
										</Button>
									}
								/>
							}
							onSubmit={() => router.push("/")}
							tabName={AuthTabsNames.SIGN_IN}
						/>
						<SignUpTab onSubmit={() => handleValueChange(AuthTabsNames.SIGN_IN)} tabName={AuthTabsNames.SIGN_UP} />
					</RadixTabs.Root>
				</RequestEmailVerificationCtxProvider>
			</section>
		</main>
	)
}
