import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { StarterKit } from "@tiptap/starter-kit"
import { EditorOptions, useEditor } from "@tiptap/react"

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
				class: "input input-primary input-size-default w-full h-full min-w-[20rem]",
			},
		},
		...props,
	})
}
