import { EditorContent } from "@tiptap/react"
import { useConfigureEditor } from "~/features/editor"

export function DisplayEditorContent(props: { content: string }) {
	const { content } = props
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
		<div className={"w-full h-full flex-center"}>
			<EditorContent editor={editorContent} />
		</div>
	)
}
