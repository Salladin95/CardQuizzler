import { useTranslations as useNextIntlTranslations } from "next-intl"

export function useTranslations(ns?: string) {
	return useNextIntlTranslations(ns)
}

export type Translator = ReturnType<typeof useTranslations>
