import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ModulesCarousel } from "~/widgets"
import { mockModules } from "~/shared/lib/mock/mock"

const meta: Meta<typeof ModulesCarousel> = {
	title: "Widgets/ModuleCarousel",
	component: ModulesCarousel,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"container"}>
			<ModulesCarousel data={cards} className={"h-[10rem]"} />,
		</div>
	),
}

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
	loaders: [
		() => ({
			cards: mockModules(),
		}),
	],
}
