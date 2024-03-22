"use client"
import React from "react"

import { cn } from "~/shared/lib"
import { ToolbarOption } from "./ToolbarOption"
import { useTermEditorCtx } from "~/shared"
import { getTipTapEditorSvgProps } from "../lib/lib"
import { DataAttributesProps, PropsWithClassName } from "~/app/types"
import { BoldSvg, HighlightSvg, ItalicSvg, StrikethroughSvg, UnderlineSvg } from "../ui/icons"

type TipTapEditorToolBarProps = PropsWithClassName & DataAttributesProps

export function EditorToolBar(props: TipTapEditorToolBarProps) {
	const { className, ...rest } = props
	const { editor } = useTermEditorCtx()
	return (
		<div
			data-toolbar
			data-no-dnd="true"
			className={cn(
				"flex-center gap-x-3 tip-tap-toolbar px-2 py-2 rounded-xl bg-gray-700",
				{
					"pointer-events-none opacity-60": !editor,
				},
				className,
			)}
			{...rest}
		>
			<ToolbarOption editor={editor} onClick={() => editor?.chain().focus().toggleBold().run()} name={"bold"}>
				<BoldSvg {...getTipTapEditorSvgProps("bold", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor?.chain().focus().toggleItalic().run()} name={"italic"}>
				<ItalicSvg {...getTipTapEditorSvgProps("italic", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor?.chain().focus().toggleUnderline().run()} name={"underline"}>
				<UnderlineSvg {...getTipTapEditorSvgProps("underline", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor?.chain().focus().toggleStrike().run()} name={"strike"}>
				<StrikethroughSvg {...getTipTapEditorSvgProps("strike", editor)} />
			</ToolbarOption>
			<ToolbarOption
				editor={editor}
				onClick={() => editor?.chain().focus().toggleHighlight({ color: "#ffc078" }).run()}
				name={"highlight"}
			>
				<HighlightSvg className={"w-[12px] h-[12px] fill-blue-600  z-50"} />
			</ToolbarOption>
		</div>
	)
}
