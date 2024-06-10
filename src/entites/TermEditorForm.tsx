import React from "react"
import { cn } from "~/shared"
import { Editor } from "~/features"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { FieldError, useFormContext } from "react-hook-form"

type TermEditorFormProps = {
	className?: string
	index?: number
	onUpdate: (updatedTerm: Partial<TermType>) => void
	term: TermType
}

export function TermEditorForm(props: TermEditorFormProps) {
	const { className, onUpdate, term, index } = props
	const t = useTranslations()

	const form = useFormContext<{ terms: TermType[] }>()
	const error = React.useMemo(() => {
		if (index === undefined) return null
		const errors = form?.formState.errors.terms
		return errors ? errors[index] : null
	}, [form?.formState, index])
	return (
		<div className={cn("cursor-default flex flex-col 768:mt-2 768:flex-row gap-6", className)} data-no-dnd="true">
			<TermEditorItem
				error={error?.title}
				title={t("Labels.term")}
				initialContent={term.title}
				onUpdate={(title) => onUpdate({ title })}
			/>
			<TermEditorItem
				error={error?.description}
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
	error?: FieldError | null
}

export function TermEditorItem(props: TermEditorItemProps) {
	const { title, initialContent, onUpdate, error } = props
	return (
		<div className={"flex-1"}>
			<p className={"mb-2"}>{title}</p>
			<Editor
				error={error}
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
