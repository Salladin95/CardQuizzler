import type { Meta, StoryObj } from "@storybook/react"
import { FlatProgressBar } from "~/shared/"

const meta: Meta<typeof FlatProgressBar> = {
	title: "Shared/FlatProgressBar",
	component: FlatProgressBar,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "FlatProgressBar component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof FlatProgressBar>
export const Primary: Story = {
	args: {
		progress: 100,
		className: "",
		color: "#111",
	},
}
