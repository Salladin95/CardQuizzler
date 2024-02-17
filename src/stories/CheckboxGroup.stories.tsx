import type { Meta, StoryObj } from "@storybook/react"
import { CheckboxGroup } from "~/entites"
import { createOptions } from "~/shared/lib/creators"

const meta: Meta<typeof CheckboxGroup> = {
	title: "Entities/CheckboxGroup",
	component: CheckboxGroup,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "CheckboxGroup",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof CheckboxGroup>

const grid = "grid grid-cols-2 gap-4"
const options = createOptions(8)

export const Primary: Story = {
	args: {
		className: grid,
		options,
		variant: "primary",
		size: "default",
		name: "story",
	},
}

export const Outlined: Story = {
	args: {
		className: grid,
		options,
		variant: "outlined",
		size: "default",
		name: "story",
	},
}

export const Rooms: Story = {
	args: {
		className: "flex items-center gap-x-4",
		options: [
			{
				label: "Studio",
				value: "studio",
			},
			{
				label: "1",
				value: "1",
			},
			{
				label: "2",
				value: "2",
			},
			{
				label: "3",
				value: "3",
			},
		],
		variant: "option",
		size: "option",
		name: "rooms",
	},
}
