"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { TermType } from "~/app/models"
import { Button, XMarkIcon } from "~/shared"
import { Editor } from "~/features/editor"
import { PropsWithClassName } from "~/app/types"

type CreateModuleEditorProps = {
	term: TermType
	index: number
	onDelete: (index: number) => void
	onUpdate: (term: TermType, index: number) => void
} & PropsWithClassName

export function TermEditor(props: CreateModuleEditorProps) {
	const { onUpdate, onDelete, index, term, className } = props

	const handleUpdate = (updatedValues: Partial<TermType>) => {
		onUpdate({ ...term, ...updatedValues }, index)
	}

	return (
		<div className={cn("rounded bg-gray-800 px-4 428:px-8 pt-4 pb-10 text-white cursor-grab", className)}>
			<div className={"flex justify-between"}>
				<span data-no-dnd="true">{index + 1}</span>
				<Button data-no-dnd="true" variant={"none"} className={"w-min"} onClick={() => onDelete(index)}>
					<XMarkIcon />
				</Button>
			</div>
			<div className={"flex flex-col 768:flex-row gap-4 cursor-default"} data-no-dnd="true">
				<TermEditorItem onUpdate={(title) => handleUpdate({ title })} title={"Термин"} initialContent={term.title} />
				<TermEditorItem
					onUpdate={(description) => handleUpdate({ description })}
					title={"Определение"}
					initialContent={term.description}
				/>
			</div>
		</div>
	)
}

type TermEditorItemProps = {
	title: string
	initialContent: string
	onUpdate: (content: string) => void
}

export function TermEditorItem(props: TermEditorItemProps) {
	const { title, initialContent, onUpdate } = props
	return (
		<div className={"flex-1"}>
			<p className={"mb-2"}>{title}</p>
			<Editor
				options={{
					content: initialContent,
					onUpdate({ editor }) {
						onUpdate(editor.getHTML())
					},
				}}
			/>
		</div>
	)
}
