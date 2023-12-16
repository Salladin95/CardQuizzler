import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor } from "~/features/richText"

const meta: Meta<typeof RichTextEditor> = {
	title: "Features/RichTextEditor",
	component: RichTextEditor,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "RichTextEditor component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof RichTextEditor>

export const Primary: Story = {
	args: {},
}
