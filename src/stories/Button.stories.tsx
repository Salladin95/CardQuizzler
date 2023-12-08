import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "~/shared/"

const meta: Meta<typeof Button> = {
	title: "Shared/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Button component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {
		children: "Button",
	},
}

export const Secondary: Story = {
	args: {
		children: "Additional filters",
		variant: "secondary",
	},
}

export const Gray: Story = {
	args: {
		children: "Button",
		variant: "gray",
	},
}

export const Inline: Story = {
	args: {
		children: "Inline Button",
		variant: "inline",
		size: "inline",
	},
}

export const Nav: Story = {
	args: {
		children: "Navigation Button",
		variant: "nav",
		size: "default",
	},
}
