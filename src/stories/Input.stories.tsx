import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "~/shared"

const meta: Meta<typeof Input> = {
	title: "Shared/Input",
	component: Input,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Input component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
	args: {
		placeholder: "Type...",
	},
}

export const Secondary: Story = {
	args: {
		placeholder: "Type...",
	},
}

export const Error: Story = {
	args: {
		placeholder: "Type...",
		error: true,
	},
}

export const WithPrefix: Story = {
	args: {
		placeholder: "Type...",
		prefix: <span>Prefix</span>,
	},
}

export const WithSuffix: Story = {
	args: {
		placeholder: "Type...",
		suffix: <span>Suffix</span>,
	},
}

export const WithPrefixSuffix: Story = {
	args: {
		placeholder: "Type...",
		prefix: <span>Prefix</span>,
		suffix: <span>Suffix</span>,
	},
}
