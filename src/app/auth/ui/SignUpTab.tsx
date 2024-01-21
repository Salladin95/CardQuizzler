"use client"
import React from "react"
import { Button, DatePicker, Input, Loader, Popover } from "~/shared"
import * as RadixTabs from "@radix-ui/react-tabs"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { format } from "date-fns"
import { TabContentProps } from "~/app/auth/page"

type SignUpTabContent = TabContentProps

export enum SignUpFormEnum {
	NAME = "name",
	EMAIL = "email",
	PASSWORD = "password",
	CONFIRM_PASSWORD = "confirmPassword",
	BIRTHDAY = "birthday",
}

export function SignUpTab(props: SignUpTabContent) {
	const { isLoading, tabName, onSubmit } = props
	const [birthday, setBirthday] = React.useState<Date>()

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
						id={SignUpFormEnum.EMAIL}
						autoComplete={"username"}
						name={SignUpFormEnum.EMAIL}
						required
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="name">
						Имя
					</label>
					<Input
						placeholder={"Введите имя..."}
						name={SignUpFormEnum.NAME}
						className={"mt-2 mb-4"}
						id={SignUpFormEnum.NAME}
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
						id={SignUpFormEnum.PASSWORD}
						name={SignUpFormEnum.PASSWORD}
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
						id={SignUpFormEnum.CONFIRM_PASSWORD}
						name={SignUpFormEnum.CONFIRM_PASSWORD}
						autoComplete={"new-password"}
						required
					/>
				</fieldset>

				<input
					className={"hidden"}
					value={birthday?.toString()}
					type={"date"}
					name={SignUpFormEnum.BIRTHDAY}
					onChange={() => {}}
				/>

				<Popover
					side={"left"}
					trigger={
						<Button variant={"secondary"} className={"mb-8"}>
							{!birthday ? "Выберите дату рождения" : format(birthday, "dd-MMMM-yyyy")}
						</Button>
					}
				>
					<DatePicker value={birthday} onChange={setBirthday} />
				</Popover>

				<Button
					loading={isLoading}
					// disabled={!email || !password}
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
