import StarterKit from "@tiptap/starter-kit"
import { Bold } from "@tiptap/extension-bold"
import { Strike } from "@tiptap/extension-strike"
import { Italic } from "@tiptap/extension-italic"
import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { EditorOptions, useEditor } from "@tiptap/react"

export function useConfigureEditor(props: Partial<EditorOptions>) {
	return useEditor({
		extensions: [
			StarterKit.configure(),
			Highlight.configure({ multicolor: true }),
			Bold,
			TextStyle,
			Italic,
			Underline,
			Strike,
		],
		editorProps: {
			attributes: {
				class: "textarea textarea-primary textarea-size-default w-full h-full min-w-[20rem]",
			},
		},
		...props,
	})
}
