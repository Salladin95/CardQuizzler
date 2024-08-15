import { Locale } from "~/app/i18n"
import { useLocale as nextIntlUseLocale } from "next-intl"

export function useLocale() {
	return nextIntlUseLocale() as Locale
}
