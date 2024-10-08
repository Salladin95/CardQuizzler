import StarterKit from "@tiptap/starter-kit"
import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { EditorOptions, useEditor } from "@tiptap/react"

export function useConfigureEditor(props: Partial<EditorOptions>) {
	const { ...options } = props
	return useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
				heading: false,
				code: false,
				codeBlock: false,
				blockquote: false,
				bulletList: false,
				orderedList: false,
				listItem: false,
				horizontalRule: false,
				dropcursor: false,
				gapcursor: false,
				paragraph: {
					HTMLAttributes: {
						class: "",
					},
				},
			}),
			Highlight.configure({ multicolor: true }),
			TextStyle.configure(),
			Underline.configure(),
		],
		editorProps: {
			attributes: {
				class: "input input-primary input-size-default w-full h-full block pt-4",
			},
		},
		...options,
	})
}
