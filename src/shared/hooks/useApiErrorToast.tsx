"use client"

import { useToast } from "~/shared"
import { AxiosError } from "axios"
import { useTranslations } from "~/app/i18n"

export default function useApiErrorToast() {
	const toast = useToast()
	const t = useTranslations("")
	return (error: unknown) => {
		if (error instanceof AxiosError) {
			return toast({ variant: "error", title: t("Generics.error"), description: error.response?.data || error.message })
		} else if (error instanceof Error) {
			return toast({ variant: "error", title: t("Generics.error"), description: error.message })
		}
		return toast({ variant: "error", title: t("Generics.error"), description: t("Exceptions.unknownError") })
	}
}
