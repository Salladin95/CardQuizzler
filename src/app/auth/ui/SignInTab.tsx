"use client"
import React from "react"
import { Input } from "~/shared"
import { useLocalStorage } from "react-use"
import * as RadixTabs from "@radix-ui/react-tabs"
import { TabContentProps } from "~/app/auth/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
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
	const [_, setAccessToken] = useLocalStorage<string | null>("access-token", null)

	const queryClient = useQueryClient()
	const signIn = useSignInMutation({
		onSuccess: (res) => {
			if (res?.status < 400) {
				onSubmitProp()
				setAccessToken(res.data.accessToken)
				queryClient.refetchQueries({ queryKey: [profileQueryKey] })
			}
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
	const onSubmit: SubmitHandler<SignInFormType> = async (payload) => {
		signIn.mutate(payload)
	}

	return (
		<RadixTabs.Content className="bg-transparentoutline-none" value={tabName}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormFieldWithLabel className={"mb-4"} id={SignInFormEnum.EMAIL} label={"Почта"} error={errors?.email}>
					<Input
						{...register(SignInFormEnum.EMAIL)}
						id={SignInFormEnum.EMAIL}
						error={Boolean(errors?.email)}
						placeholder={"Введите почту..."}
						autoComplete={"username"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-12"}
					id={SignInFormEnum.PASSWORD}
					label={"Пароль"}
					error={errors?.password}
				>
					<PasswordInput
						{...register(SignInFormEnum.PASSWORD)}
						id={SignInFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={"Введите пароль..."}
						autoComplete={"new-password"}
					/>
				</FormFieldWithLabel>
				<ActionBtn
					// loading={signIn.isPending}
					disabled={Boolean(Object.keys(errors).length)}
					type={"submit"}
					className={"max-w-[20rem] mx-auto"}
				>
					Войти
				</ActionBtn>
			</form>
		</RadixTabs.Content>
	)
}
