import React from "react"
import localFont from "next/font/local"
import { Providers } from "src/app/providers"
import { Locale, locales } from "~/app/i18n/i18n"
import { Inter, Noto_Sans } from "next/font/google"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import "~/globals.css"

const youthTouch = localFont({
	src: [
		{
			path: "../../public/fonts/YouthTouch.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-touch",
})

const youthToday = localFont({
	src: [
		{
			path: "../../public/fonts/YouthToday.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-today",
})
const youthPower = localFont({
	src: [
		{
			path: "../../public/fonts/YouthPower.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-power",
})

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-noto" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" })

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: Locale }
}) {
	unstable_setRequestLocale(locale)
	return (
		<html
			lang={locale}
			className={`${youthTouch.variable} ${youthPower.variable} ${youthToday.variable} ${inter.variable} ${notoSans.variable}`}
		>
			<body>
				<Providers locale={locale}>{children}</Providers>
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "Metadata" })

	return {
		title: t("Home.title"),
		description: t("Home.description"),
	}
}
