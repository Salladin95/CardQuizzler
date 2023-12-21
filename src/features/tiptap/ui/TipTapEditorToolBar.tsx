import React from "react"

import { cn } from "src/lib"
import { Editor } from "@tiptap/react"
import { PropsWithClassName } from "~/app/types"
import { TipTapToolbarOption } from "./TipTapToolbarOption"
import { Button, Radio, Tooltip } from "~/shared"
import { getTipTapEditorSvgProps } from "../lib/lib"
import { BoldSvg, HighlightSvg, ItalicSvg, StrikethroughSvg, UnderlineSvg } from "src/features/tiptap/ui/icons"

type TipTapEditorToolBarProps = {
	editor: Editor | null
} & PropsWithClassName

export function TipTapEditorToolBar(props: TipTapEditorToolBarProps) {
	const { editor, className } = props
	if (!editor) return null
	return (
		<div className={cn("flex-center gap-x-3 tip-tap-toolbar", className)}>
			<TipTapToolbarOption editor={editor} onClick={() => editor?.chain().toggleBold().run()} name={"bold"}>
				<BoldSvg {...getTipTapEditorSvgProps("bold", editor)} />
			</TipTapToolbarOption>
			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleItalic().run()} name={"italic"}>
				<ItalicSvg {...getTipTapEditorSvgProps("italic", editor)} />
			</TipTapToolbarOption>
			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleUnderline().run()} name={"underline"}>
				<UnderlineSvg {...getTipTapEditorSvgProps("underline", editor)} />
			</TipTapToolbarOption>
			<TipTapToolbarOption editor={editor} onClick={() => editor.chain().toggleStrike().run()} name={"strike"}>
				<StrikethroughSvg {...getTipTapEditorSvgProps("strike", editor)} />
			</TipTapToolbarOption>

			<Tooltip
				className={"flex gap-1 group"}
				trigger={
					<div className={"w-min h-min gray-border hover:cursor-pointer group-hover:border-gray-300 rounded-lg p-2"}>
						<HighlightSvg className={"w-[12px] h-[12px] fill-blue-600 z-50"} />
					</div>
				}
				side={"top"}
			>
				<Radio
					checked={editor.isActive("highlight", { color: "#ffc078" })}
					onChange={(value) => editor.chain().setMark("highlight", { color: value.target.value }).run()}
					variant={"option"}
					size={"option"}
					label={"orange"}
					value={"#ffc078"}
					className={"w-[4rem] h-[2rem]"}
				/>
				<Radio
					className={"w-[4rem] h-[2rem]"}
					checked={editor.isActive("highlight", { color: "#8ce99a" })}
					onChange={(value) => editor.chain().toggleHighlight({ color: value.target.value }).run()}
					variant={"option"}
					size={"option"}
					label={"green"}
					value={"#8ce99a"}
				/>
				<Radio
					className={"w-[4rem] h-[2rem]"}
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
