import React from "react"
import { Header } from "~/widgets"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Providers } from "src/app/providers"
import { PropsWithChildren } from "~/app/types"
import { Inter, Noto_Sans } from "next/font/google"

import "~/globals.css"

export const metadata: Metadata = {
	title: "CardQuizzer",
	description: "App for learning languages with cards",
}

const youthTouch = localFont({
	src: [
		{
			path: "../public/fonts/YouthTouch.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-touch",
})

const youthToday = localFont({
	src: [
		{
			path: "../public/fonts/YouthToday.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-today",
})
const youthPower = localFont({
	src: [
		{
			path: "../public/fonts/YouthPower.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-power",
})

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-noto" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" })

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html
			lang="en"
			className={`${youthTouch.variable} ${youthPower.variable} ${youthToday.variable} ${inter.variable} ${notoSans.variable}`}
		>
			<body>
				<Providers>
					<div className={"h-[2px] bg-primary"} />
					{children}
				</Providers>
			</body>
		</html>
	)
}
