"use client"
import React from "react"
import * as Yup from "yup"
import { useWindowSize } from "react-use"
import { useSignUpMutation } from "./api"
import { useTranslations } from "~/app/i18n"
import * as RadixTabs from "@radix-ui/react-tabs"
import { yupResolver } from "@hookform/resolvers/yup"
import { PasswordInput } from "~/shared/ui/PasswordInput"
import { ActionBtn, FormFieldWithLabel } from "~/entites"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Button, DatePicker, Input, Popover, useToast, useTranslatedFieldErrorMessages } from "~/shared"
import { calculatePreviousYearStartDate, cn, fullDateFormatter, MAX_BIRTHDAY_DATE } from "~/shared/lib"

export const singUpValidationSchema = Yup.object({
	email: Yup.string().required().email(),
	name: Yup.string().required().min(1),
	password: Yup.string().required().password(),
	confirmPassword: Yup.string()
		.required()
		.oneOf([Yup.ref("password"), ""])
		.password(),
	birthday: Yup.date().required().max(MAX_BIRTHDAY_DATE),
})

export type SignUpFormType = Yup.InferType<typeof singUpValidationSchema>

type SignUpProps = {
	tabName: string
	onSubmit: () => void
}

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

export function SignUpTab(props: SignUpProps) {
	const { tabName, onSubmit: onSubmitProp } = props
	const t = useTranslations()

	const toast = useToast()
	const signUp = useSignUpMutation({
		onSuccess: () => {
			onSubmitProp()
			toast({ variant: "primary", title: t("Generics.success"), description: t("Auth.messages.signUpSuccess") })
		},
		onError: () => {
			toast({ variant: "error", title: t("Generics.error"), description: t("Auth.messages.signUpFailure") })
		},
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
	const translatedErrorMessages = useTranslatedFieldErrorMessages(errors)

	const birthday = watch(SignUpFormEnum.BIRTHDAY)

	const onSubmit: SubmitHandler<SignUpFormType> = (payload) => {
		signUp.mutate({
			...payload,
			birthday: fullDateFormatter(payload.birthday),
		})
	}
	const { width: windowWidth } = useWindowSize()
	const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
	return (
		<RadixTabs.Content className="bg-transparent  outline-none" value={tabName}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormFieldWithLabel
					className={"mb-6"}
					id={SignUpFormEnum.EMAIL}
					label={t("Labels.email")}
					error={translatedErrorMessages.get(SignUpFormEnum.EMAIL)}
				>
					<Input
						{...register(SignUpFormEnum.EMAIL)}
						id={SignUpFormEnum.EMAIL}
						error={Boolean(errors?.email)}
						placeholder={t("Placeholders.email")}
						autoComplete={"username"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-6"}
					id={SignUpFormEnum.NAME}
					label={t("Labels.name")}
					error={translatedErrorMessages.get(SignUpFormEnum.NAME)}
				>
					<Input
						{...register(SignUpFormEnum.NAME)}
						id={SignUpFormEnum.NAME}
						error={Boolean(errors?.name)}
						placeholder={t("Placeholders.name")}
						autoComplete={"name"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-6"}
					id={SignUpFormEnum.PASSWORD}
					label={t("Labels.password")}
					error={translatedErrorMessages.get(SignUpFormEnum.PASSWORD)}
				>
					<PasswordInput
						{...register(SignUpFormEnum.PASSWORD)}
						id={SignUpFormEnum.PASSWORD}
						error={Boolean(errors?.password)}
						placeholder={t("Placeholders.password")}
						autoComplete={"new-password"}
					/>
				</FormFieldWithLabel>
				<FormFieldWithLabel
					className={"mt-2 mb-10"}
					id={SignUpFormEnum.CONFIRM_PASSWORD}
					label={t("Labels.confirmPassword")}
					error={translatedErrorMessages.get(SignUpFormEnum.CONFIRM_PASSWORD)}
				>
					<PasswordInput
						{...register(SignUpFormEnum.CONFIRM_PASSWORD)}
						error={Boolean(errors?.confirmPassword)}
						placeholder={t("Placeholders.confirmPassword")}
						id={SignUpFormEnum.CONFIRM_PASSWORD}
						name={SignUpFormEnum.CONFIRM_PASSWORD}
						autoComplete={"new-password"}
					/>
				</FormFieldWithLabel>

				<p
					className={cn("mb-2", {
						"text-red-400": Boolean(errors?.birthday),
					})}
					onClick={() => setIsCalendarOpen(true)}
				>
					{t("Labels.birthday")}
				</p>
				<Popover
					side={windowWidth > 1080 ? "left" : "bottom"}
					open={isCalendarOpen}
					onOpenChange={setIsCalendarOpen}
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
					{t("Auth.signUp")}
				</ActionBtn>
			</form>
		</RadixTabs.Content>
	)
}
