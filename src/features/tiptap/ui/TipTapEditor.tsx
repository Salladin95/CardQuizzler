"use client"

import React from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold } from "@tiptap/extension-bold"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Italic } from "@tiptap/extension-italic"
import { Underline } from "@tiptap/extension-underline"
import { Strike } from "@tiptap/extension-strike"
import { TipTapEditorToolBar } from "~/features/tiptap"

type TipTapEditorProps = {
	onChange?: (richText: string) => void
}

export function TipTapEditor(props: TipTapEditorProps) {
	const { onChange } = props
	const editor = useEditor({
		extensions: [StarterKit.configure(), Bold, TextStyle, Color, Italic, Underline, Strike],
		editorProps: {
			attributes: {
				class: "textarea textarea-primary textarea-size-default w-full h-full min-w-[20rem]",
			},
		},
		onUpdate({ editor }) {
			onChange && onChange(editor.getHTML())
			console.log(editor.getHTML)
		},
		onBlur({ event }) {
			if (event && event.relatedTarget && (event.relatedTarget as Element).closest(".editor-wrapper")) {
				;(event.target as HTMLDivElement)?.focus()
			}
		},
	})

	return (
		<div className={"editor-wrapper"}>
			<TipTapEditorToolBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}
