import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "~/shared"

const meta: Meta<typeof Checkbox> = {
	title: "Shared/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Checkbox component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
	args: {
		label: "Checkbox",
		id: "checkbox",
	},
}

export const Outlined: Story = {
	args: {
		variant: "outlined",
		label: "Checkbox",
		id: "checkbox",
	},
}
