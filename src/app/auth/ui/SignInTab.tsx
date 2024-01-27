"use client"
import React from "react"
import { FormField } from "~/entites"
import { Button, Input, Loader } from "~/shared"
import * as RadixTabs from "@radix-ui/react-tabs"
import { TabContentProps } from "~/app/auth/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { profileQueryKey, useSignInMutation } from "~/api"
import { SignInFormType, singInValidationSchema } from "~/app/auth/validation"

type SignInTabContent = TabContentProps

export enum SignInFormEnum {
	EMAIL = "email",
	PASSWORD = "password",
}

export function getSignInFormDefaultValues(): SignInFormType {
	return {
		email: "",
		password: "",
	}
}

export function SignInTab(props: SignInTabContent) {
	const { tabName, onSubmit: onSubmitProp } = props

	const queryClient = useQueryClient()
	const signIn = useSignInMutation({
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: [profileQueryKey] })
			onSubmitProp()
		},
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignInFormType>({
		defaultValues: getSignInFormDefaultValues(),
		resolver: yupResolver(singInValidationSchema),
	})

	const onSubmit: SubmitHandler<SignInFormType> = (payload) => {
		signIn.mutate(payload)
	}

	return (
		<RadixTabs.Content className="bg-transparentoutline-none" value={tabName}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormField className={"mb-4"} id={SignInFormEnum.EMAIL} label={"Почта"} error={errors?.email}>
					<Input
						{...register(SignInFormEnum.EMAIL)}
						id={SignInFormEnum.EMAIL}
						error={Boolean(errors?.email)}
						placeholder={"Введите почту..."}
						autoComplete={"username"}
					/>
				</FormField>
				<FormField className={"mt-2 mb-12"} id={SignInFormEnum.PASSWORD} label={"Пароль"} error={errors?.password}>
					<PasswordInput
						{...register(SignInFormEnum.PASSWORD)}
						id={SignInFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={"Введите пароль..."}
						autoComplete={"new-password"}
					/>
				</FormField>
				<Button
					loading={signIn.isPending}
					disabled={Boolean(Object.keys(errors).length)}
					type={"submit"}
					className={"max-w-[20rem] mx-auto relative"}
				>
					{signIn.isPending && <Loader className={"absolute-center"} variant={"secondary"} />}
					Войти
				</Button>
			</form>
		</RadixTabs.Content>
	)
}
