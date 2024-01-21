"use client"
import React from "react"
import { Button, Input, Loader } from "~/shared"
import * as RadixTabs from "@radix-ui/react-tabs"
import { TabContentProps } from "~/app/auth/page"
import { PasswordInput } from "~/shared/ui/PasswordInput"

type SignInTabContent = TabContentProps

export enum SignInFormEnum {
	EMAIL = "email",
	PASSWORD = "password",
}

export function SignInTab(props: SignInTabContent) {
	const { isLoading, tabName, onSubmit } = props

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
						id={SignInFormEnum.EMAIL}
						autoComplete={"username"}
						name={SignInFormEnum.EMAIL}
						required
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="password">
						Пароль
					</label>
					<PasswordInput
						className={"mt-2 mb-4"}
						placeholder={"Введите пароль..."}
						id={SignInFormEnum.PASSWORD}
						name={SignInFormEnum.PASSWORD}
						autoComplete={"new-password"}
						required
					/>
				</fieldset>
				<Button
					loading={isLoading}
					// disabled={!email || !password}
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
