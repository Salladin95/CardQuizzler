import React from "react"
import { motion } from "framer-motion"
import { ColorPicker, useAwayClick } from "~/shared"
import { ColorPaletteSvg } from "~/features/tiptap/ui/icons"
import { cn } from "src/lib"
import { fadeAnimationVariants } from "../lib/animations"

type TipTapToolbarColorPickerOptionProps = { onChange: (newColor: string) => void; onClick?: () => void }

export function TipTapToolbarColorPickerOption(props: TipTapToolbarColorPickerOptionProps) {
	const [color, setColor] = React.useState("#fff")
	const [showPalette, setShowPalette] = React.useState(false)
	const ref = React.useRef<HTMLDivElement>(null!)

	useAwayClick(ref, () => setShowPalette(false))

	function handleClick(event: React.SyntheticEvent) {
		// Check if there is selected text
		const isTextSelected = Boolean(window.getSelection()?.toString().trim().length)
		console.log(isTextSelected)

		// If there is no selected text, call props.onClick
		if (!isTextSelected) {
			props.onClick && props.onClick()
		}

		// Show/hide the color palette based on the selected text
		setShowPalette(!showPalette)

		// Prevent default behavior and stop propagation
		event.preventDefault()
		event.stopPropagation()
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
