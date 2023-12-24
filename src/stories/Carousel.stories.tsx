import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Carousel } from "src/features/carousel"
import { mockCards } from "~/lib/mock/mockCard"

const meta: Meta<typeof Carousel> = {
	title: "Features/Carousel",
	component: Carousel,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"w-[100vw] h-[100vh] flex-center"}>
			<Carousel cards={cards} />
		</div>
	),
}

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
	loaders: [
		() => ({
			cards: mockCards(),
		}),
	],
}
