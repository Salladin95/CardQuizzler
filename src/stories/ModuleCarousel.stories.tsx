import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ModuleCarousel } from "~/widgets"
import { mockModules } from "~/lib/mock/mock"

const meta: Meta<typeof ModuleCarousel> = {
	title: "Widgets/ModuleCarousel",
	component: ModuleCarousel,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"container"}>
			<ModuleCarousel data={cards} className={"h-[10rem]"} />,
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
