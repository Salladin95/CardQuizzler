"use client"
import React from "react"
import { Button, Input, Loader } from "~/shared"
import * as RadixTabs from "@radix-ui/react-tabs"
import { PasswordInput } from "~/shared/ui/PasswordInput"

type SignInTabContent = {
	isLoading?: boolean
	tabName: string
	onSubmit: (e: React.FormEvent) => void
}

export function SignInTab(props: SignInTabContent) {
	const { isLoading, tabName, onSubmit } = props
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	return (
		<RadixTabs.Content className="bg-transparentoutline-none" value={tabName}>
			<form onSubmit={onSubmit}>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="email">
						Почта
					</label>
					<Input
						placeholder={"Введите почту..."}
						className={"mt-2 mb-4"}
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						id={"email"}
						autoComplete={"username"}
						required
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="password">
						Пароль
					</label>
					<PasswordInput
						className={"mt-2 mb-8"}
						placeholder={"Введите пароль..."}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						id={"password"}
						autoComplete={"current-password"}
						required
					/>
				</fieldset>
				<Button
					loading={isLoading}
					disabled={!email || !password}
					type={"submit"}
					className={"max-w-[20rem] mx-auto relative"}
				>
					{isLoading && <Loader className={"absolute-center"} variant={"secondary"} />}
					Войти
				</Button>
			</form>
		</RadixTabs.Content>
	)
}
