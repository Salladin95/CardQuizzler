"use client"
import React from "react"
import { Popover } from "~/shared"
import { EditorContent } from "@tiptap/react"
import { useEditorHighlightPosition } from "~/features/tiptap/hooks/useEditorHighlightPosition"
import { TipTapEditorToolBar, useConfigureEditor } from "~/features/tiptap"

interface TipTapEditorProps {
	onChange: (richText: string) => void
	id: string
}

export function TipTapEditor(props: TipTapEditorProps) {
	const editor = useConfigureEditor({ onChange: props.onChange })
	const selectedTextPosition = useEditorHighlightPosition("#" + props.id)

	return (
		<div className={"editor-wrapper"} id={props.id}>
			<EditorContent editor={editor} />
			{selectedTextPosition && (
				<Popover
					open={Boolean(selectedTextPosition)}
					trigger={null}
					style={{ position: "absolute", top: selectedTextPosition.top - 80, left: selectedTextPosition.left - 125 }}
					side={"top"}
				>
					<TipTapEditorToolBar editor={editor} />
				</Popover>
			)}
		</div>
	)
}
