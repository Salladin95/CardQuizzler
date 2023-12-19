import { Editor } from "@tiptap/react"
import React, { PropsWithChildren } from "react"
import { Button } from "~/shared"
import { cn } from "~/utils"

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
			className={cn("w-min after:rounded-lg", {
				"bg-blue-100": editor?.isActive(name),
			})}
			data-active={Boolean(editor?.isActive(name))}
		>
			{children}
		</Button>
	)
}
