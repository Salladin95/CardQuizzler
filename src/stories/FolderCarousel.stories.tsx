import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { mockFolders } from "~/lib/mock/mock"
import { FolderCarousel } from "~/widgets"

const meta: Meta<typeof FolderCarousel> = {
	title: "Widgets/FolderCarousel",
	component: FolderCarousel,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"container"}>
			<FolderCarousel data={cards} className={"h-[10rem]"} />,
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
