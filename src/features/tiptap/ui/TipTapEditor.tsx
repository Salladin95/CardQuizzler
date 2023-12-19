"use client"

import React from "react"
import { EditorContent } from "@tiptap/react"
import { TipTapEditorToolBar } from "./TipTapEditorToolBar"
import { useConfigureEditor } from "~/features/tiptap"
import { useHighlightText } from "~/shared/hooks/useHighlightText"

type TipTapEditorProps = {
	onChange: (richText: string) => void
}

export function TipTapEditor(props: TipTapEditorProps) {
	const editor = useConfigureEditor({ onChange: props.onChange })

	const selection = useHighlightText()

	return (
		<div className={"editor-wrapper"}>
			<TipTapEditorToolBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}
