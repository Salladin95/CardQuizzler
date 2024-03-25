import React from "react"
import { Editor } from "~/features"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { cn, TermEditorCtxProvider, UpdateTermPayload } from "~/shared"

type TermEditorFormProps = {
	term: TermType
	onUpdate: (v: Pick<UpdateTermPayload, "title" | "description">) => void
	className?: string
}

export function TermEditorForm(props: TermEditorFormProps) {
	const { term, onUpdate, className } = props
	const t = useTranslations()
	return (
		<TermEditorCtxProvider>
			<div className={cn("cursor-default flex flex-col 768:mt-2 768:flex-row gap-6", className)} data-no-dnd="true">
				<TermEditorItem
					onUpdate={(title) => onUpdate({ title })}
					title={t("Labels.term")}
					initialContent={term.title}
				/>
				<TermEditorItem
					onUpdate={(description) => onUpdate({ description })}
					title={t("Labels.definition")}
					initialContent={term.description}
				/>
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
