"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { PropsWithClassName } from "~/app/types"
import { EditorContent, EditorOptions } from "@tiptap/react"
import { useConfigureEditor, useTermEditorCtx } from "~/shared"

type TipTapEditorProps = {
	options?: Partial<EditorOptions>
} & PropsWithClassName

export function Editor(props: TipTapEditorProps) {
	const { setEditor } = useTermEditorCtx()
	const { className, options } = props
	const parentRef = React.useRef<HTMLDivElement>(null)
	const editor = useConfigureEditor({
		...options,
		onFocus: () => setEditor(editor),
		onBlur: ({ event }) => {
			const target: HTMLElement | null = event.relatedTarget as HTMLElement
			const toolbar: HTMLElement | null = target?.closest("[data-toolbar]")
			!toolbar && setEditor(null)
		},
	})

	return (
		<div className={cn("editor-wrapper relative text-black", className)} ref={parentRef}>
			<EditorContent editor={editor} />
		</div>
	)
}
