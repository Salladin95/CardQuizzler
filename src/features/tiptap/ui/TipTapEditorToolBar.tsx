import React from "react"
import { ItalicSvg, StrikethroughSvg, UnderlineSvg } from "src/features/tiptap/ui/icons"

import { Editor } from "@tiptap/react"
import { BoldSvg } from "~/features/tiptap/ui/icons"
import { PropsWithClassName } from "~/app/types"
import { cn } from "src/lib"
import { TipTapToolbarOption } from "./TipTapToolbarOption"
import { getTipTapEditorSvgClassName } from "../lib/lib"
import { TipTapToolbarColorPickerOption } from "~/features/tiptap/ui/TipTapToolbarColorPickerOption"

type TipTapEditorToolBarProps = {
	editor: Editor | null
} & PropsWithClassName

export function TipTapEditorToolBar(props: TipTapEditorToolBarProps) {
	const { editor, className } = props
	if (!editor) return null
	return (
		<div className={cn("flex-center mb-4 gap-x-2", className)}>
			<TipTapToolbarOption editor={editor} onClick={() => editor?.chain().toggleBold().run()} name={"bold"}>
				<BoldSvg className={getTipTapEditorSvgClassName("bold", editor)} />
			</TipTapToolbarOption>

			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleItalic().run()} name={"italic"}>
				<ItalicSvg className={getTipTapEditorSvgClassName("italic", editor)} />
			</TipTapToolbarOption>
			<TipTapToolbarColorPickerOption
				onClick={() => editor?.chain().focus()}
				onChange={(newColor) => editor?.chain().setColor(newColor).run()}
			/>
			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleUnderline().run()} name={"underline"}>
				<UnderlineSvg className={getTipTapEditorSvgClassName("underline", editor)} />
			</TipTapToolbarOption>
			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleStrike().run()} name={"strike"}>
				<StrikethroughSvg className={getTipTapEditorSvgClassName("strike", editor)} />
			</TipTapToolbarOption>
		</div>
	)
}
