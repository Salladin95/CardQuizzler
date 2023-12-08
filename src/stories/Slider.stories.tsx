import type { Meta, StoryObj } from "@storybook/react"
import { mockCards } from "~/entites/card"
import React from "react"
import { Slider } from "~/features/slider"

const meta: Meta<typeof Slider> = {
	title: "example/Slider",
	component: Slider,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"w-[100vw] h-[100vh] flex-center"}>
			<Slider slides={cards} />
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
