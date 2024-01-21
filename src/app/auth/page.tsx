"use client"
import React, { FormEvent } from "react"
import * as RadixTabs from "@radix-ui/react-tabs"
import { SignInTab } from "./sign-in/SignInTab"
import { SignUpTab } from "./sign-in/SignUpTab"
import { TabTrigger } from "~/shared"

type TabsProps = unknown

export default function Auth(props: TabsProps) {
	// const {} = props
	function handleSignInSubmit(e: FormEvent) {
		e.preventDefault()
		console.log(e)
	}

	function handleSignUpSubmit(e: FormEvent) {
		e.preventDefault()
		console.log(e)
	}

	return (
		<RadixTabs.Root defaultValue="sign-in">
			<RadixTabs.List className="flex max-w-640 text-black mb-8" aria-label="Manage your account">
				<TabTrigger name={"sign-up"} className={"mr-6"}>
					{/*																					viewBox="-30 350 600 50"						 x  y   w   h */}
					Зарегистрироваться
				</TabTrigger>
				<TabTrigger name={"sign-in"}>Войти</TabTrigger>
			</RadixTabs.List>
			<SignInTab onSubmit={handleSignInSubmit} tabName={"sign-in"} />
			<SignUpTab onSubmit={handleSignUpSubmit} tabName={"sign-up"} />
		</RadixTabs.Root>
	)
}
