import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Swiper } from "~/features/swiper/Swiper"
import { mockTerms } from "~/lib/mock/mockTerm"

const meta: Meta<typeof Swiper> = {
	title: "Features/Swiper",
	component: Swiper,
	parameters: {
		layout: "fullscreen",
	},
	render: (args, { loaded: { cards } }) => (
		<div className={"w-[100vw] h-[100vh] flex-center"}>
			<Swiper cards={cards} className={"w-360 h-428"} />
		</div>
	),
}

export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {
	loaders: [
		() => ({
			cards: mockTerms(),
		}),
	],
}
