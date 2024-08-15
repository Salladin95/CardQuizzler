import { Locale } from "~/app/i18n/i18n"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useSwitchLocale() {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	// Return a function that updates the locale while preserving other route information
	return (nextLocale: Locale) => {
		const segments = pathname.split("/")
		const newSegments = segments.map((segment, index) => (index === 1 ? nextLocale : segment))
		segments[1] = nextLocale
		const updatedUrl = searchParams.toString()
			? `${newSegments.join("/")}?${searchParams.toString()}`
			: newSegments.join("/")

		// Push the updated URL to the router
		router.push(updatedUrl)
	}
}
