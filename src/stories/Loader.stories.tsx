import type { Meta, StoryObj } from "@storybook/react"
import { Loader } from "~/shared"

const meta: Meta<typeof Loader> = {
	title: "Shared/Loader",
	component: Loader,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Loader component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Loader>

export const Primary: Story = {}

export const Customized: Story = {
	args: { className: "w-10 h-10 fill-danger text-gray-600" },
}
