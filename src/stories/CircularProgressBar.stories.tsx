import type { Meta, StoryObj } from "@storybook/react"
import { CircularProgressBar } from "~/shared/"

const meta: Meta<typeof CircularProgressBar> = {
	title: "Shared/SvgProgressBar",
	component: CircularProgressBar,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "SvgProgressBar component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof CircularProgressBar>

export const Primary: Story = {
	args: {
		progress: 100,
	},
}
