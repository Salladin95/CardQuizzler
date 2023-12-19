import React, { PropsWithChildren } from "react"
import { motion, Variants } from "framer-motion"
import { Button, ColorPicker, useAwayClick } from "~/shared"
import { ColorPaletteSvg, ItalicSvg, StrikethroughSvg, UnderlineSvg } from "src/features/tiptap/ui/icons"

import { Editor } from "@tiptap/react"
import { BoldSvg } from "~/features/tiptap/ui/icons"
import { PropsWithClassName } from "~/app/types"
import { cn } from "~/utils"

type TipTapEditorToolBarProps = {
	editor: Editor | null
} & PropsWithClassName

export function TipTapEditorToolBar(props: TipTapEditorToolBarProps) {
	const { editor, className } = props
	if (!editor) return null
	return (
		<div className={cn("flex-center mb-4 gap-x-2", className)}>
			<TipTapEditorOption editor={editor} onClick={() => editor?.chain().toggleBold().run()} name={"bold"}>
				<BoldSvg className={getTipTapEditorSvgClassName("bold", editor)} />
			</TipTapEditorOption>

			<TipTapEditorOption editor={editor} onClick={() => editor.chain().toggleItalic().run()} name={"italic"}>
				<ItalicSvg className={getTipTapEditorSvgClassName("italic", editor)} />
			</TipTapEditorOption>
			<EditorColorPickerOption
				onClick={() => editor?.chain().focus()}
				onChange={(newColor) => editor?.chain().setColor(newColor).run()}
			/>
			<TipTapEditorOption editor={editor} onClick={() => editor.chain().toggleUnderline().run()} name={"underline"}>
				<UnderlineSvg className={getTipTapEditorSvgClassName("underline", editor)} />
			</TipTapEditorOption>
			<TipTapEditorOption editor={editor} onClick={() => editor.chain().toggleStrike().run()} name={"strike"}>
				<StrikethroughSvg className={getTipTapEditorSvgClassName("strike", editor)} />
			</TipTapEditorOption>
		</div>
	)
}

export const fadeAnimationVariants: Variants = {
	open: {
		opacity: 1,
		y: [-10, 25],
		transition: { type: "spring", bounce: 0.4, duration: 0.4 },
	},
	closed: {
		opacity: 0,
		y: 10,
		transition: { ease: "easeOut", duration: 0.2 },
	},
}

type CustomOptionProps = { onChange: (newColor: string) => void; onClick?: () => void }

export function EditorColorPickerOption(props: CustomOptionProps) {
	const [color, setColor] = React.useState("")
	const [showPalette, setShowPalette] = React.useState(false)
	const ref = React.useRef<HTMLDivElement>(null!)
	useAwayClick(ref, () => setShowPalette(false))

	function handleClick() {
		props.onClick && props.onClick()
		setShowPalette(!showPalette)
	}

	return (
		<div className={"w-[18px] h-[20px] ml-1 relative"} ref={ref}>
			<ColorPaletteSvg
				className={"w-full h-full hover:cursor-pointer hover:brightness-75 transition-all duration-200"}
				onClick={handleClick}
			/>
			<motion.div
				id={"color-picker"}
				style={{ x: -100 }}
				initial={false}
				animate={showPalette ? "open" : "closed"}
				variants={fadeAnimationVariants}
				className={cn("absolute z-10", {
					"pointer-events-none": !showPalette,
				})}
			>
				<ColorPicker
					onChange={(newColor) => {
						setColor(newColor)
						props.onChange(newColor)
					}}
					color={color}
				/>
			</motion.div>
		</div>
	)
}

type TipTapEditorOptionProps = {
	editor: Editor | null
	name: string
	onClick: () => void
} & PropsWithChildren

export function TipTapEditorOption(props: TipTapEditorOptionProps) {
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

export function getTipTapEditorSvgClassName(name: string, editor: Editor | null) {
	return cn("w-[1rem] h-[1rem] fill-blue-400 z-50", {
		"fill-primary": editor?.isActive(name),
	})
}
