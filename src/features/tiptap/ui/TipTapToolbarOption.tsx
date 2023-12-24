import { Editor } from "@tiptap/react"
import React from "react"
import { Button } from "~/shared"
import { cn } from "src/lib"
import { PropsWithChildren } from "~/app/types"

type TipTapEditorOptionProps = {
	editor: Editor | null
	name: string
	onClick: () => void
} & PropsWithChildren

export function TipTapToolbarOption(props: TipTapEditorOptionProps) {
	const { editor, name, children, onClick } = props
	return (
		<Button
			variant={"secondary"}
			onClick={onClick}
			className={cn("w-min h-min after:rounded-lg p-2", {
				"bg-blue-100": editor?.isActive(name),
			})}
			data-active={Boolean(editor?.isActive(name))}
		>
			{children}
		</Button>
	)
}
