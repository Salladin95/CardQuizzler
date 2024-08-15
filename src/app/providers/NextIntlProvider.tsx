"use client"
import React from "react"
import { NextIntlClientProvider } from "next-intl"

import { Locale } from "~/app/i18n/i18n"
import en from "~/app/i18n/messages/en.json"
import ru from "~/app/i18n/messages/ru.json"

const messages = { en, ru }

export function NextIntlProvider(props: { children: React.ReactNode; locale: Locale }) {
	const { children, locale } = props
	return (
		<NextIntlClientProvider
			timeZone={"Europe/Moscow"}
			locale={locale}
			messages={messages[locale] as Record<never, never>}
		>
			{children}
		</NextIntlClientProvider>
	)
}
