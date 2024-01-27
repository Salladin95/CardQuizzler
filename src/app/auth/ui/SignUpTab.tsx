"use client"
import React from "react"
import { useWindowSize } from "react-use"
import { useSignUpMutation } from "~/api"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import * as RadixTabs from "@radix-ui/react-tabs"
import { TabContentProps } from "~/app/auth/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { Button, DatePicker, Input, Popover } from "~/shared"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { calculatePreviousYearStartDate, cn, fullDateFormatter } from "~/lib"
import { SignUpFormType, singUpValidationSchema } from "~/app/auth/validation"

type SignUpTabContent = TabContentProps

export enum SignUpFormEnum {
	NAME = "name",
	EMAIL = "email",
	PASSWORD = "password",
	CONFIRM_PASSWORD = "confirmPassword",
	BIRTHDAY = "birthday",
}

export function getSignUpFormDefaultValues(): SignUpFormType {
	return {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: calculatePreviousYearStartDate(5),
	}
}

export function SignUpTab(props: SignUpTabContent) {
	const { tabName, onSubmit: onSubmitProp } = props

	const signUp = useSignUpMutation({
		onSuccess: onSubmitProp,
	})

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		watch,
	} = useForm<SignUpFormType>({
		defaultValues: getSignUpFormDefaultValues(),
		resolver: yupResolver(singUpValidationSchema),
	})

	const birthday = watch(SignUpFormEnum.BIRTHDAY)

	const onSubmit: SubmitHandler<SignUpFormType> = (payload) => {
		signUp.mutate({
			...payload,
			birthday: fullDateFormatter(payload.birthday),
		})
	}
	const { width: windowWidth } = useWindowSize()
	return (
		<RadixTabs.Content className="bg-transparent  outline-none" value={tabName}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormFieldWithLabel className={"mb-6"} id={SignUpFormEnum.EMAIL} label={"Почта"} error={errors?.email}>
					<Input
						{...register(SignUpFormEnum.EMAIL)}
						id={SignUpFormEnum.EMAIL}
						error={Boolean(errors?.email)}
						placeholder={"Введите почту..."}
						autoComplete={"username"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel className={"mt-2 mb-6"} id={SignUpFormEnum.NAME} label={"Имя"} error={errors?.name}>
					<Input
						{...register(SignUpFormEnum.NAME)}
						id={SignUpFormEnum.NAME}
						error={Boolean(errors?.name)}
						placeholder={"Введите ваше имя..."}
						autoComplete={"name"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel className={"mt-2 mb-6"} id={SignUpFormEnum.PASSWORD} label={"Пароль"} error={errors?.password}>
					<PasswordInput
						{...register(SignUpFormEnum.PASSWORD)}
						id={SignUpFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={"Введите пароль..."}
						autoComplete={"new-password"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-10"}
					id={SignUpFormEnum.CONFIRM_PASSWORD}
					label={"Подтверждение пароля"}
					error={errors?.confirmPassword}
				>
					<PasswordInput
						{...register(SignUpFormEnum.CONFIRM_PASSWORD)}
						error={Boolean(errors?.confirmPassword)}
						placeholder={"Подтвердите пароль..."}
						id={SignUpFormEnum.CONFIRM_PASSWORD}
						name={SignUpFormEnum.CONFIRM_PASSWORD}
						autoComplete={"new-password"}
					/>
				</FormFieldWithLabel>

				<p
					className={cn("mb-2", {
						"text-red-400": Boolean(errors?.birthday),
					})}
				>
					Дата рождения
				</p>
				<Popover
					side={windowWidth > 1080 ? "left" : "bottom"}
					trigger={
						<Button
							variant={"secondary"}
							className={cn("mb-8", {
								"text-red-400": Boolean(errors?.birthday),
							})}
						>
							{fullDateFormatter(birthday)}
						</Button>
					}
				>
					<Controller
						render={({ field }) => <DatePicker {...field} />}
						name={SignUpFormEnum.BIRTHDAY}
						control={control}
					/>
				</Popover>

				<ActionBtn
					loading={signUp.isPending}
					disabled={Boolean(Object.keys(errors).length)}
					type={"submit"}
					className={"max-w-[20rem] mx-auto "}
				>
					Зарегистрироваться
				</ActionBtn>
			</form>
		</RadixTabs.Content>
	)
}
