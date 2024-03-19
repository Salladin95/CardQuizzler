"use client"
import React from "react"
import * as Yup from "~/yup"
import { useSignInMutation } from "./api"
import { useLocalStorage } from "react-use"
import { useTranslations } from "~/app/i18n"
import * as RadixTabs from "@radix-ui/react-tabs"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { Input, profileQueryKey, useToast, useTranslatedFieldErrorMessages } from "~/shared"

export const singInValidationSchema = Yup.object({
	email: Yup.string().required().email(),
	password: Yup.string().required().password(),
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
	const t = useTranslations()
	const { tabName, onSubmit: onSubmitProp } = props
	const [_, setAccessToken] = useLocalStorage<string | null>("access-token", null)

	const toast = useToast()
	const queryClient = useQueryClient()
	const signIn = useSignInMutation({
		onError: () => {
			toast({ variant: "error", title: t("Generics.error"), description: t("Auth.messages.signInFailure") })
		},
		onSuccess: (res) => {
			toast({ variant: "primary", title: t("Generics.success"), description: t("Auth.messages.signInSuccess") })
			onSubmitProp()
			setAccessToken(res.data.accessToken)
			queryClient.refetchQueries({ queryKey: [profileQueryKey] })
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
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)
	const onSubmit: SubmitHandler<SignInFormType> = async (payload) => {
		signIn.mutate(payload)
	}

	return (
		<RadixTabs.Content className="bg-transparentoutline-none" value={tabName}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormFieldWithLabel
					className={"mb-4"}
					id={SignInFormEnum.EMAIL}
					label={t("Labels.email")}
					error={translatedErrorMessages.get(SignInFormEnum.EMAIL)}
				>
					<Input
						{...register(SignInFormEnum.EMAIL)}
						id={SignInFormEnum.EMAIL}
						error={Boolean(errors?.email)}
						placeholder={t("Placeholders.email")}
						autoComplete={"username"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-8"}
					id={SignInFormEnum.PASSWORD}
					label={t("Labels.password")}
					error={translatedErrorMessages.get(SignInFormEnum.PASSWORD)}
				>
					<PasswordInput
						{...register(SignInFormEnum.PASSWORD)}
						id={SignInFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={t("Placeholders.password")}
						autoComplete={"current-password"}
					/>
				</FormFieldWithLabel>
				<ActionBtn
					loading={signIn.isPending}
					disabled={Boolean(Object.keys(errors).length) || signIn.isSuccess}
					type={"submit"}
					className={"max-w-[20rem] mx-auto"}
				>
					{t("Auth.signIn")}
				</ActionBtn>
			</form>
			{props.resetPassword}
		</RadixTabs.Content>
	)
}
