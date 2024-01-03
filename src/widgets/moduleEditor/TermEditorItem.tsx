"use client"
import React from "react"
import { TipTapEditor } from "~/features/tiptap"

type CreateModuleItemProps = {
	id: string
	title: string
	initialContent: string
	onUpdate: (content: string) => void
}

export function TermEditorItem(props: CreateModuleItemProps) {
	const { id, title, initialContent, onUpdate } = props
	return (
		<div className={"flex-1"}>
			<p className={"mb-2"}>{title}</p>
			<TipTapEditor
				options={{
					content: initialContent,
					onBlur({ editor }) {
						onUpdate(editor.getHTML())
					},
				}}
				id={id}
			/>
		</div>
	)
}
