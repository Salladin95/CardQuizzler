"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { TermType } from "~/app/models"
import { useWindowSize } from "react-use"
import { PropsWithClassName } from "~/app/types"
import { EditorToolBar } from "~/features/editor"
import { TermEditorForm } from "~/entites/TermEditorForm"
import { Button, TermEditorCtxProvider, UpdateTermPayload, XMarkIcon } from "~/shared"

type CreateModuleEditorProps = {
	term: TermType
	index: number
	onDelete: (index: number) => void
	onUpdate: (index: number, term: TermType) => void
} & PropsWithClassName

export function TermEditor(props: CreateModuleEditorProps) {
	const { onUpdate, onDelete, index, term, className } = props

	const handleUpdate = (updatedValues: Partial<UpdateTermPayload>) => {
		const updatedTerm = { ...term, ...updatedValues }
		onUpdate(index, updatedTerm)
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
				<TermEditorForm index={index} term={term} onUpdate={handleUpdate} />
			</div>
		</TermEditorCtxProvider>
	)
}
