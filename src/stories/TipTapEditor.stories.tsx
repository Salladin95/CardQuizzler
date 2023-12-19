import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TipTapEditor } from "~/features/tiptap/"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

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

function RenderStory() {
	const [richText, setRichText] = React.useState("")

	const editor = useEditor({
		content: richText,
		editable: false,
		editorProps: {
			attributes: {
				class: "text-black",
			},
		},
		extensions: [StarterKit.configure()],
	})

	React.useEffect(() => {
		editor?.commands.setContent(richText)
	}, [editor, richText])

	return (
		<div className={"flex flex-col gap-y-8"}>
			<TipTapEditor onChange={(newRichText) => setRichText(newRichText)} />
			<EditorContent editor={editor} />
		</div>
	)
}

export const Primary: Story = {
	render: RenderStory,
	args: {},
}
