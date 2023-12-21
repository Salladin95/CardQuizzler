import { EditorOptions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold } from "@tiptap/extension-bold"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Italic } from "@tiptap/extension-italic"
import { Underline } from "@tiptap/extension-underline"
import { Strike } from "@tiptap/extension-strike"
import { Highlight } from "@tiptap/extension-highlight"

export function useConfigureEditor(props: { onChange?: (richText: string) => void } & Partial<EditorOptions>) {
	const { onChange, ...rest } = props
	return useEditor({
		extensions: [
			StarterKit.configure(),
			Highlight.configure({ multicolor: true }),
			Bold,
			TextStyle,
			Color,
			Italic,
			Underline,
			Strike,
		],
		editorProps: {
			attributes: {
				class: "textarea textarea-primary textarea-size-default w-full h-full min-w-[20rem]",
			},
		},
		onUpdate({ editor }) {
			onChange && onChange(editor.getHTML())
		},
		...rest,
	})
}
