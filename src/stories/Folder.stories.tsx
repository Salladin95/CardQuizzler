import { Meta, StoryObj } from "@storybook/react"
import { Folder } from "~/shared"

const meta: Meta<typeof Folder> = {
	title: "Shared/Folder",
	component: Folder,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Folder component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Folder>

export const FolderStory: Story = {
	args: {
		title: "Grammar",
		amountOfModules: 10,
	},
}
