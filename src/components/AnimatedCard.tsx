"use client"
import React from "react"
import { motion, PanInfo, useAnimation, useMotionValue } from "framer-motion"

type StartPoint = {
	x: number
	y: number
} | null

export default function AnimatedCard() {
	/**
	 * Motion value for controlling the rotation of the card.
	 */
	const rotate = useMotionValue(0)
	/**
	 * State to store the initial mouse coordinates on drag start.
	 * This is used to calculate the drag distance, which influences the rotation of the card.
	 */
	const [startPoint, setStartPoint] = React.useState<StartPoint>(null)

	const controls = useAnimation()

	const handleDragStart = (_e: MouseEvent, info: PanInfo) => {
		setStartPoint({ x: info.point.x, y: info.point.y })
	}

	const handleDrag = (_e: MouseEvent, info: PanInfo) => {
		if (!startPoint) return

		const offsetX = info.point.x - startPoint.x
		rotate.set(offsetX * 0.1)
	}

	const handleDragEnd = () => {
		setStartPoint(null)

		// Animate back to the initial position
		controls.start({ rotate: 0 })
	}

	return (
		<div className={"flex-center h-[90vh] overflow-hidden"}>
			<motion.div
				className={"w-360 h-360 bg-green-300 rounded-12px overflow-hidden"}
				drag={"x"}
				dragElastic={0.8}
				onDragStart={handleDragStart}
				onDrag={handleDrag}
				onDragEnd={handleDragEnd}
				style={{ rotate }}
				animate={controls}
				dragConstraints={{ left: 0, right: 0 }}
				transition={{ duration: 0.2 }}
			></motion.div>
		</div>
	)
}
