import React from "react"
import { EditorContent } from "@tiptap/react"
import { useConfigureEditor } from "~/features/editor"

export function DisplayEditorContent(props: { content: string; onClick?: (e: React.SyntheticEvent) => void }) {
	const { content, onClick } = props
	const editorContent = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-white",
			},
		},
		content,
	})

	return (
		<div onClick={onClick} className={"w-full h-full flex-center"}>
			<EditorContent editor={editorContent} />
		</div>
	)
}
