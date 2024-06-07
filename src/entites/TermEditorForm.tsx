import React from "react"
import { cn } from "~/shared"
import { Editor } from "~/features"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"

type TermEditorFormProps = {
	className?: string
	onUpdate: (updatedTerm: Partial<TermType>) => void
	term: TermType
}

export function TermEditorForm(props: TermEditorFormProps) {
	const { className, onUpdate, term } = props
	const t = useTranslations()
	return (
		<div className={cn("cursor-default flex flex-col 768:mt-2 768:flex-row gap-6", className)} data-no-dnd="true">
			<TermEditorItem title={t("Labels.term")} initialContent={term.title} onUpdate={(title) => onUpdate({ title })} />
			<TermEditorItem
				title={t("Labels.definition")}
				initialContent={term.description}
				onUpdate={(description) => onUpdate({ description })}
			/>
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
