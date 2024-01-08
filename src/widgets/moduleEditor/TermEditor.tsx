"use client"
import React from "react"
import { cn } from "~/lib"
import { TermType } from "~/app/models"
import { Button, CloseIcon } from "~/shared"
import { TipTapEditor } from "~/features/tiptap"
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
		<div className={cn("rounded bg-gray-800 px-8 pt-4 pb-10 text-white cursor-grab", className)}>
			<div className={"flex justify-between"}>
				<span data-no-dnd="true">{index + 1}</span>
				<Button data-no-dnd="true" variant={"none"} className={"w-min"} onClick={() => onDelete(index)}>
					<CloseIcon />
				</Button>
			</div>
			<div className={"flex flex-col 768:flex-row gap-4 cursor-default"} data-no-dnd="true">
				<TermEditorItem
					onUpdate={(title) => handleUpdate({ title })}
					id={`term-title-${index}`}
					title={"Термин"}
					initialContent={term.title}
				/>
				<TermEditorItem
					onUpdate={(description) => handleUpdate({ description })}
					id={`term-description-${index}`}
					title={"Определение"}
					initialContent={term.description}
				/>
			</div>
		</div>
	)
}

type TermEditorItemProps = {
	id: string
	title: string
	initialContent: string
	onUpdate: (content: string) => void
}

export function TermEditorItem(props: TermEditorItemProps) {
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
