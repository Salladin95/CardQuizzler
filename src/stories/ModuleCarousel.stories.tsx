import React from "react"
import { Locale } from "~/app/i18n"
import { ModulesCarousel } from "~/widgets"
import { mockModules } from "~/shared/lib/mock/mock"
import type { Meta, StoryObj } from "@storybook/react"
import withQuery from "~/stories/decorators/withQuery"
import withTranslation from "~/stories/decorators/withTranslation"

const meta: Meta<typeof ModulesCarousel> = {
	title: "Widgets/ModuleCarousel",
	component: ModulesCarousel,
	decorators: [withTranslation({ locale: Locale.RU }), withQuery()],
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"container"}>
			<ModulesCarousel data={cards} className={"h-[10rem]"} />
		</div>
	),
}

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
	loaders: [
		() => ({
			cards: mockModules(10),
		}),
	],
}
