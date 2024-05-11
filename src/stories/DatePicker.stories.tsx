import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker as DatePickerComp } from "~/shared"

const meta: Meta<typeof DatePickerComp> = {
	title: "Shared/DatePicker",
	component: DatePickerComp,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "DatePicker component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof DatePickerComp>

export const DatePickerStories: Story = {
	args: {},
}
