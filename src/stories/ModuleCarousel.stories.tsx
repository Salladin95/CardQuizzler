import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { mockFolders } from "~/lib/mock/mock"
import { ModuleCarousel } from "~/widgets"

const meta: Meta<typeof ModuleCarousel> = {
	title: "Widgets/ModuleCarousel",
	component: ModuleCarousel,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"w-[100vw] h-[100vh] flex-center"}>
			<ModuleCarousel data={cards} className={"w-360 h-428"} />
		</div>
	),
}

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
	loaders: [
		() => ({
			cards: mockFolders(),
		}),
	],
}
