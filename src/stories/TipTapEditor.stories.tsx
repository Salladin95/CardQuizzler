import type { Meta, StoryObj } from "@storybook/react"
import { TipTapEditor } from "~/features/tiptap/"

const meta: Meta<typeof TipTapEditor> = {
	title: "Features/TipTapEditor",
	component: TipTapEditor,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "TipTapEditor component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof TipTapEditor>

export const Primary: Story = {
	args: {},
}
