"use client"
import React from "react"
import { TermType } from "~/app/models"
import { Button } from "~/shared"
import { TermEditorItem } from "./TermEditorItem"
import { PropsWithClassName } from "~/app/types"
import { cn } from "~/lib"

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
		<div className={cn("rounded bg-gray-800 px-8 py-4 text-white", className)}>
			<div className={"flex justify-between"}>
				<span>{index + 1}</span>
				<Button className={"w-min"} onClick={() => onDelete(index)} variant={"gray"}>
					Close
				</Button>
			</div>
			<div className={"flex flex-col 768:flex-row gap-4 mb-8"}>
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
