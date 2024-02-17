import { Meta, StoryObj } from "@storybook/react"
import { Folder } from "~/entites"
import { mockFolder } from "src/shared/lib/mock"

const meta: Meta<typeof Folder> = {
	title: "Entities/Folder",
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
		...mockFolder(),
	},
}
