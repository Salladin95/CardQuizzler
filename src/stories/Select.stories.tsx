import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "~/shared"
import { createOptions } from "~/shared/lib"

const meta: Meta<typeof Select> = {
	title: "Shared/Select",
	component: Select,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Select component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Select>

export const Primary: Story = {
	args: {
		placeholder: "Select an option...",
		options: createOptions(10),
	},
}

export const Error: Story = {
	args: {
		placeholder: "Select an option...",
		error: true,
		options: createOptions(10),
	},
}

export const Controlled: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState<string>("")
		return (
			<Select
				className={"mb-4"}
				name={"select"}
				onChange={setValue}
				options={createOptions(10)}
				placeholder={"Select an option..."}
				value={value}
			/>
		)
	},
}

export const DefaultValue: Story = {
	args: {
		placeholder: "Select an option...",
		defaultValue: "2",
		options: createOptions(10),
	},
}
