import { locales } from "~/app/i18n/i18n"
import createMiddleware from "next-intl/middleware"

export default createMiddleware({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale: "en",
})

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|assets|api).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
}
