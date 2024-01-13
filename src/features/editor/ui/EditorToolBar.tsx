"use client"
import React from "react"

import { cn } from "~/lib"
import { Editor } from "@tiptap/react"
import { ToolbarOption } from "./ToolbarOption"
import { Button, Radio, Tooltip } from "~/shared"
import { getTipTapEditorSvgProps } from "../lib/lib"
import { DataAttributesProps, PropsWithClassName } from "~/app/types"
import { BoldSvg, HighlightSvg, ItalicSvg, StrikethroughSvg, UnderlineSvg } from "../ui/icons"

type TipTapEditorToolBarProps = {
	editor: Editor | null
} & PropsWithClassName &
	DataAttributesProps

export function EditorToolBar(props: TipTapEditorToolBarProps) {
	const { editor, className, ...rest } = props
	if (!editor) return null
	return (
		<div data-no-dnd="true" className={cn("flex-center gap-x-3 tip-tap-toolbar", className)} {...rest}>
			<ToolbarOption editor={editor} onClick={() => editor?.chain().toggleBold().run()} name={"bold"}>
				<BoldSvg {...getTipTapEditorSvgProps("bold", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor.chain().toggleItalic().run()} name={"italic"}>
				<ItalicSvg {...getTipTapEditorSvgProps("italic", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor.chain().toggleUnderline().run()} name={"underline"}>
				<UnderlineSvg {...getTipTapEditorSvgProps("underline", editor)} />
			</ToolbarOption>
			<ToolbarOption editor={editor} onClick={() => editor.chain().toggleStrike().run()} name={"strike"}>
				<StrikethroughSvg {...getTipTapEditorSvgProps("strike", editor)} />
			</ToolbarOption>

			<Tooltip
				className={"flex gap-x-1 group"}
				trigger={
					<div className={"w-min h-min gray-border hover:cursor-pointer group-hover:border-gray-300 rounded-lg p-2"}>
						<HighlightSvg className={"w-[12px] h-[12px] fill-blue-600 z-50"} />
					</div>
				}
				side={"top"}
				data-no-dnd="true"
			>
				<Radio
					checked={editor.isActive("highlight", { color: "#ffc078" })}
					onChange={(value) => editor.chain().setMark("highlight", { color: value.target.value }).run()}
					variant={"option"}
					size={"option"}
					label={"orange"}
					value={"#ffc078"}
					className={"w-[4rem] h-[2rem] mr-1"}
				/>
				<Radio
					className={"w-[4rem] h-[2rem] mr-1"}
					checked={editor.isActive("highlight", { color: "#8ce99a" })}
					onChange={(value) => editor.chain().toggleHighlight({ color: value.target.value }).run()}
					variant={"option"}
					size={"option"}
					label={"green"}
					value={"#8ce99a"}
				/>
				<Radio
					className={"w-[4rem] h-[2rem] mr-1"}
					checked={editor.isActive("highlight", { color: "#74c0fc" })}
					onChange={(value) => editor.chain().toggleHighlight({ color: value.target.value }).run()}
					variant={"option"}
					size={"option"}
					label={"blue"}
					value={"#74c0fc"}
				/>
				<Button
					onClick={() => editor?.commands.unsetHighlight()}
					variant={"inline"}
					className={cn("w-[4rem] h-[2rem] text-main rounded-lg", {
						"gray-border": editor.isActive("highlight"),
						"hover:bg-gray-100": editor.isActive("highlight"),
					})}
					disabled={!editor.isActive("highlight")}
				>
					clear
				</Button>
			</Tooltip>
		</div>
	)
}
