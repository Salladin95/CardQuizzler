"use client"
import React from "react"
import * as Yup from "~/yup"
import { useSignInMutation } from "./api"
import { useLocalStorage } from "react-use"
import * as RadixTabs from "@radix-ui/react-tabs"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { Input, profileQueryKey, useToast } from "~/shared"
import { emailRequiredMsg, invalidEmailMsg, passwordRequiredMsg } from "~/app/constants"

export const singInValidationSchema = Yup.object({
	email: Yup.string().required(emailRequiredMsg).email(invalidEmailMsg),
	password: Yup.string().required(passwordRequiredMsg).password(),
})

export type SignInFormType = Yup.InferType<typeof singInValidationSchema>

type SignInProps = {
	resetPassword: React.ReactNode
	tabName: string
	onSubmit: () => void
}

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

export function SignInTab(props: SignInProps) {
	const { tabName, onSubmit: onSubmitProp } = props
	const [_, setAccessToken] = useLocalStorage<string | null>("access-token", null)

	const toast = useToast()
	const queryClient = useQueryClient()
	const signIn = useSignInMutation({
		onError: () => {
			toast({ variant: "error", title: "Error", description: "Failed to sign in" })
		},
		onSuccess: (res) => {
			if (res?.status < 400) {
				toast({ variant: "primary", title: "Success", description: "You have signed in!" })
				onSubmitProp()
				setAccessToken(res.data.accessToken)
				queryClient.refetchQueries({ queryKey: [profileQueryKey] })
				return
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
					className={"mt-2 mb-8"}
					id={SignInFormEnum.PASSWORD}
					label={"Пароль"}
					error={errors?.password}
				>
					<PasswordInput
						{...register(SignInFormEnum.PASSWORD)}
						id={SignInFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={"Введите пароль..."}
						autoComplete={"current-password"}
					/>
				</FormFieldWithLabel>
				<ActionBtn
					loading={signIn.isPending}
					disabled={Boolean(Object.keys(errors).length)}
					type={"submit"}
					className={"max-w-[20rem] mx-auto"}
				>
					Войти
				</ActionBtn>
			</form>
			{props.resetPassword}
		</RadixTabs.Content>
	)
}
