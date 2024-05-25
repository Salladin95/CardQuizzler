"use client"
import React from "react"
import { useTranslations } from "~/app/i18n"
import { ActionBtn } from "~/entites/ActionBtn"
import { Dialog, PasswordInput } from "~/shared"
import { FormFieldWithLabel } from "~/entites/FormField"
import { useProtectedModuleCtx } from "~/shared/context/ProtectedModuleCtxProvider"

export function PasswordProtectedLayout({ children }: { children: React.ReactNode }) {
	const ctx = useProtectedModuleCtx()
	const t = useTranslations()
	const passwordInput = React.useRef<HTMLInputElement>(null!)

	const [isHydrated, setIsHydrated] = React.useState(false)

	React.useEffect(() => {
		setIsHydrated(true)
	}, [])

	if (!isHydrated || !ctx) return null

	const { password, updatePassword } = ctx

	if (password) {
		return children
	}

	return (
		<main>
			<Dialog className={"p-8 py-12 w-[90%] 768:w-[55%] 1024:w-[40%]"} open={true}>
				<h1 className={"h1 text-center"}>{t("Titles.protectedByPassword")}</h1>
				<FormFieldWithLabel
					className={"mb-10"}
					id={"password"}
					label={t("Labels.password")}
					error={t("Validation.required.password")}
				>
					<PasswordInput
						ref={passwordInput}
						placeholder={t("Placeholders.password")}
						error={!!password}
						defaultValue={password}
					/>
				</FormFieldWithLabel>
				<ActionBtn
					onClick={() => {
						updatePassword(passwordInput.current.value)
					}}
				>
					{t("Generics.save")}
				</ActionBtn>
			</Dialog>
		</main>
	)
}
