"use client"
import { useTranslations } from "~/app/i18n"
import { FieldError, FieldErrors } from "react-hook-form"

function translateFieldError(t: ReturnType<typeof useTranslations>, err?: FieldError) {
	const msg: any = err?.message
	if (!msg) return undefined
	if (typeof msg === "object") {
		return t(msg.key, msg?.values)
	}
	return t(msg)
}

export function useTranslatedFieldErrorMessages<T extends FieldErrors<T>>(errors: T) {
	const t = useTranslations()
	const fieldErrorMessages = new Map<keyof T, string | undefined>()

	if (errors) {
		Object.keys(errors).forEach((key) => {
			const err = (errors as Record<string, FieldError>)[key]
			fieldErrorMessages.set(key as keyof T, translateFieldError(t, err))
		})
	}

	return fieldErrorMessages
}
