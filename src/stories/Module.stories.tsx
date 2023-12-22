import { Meta, StoryObj } from "@storybook/react"
import { Module } from "~/entites"

const meta: Meta<typeof Module> = {
	title: "Entities/Module",
	component: Module,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Module component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Module>

export const ModuleStory: Story = {
	args: {
		title: "Grammar",
		amountOfTerms: 10,
	},
}
