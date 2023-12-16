import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "~/shared/ui"

const meta: Meta<typeof Textarea> = {
	title: "Shared/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Textarea component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Primary: Story = { args: { placeholder: "Write your description" } }
export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: "Write your description",
	},
}
