import React from "react"
import { FolderCarousel } from "~/widgets"
import { mockFolders } from "~/lib/mock/mock"
import type { Meta, StoryObj } from "@storybook/react"
import { withRouter } from "storybook-addon-react-router-v6"

const meta: Meta<typeof FolderCarousel> = {
	title: "Widgets/FolderCarousel",
	component: FolderCarousel,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [withRouter],
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
