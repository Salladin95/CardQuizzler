"use client"
import React, { FormEvent } from "react"
import * as RadixTabs from "@radix-ui/react-tabs"
import { SignInTab } from "./ui/SignInTab"
import { SignUpTab } from "./ui/SignUpTab"
import { TabTrigger } from "~/shared"
import { singInValidationSchema, singUpValidationSchema, validateForm } from "~/app/auth/validation"

export type TabContentProps = {
	isLoading?: boolean
	tabName: string
	onSubmit: (e: React.FormEvent) => void
}

export default function Auth() {
	function handleSignInSubmit(e: FormEvent) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget as HTMLFormElement)
		validateForm(formData, singInValidationSchema)
			.then((validData) => {
				// Form data is valid, do something with it
				console.log("Valid form data:", validData)
			})
			.catch((errors) => {
				// Form data is invalid, handle errors
				console.error("Validation errors:", errors.errors)
			})
	}

	// Function to handle form submission
	function handleSignUpSubmit(e: FormEvent) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget as HTMLFormElement)
		validateForm(formData, singUpValidationSchema)
			.then((validData) => {
				// Form data is valid, do something with it
				console.log("Valid form data:", validData)
			})
			.catch((errors) => {
				// Form data is invalid, handle errors
				console.error("Validation errors:", errors.errors)
			})
	}

	return (
		<RadixTabs.Root defaultValue="sign-in">
			<RadixTabs.List className="flex max-w-640 text-black mb-8" aria-label="Manage your account">
				<TabTrigger name={"sign-up"} className={"mr-6"}>
					Зарегистрироваться
				</TabTrigger>
				<TabTrigger name={"sign-in"}>Войти</TabTrigger>
			</RadixTabs.List>
			<SignInTab onSubmit={handleSignInSubmit} tabName={"sign-in"} />
			<SignUpTab onSubmit={handleSignUpSubmit} tabName={"sign-up"} />
		</RadixTabs.Root>
	)
}
