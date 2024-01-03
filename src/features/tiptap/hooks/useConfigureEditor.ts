import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { EditorOptions, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"

export function useConfigureEditor(props: Partial<EditorOptions>) {
	return useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
				heading: false,
				code: false,
			}),
			Highlight.configure({ multicolor: true }),
			TextStyle,
			Underline,
		],
		editorProps: {
			attributes: {
				class: "textarea textarea-primary textarea-size-default w-full h-full min-w-[20rem]",
			},
		},
		...props,
	})
}
