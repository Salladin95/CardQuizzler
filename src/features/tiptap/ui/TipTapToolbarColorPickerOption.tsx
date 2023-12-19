import React from "react"
import { motion } from "framer-motion"
import { ColorPicker } from "~/shared"
import { ColorPaletteSvg } from "~/features/tiptap/ui/icons"
import { cn } from "~/utils"
import { fadeAnimationVariants } from "../lib/animations"

type TipTapToolbarColorPickerOptionProps = { onChange: (newColor: string) => void; onClick?: () => void }

export function TipTapToolbarColorPickerOption(props: TipTapToolbarColorPickerOptionProps) {
	const [color, setColor] = React.useState("#fff")
	const [showPalette, setShowPalette] = React.useState(false)

	function handleClick() {
		props.onClick && props.onClick()
		setShowPalette(!showPalette)
	}

	return (
		<div className={"w-[18px] h-[20px] ml-1 relative"}>
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
