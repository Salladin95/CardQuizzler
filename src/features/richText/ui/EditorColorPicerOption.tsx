import React from "react"
import { ColorPicker, useAwayClick } from "~/shared"
import { motion, Variants } from "framer-motion"
import { ColorPaletteSvg } from "~/features/richText/ui/icons"
import { cn } from "~/utils"
import { EditorState } from "draft-js"

type CustomOptionProps = { onChange: (key: string, value: string | EditorState) => void }

export function EditorColorPickerOption(props: CustomOptionProps) {
	const [color, setColor] = React.useState("")
	const [showPalette, setShowPalette] = React.useState(false)
	const ref = React.useRef<HTMLDivElement>(null!)
	useAwayClick(ref, () => setShowPalette(false))

	function handleClick() {
		setShowPalette(!showPalette)
	}

	const fadeAnimationVariants: Variants = {
		open: {
			opacity: 1,
			y: [-10, 10],
			transition: { type: "spring", bounce: 0.4, duration: 0.4 },
		},
		closed: {
			opacity: 0,
			y: 10,
			transition: { ease: "easeOut", duration: 0.2 },
		},
	}

	return (
		<div className={"w-[18px] h-[20px] ml-1"} ref={ref}>
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
				className={cn("absolute z-10 left-[50%]", {
					"pointer-events-none": !showPalette,
				})}
			>
				<ColorPicker
					onChange={(newColor) => {
						setColor(newColor)
						props.onChange("color", newColor)
					}}
					color={color}
				/>
			</motion.div>
		</div>
	)
}
