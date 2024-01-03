"use client"
import React from "react"
import { cn } from "~/lib"
import { Popover } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { EditorContent, EditorOptions } from "@tiptap/react"
import { TipTapEditorToolBar, useConfigureEditor } from "~/features/tiptap"
import { useEditorHighlightPosition } from "../hooks/useEditorHighlightPosition"

type TipTapEditorProps = {
	options?: Partial<EditorOptions>
	id: string
} & PropsWithClassName

export function TipTapEditor(props: TipTapEditorProps) {
	const { id, className, options } = props
	const editor = useConfigureEditor({ ...options })
	const selectedTextPosition = useEditorHighlightPosition(`#${id}`)

	return (
		<div className={cn("editor-wrapper", className)} id={props.id}>
			<EditorContent editor={editor} />
			{selectedTextPosition && (
				<Popover
					open={Boolean(selectedTextPosition)}
					trigger={null}
					style={{ position: "absolute", top: selectedTextPosition?.top - 80, left: selectedTextPosition?.left - 125 }}
					side={"top"}
				>
					<TipTapEditorToolBar editor={editor} />
				</Popover>
			)}
		</div>
	)
}
