import type { Meta, StoryObj } from "@storybook/react"
import { Radio } from "~/shared/ui"

const meta: Meta<typeof Radio> = {
	title: "Shared/Radio",
	component: Radio,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Radio component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Radio>

export const Primary: Story = {
	args: {
		label: "Radio",
		id: "radio",
	},
}

export const Outlined: Story = {
	args: {
		variant: "outlined",
		label: "Radio",
		id: "radio",
	},
}

export const Option: Story = {
	args: {
		variant: "option",
		size: "option",
		label: "Radio",
		id: "radio",
	},
}
