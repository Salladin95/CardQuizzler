"use client"
import React from "react"
import { ToastProvider } from "~/shared"
import { Locale } from "~/app/i18n/i18n"
import { ReactQueryProvider } from "./ReactQueryProvider"
import { NextIntlProvider } from "~/app/providers/NextIntlProvider"

export function Providers(props: { children: React.ReactNode; locale: Locale }) {
	const { children, locale } = props
	return (
		<NextIntlProvider locale={locale}>
			<ToastProvider>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</ToastProvider>
		</NextIntlProvider>
	)
}
