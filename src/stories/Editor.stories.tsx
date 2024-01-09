import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Editor, useConfigureEditor } from "~/features/tiptap/"
import { EditorContent } from "@tiptap/react"

const meta: Meta<typeof Editor> = {
	title: "Features/TipTapEditor",
	component: Editor,
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

type Story = StoryObj<typeof Editor>

function RenderStory() {
	const editor1 = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-black",
			},
		},
	})
	const editor2 = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-black",
			},
		},
	})

	return (
		<div className={"flex flex-col gap-y-8"}>
			<h1>Editor - 1</h1>
			<Editor options={{ onUpdate: (newRichText) => editor1?.commands.setContent(newRichText) }} />
			<h1>Editor content - 1</h1>
			<EditorContent editor={editor1} />

			<h1>Editor - 2</h1>
			<Editor options={{ onUpdate: (newRichText) => editor2?.commands.setContent(newRichText) }} />
			<h1>Editor content - 2</h1>
			<EditorContent editor={editor2} />
		</div>
	)
}

export const Primary: Story = {
	args: {},
}
export const TwoEditors: Story = {
	render: RenderStory,
	args: {},
}
