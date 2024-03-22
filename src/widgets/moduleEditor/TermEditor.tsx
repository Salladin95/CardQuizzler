"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { PropsWithClassName } from "~/app/types"
import { Editor, EditorToolBar } from "~/features/editor"
import { Button, TermEditorCtxProvider, XMarkIcon } from "~/shared"
import { useWindowSize } from "react-use"

type CreateModuleEditorProps = {
	term: TermType
	index: number
	onDelete: (index: number) => void
	onUpdate: (term: TermType, index: number) => void
} & PropsWithClassName

export function TermEditor(props: CreateModuleEditorProps) {
	const { onUpdate, onDelete, index, term, className } = props
	const t = useTranslations()

	const handleUpdate = (updatedValues: Partial<TermType>) => {
		onUpdate({ ...term, ...updatedValues }, index)
	}

	const { width } = useWindowSize()

	return (
		<TermEditorCtxProvider>
			<div className={cn("rounded bg-gray-800 px-4 428:px-8 pt-4 pb-10 text-white relative", className)}>
				<div className={"flex justify-between mb-4"}>
					<span data-no-dnd="true">{index + 1}</span>
					<EditorToolBar className={cn("", { "opacity-0 pointer-events-none": width < 1080 })} />
					<Button data-no-dnd="true" variant={"none"} className={"w-min"} onClick={() => onDelete(index)}>
						<XMarkIcon />
					</Button>
				</div>
				<div className={"cursor-default flex flex-col 768:mt-2 768:flex-row gap-6"} data-no-dnd="true">
					<TermEditorItem
						onUpdate={(title) => handleUpdate({ title })}
						title={t("Labels.term")}
						initialContent={term.title}
					/>
					<TermEditorItem
						onUpdate={(description) => handleUpdate({ description })}
						title={t("Labels.definition")}
						initialContent={term.description}
					/>
				</div>
			</div>
		</TermEditorCtxProvider>
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
