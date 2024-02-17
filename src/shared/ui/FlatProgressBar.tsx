import React from "react"
import { clampBetween, cn } from "~/shared/lib"
import { PropsWithClassName } from "~/app/types"
import { motion, MotionProps } from "framer-motion"

export type FlatProgressBarProps = {
	progress: number
	color?: string
} & PropsWithClassName &
	Omit<MotionProps, "style">

export function FlatProgressBar(props: FlatProgressBarProps) {
	const { className, color = "#6F61C0", progress, ...rest } = props
	// Ensure progress is between 0 and 100
	const clampedProgress = clampBetween({ min: 0, max: 100, value: progress })

	const background = `linear-gradient(to right, ${color} ${clampedProgress}%, #ededed ${clampedProgress}%)`

	return (
		<motion.div
			animate={{ background, transition: { duration: 1, ease: "easeOut" } }}
			initial={{ background: "transparent" }}
			className={cn("w-428 h-3", className)}
			{...rest}
		/>
	)
}
