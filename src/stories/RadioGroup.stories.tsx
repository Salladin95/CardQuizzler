import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup } from "~/entites"
import { createOptions } from "~/lib/creators"

const meta: Meta<typeof RadioGroup> = {
	title: "Entities/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "RadioGroup",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof RadioGroup>

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

export const Pagination: Story = {
	args: {
		className: "flex items-center gap-x-4",
		options: [
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
		name: "page",
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
