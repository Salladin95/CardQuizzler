import type { Meta, StoryObj } from "@storybook/react"
import { Flippable3d } from "~/features/flippable3d/Flippable3d"

const meta: Meta<typeof Flippable3d> = {
	title: "Features/Flippable3d",
	component: Flippable3d,
	parameters: {
		layout: "centered",
	},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {},
}
