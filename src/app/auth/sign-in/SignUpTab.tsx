"use client"
import React from "react"
import { Button, DatePicker, Input, Loader, Popover } from "~/shared"
import * as RadixTabs from "@radix-ui/react-tabs"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { startOfToday, subYears } from "date-fns"

type SignUpTabContent = {
	isLoading?: boolean
	tabName: string
	onSubmit: (e: React.FormEvent) => void
}

export function SignUpTab(props: SignUpTabContent) {
	const { isLoading, tabName, onSubmit } = props
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [birthday, setBirthday] = React.useState<Date>(subYears(startOfToday(), 5))

	return (
		<RadixTabs.Content className="bg-transparent  outline-none" value={tabName}>
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
					<label className={"cursor-pointer"} htmlFor="name">
						Имя
					</label>
					<Input
						placeholder={"Введите имя..."}
						className={"mt-2 mb-4"}
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						id={"name"}
						required
						autoComplete={"name"}
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="password">
						Пароль
					</label>
					<PasswordInput
						className={"mt-2 mb-4"}
						placeholder={"Введите пароль..."}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						id={"password"}
						autoComplete={"new-password"}
						required
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="confirem-password">
						Подтвердите пароль
					</label>
					<PasswordInput
						className={"mt-2 mb-4"}
						placeholder={"Подтвердите пароль..."}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						id={"confirm-password"}
						autoComplete={"new-password"}
						required
					/>
				</fieldset>

				<Popover
					side={"left"}
					trigger={
						<Button variant={"secondary"} className={"mb-8"}>
							Выберите дату рождения
						</Button>
					}
				>
					<DatePicker value={birthday} onChange={setBirthday} />
				</Popover>

				<Button
					loading={isLoading}
					disabled={!email || !password}
					type={"submit"}
					className={"max-w-[20rem] mx-auto relative"}
				>
					{isLoading && <Loader className={"absolute-center"} variant={"secondary"} />}
					Зарегистрироваться
				</Button>
			</form>
		</RadixTabs.Content>
	)
}
