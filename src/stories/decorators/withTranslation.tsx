import React from "react"
import { Locale } from "~/app/i18n"
import type { Decorator } from "@storybook/react"
import { NextIntlClientProvider } from "next-intl"

import en from "~/app/i18n/messages/en.json"
import ru from "~/app/i18n/messages/ru.json"

const messages = { en, ru }

/**
 * Decorator for elements with translations.
 * Adds transtalion context to properly render element
 * */
export default function withTranslation(props: { locale: Locale }): Decorator {
	return (Story) => {
		return (
			<NextIntlClientProvider locale={props.locale} messages={messages[props.locale]}>
				<Story />
			</NextIntlClientProvider>
		)
	}
}
