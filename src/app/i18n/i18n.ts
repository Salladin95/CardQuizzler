import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

export enum Locale {
	RU = "ru",
	EN = "en",
}


export const locales: Locale[] = [Locale.EN, Locale.RU]

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound()

	return {
		messages: (await import(`./messages/${locale}.json`)).default,
		timeZone: "Europe/Moscow",
	}
})
