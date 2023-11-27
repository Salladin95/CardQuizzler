"use client"
import React from "react"
import { AnimationControls, motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"

type StartPoint = {
	x: number
	y: number
} | null

/**
 * Animates rotation and horizontal movement.
 * @param {number} to - The target horizontal position.
 * @param {number} rotation - The rotation angle.
 * @param {AnimationControls} controls - Animation controls from framer-motion.
 */
export function rotateAndMoveSmoothly(to: number, rotation: number, controls: AnimationControls) {
	const duration = Math.min(Math.abs(to) * 0.001, 0.8) // Adjust the factor as needed
	controls.start({
		rotate: rotation,
		translateX: to,
		transition: { duration, ease: "easeOut" },
	})
}

export default function AnimatedCard() {
	const controls = useAnimation()
	const rotate = useMotionValue(0)

	// Drag distance
	const dragX = useMotionValue(0)

	// Drag distance range for background gradient interpolation
	const xInputRange = [-100, 0, 100]

	// Background gradient transformation based on drag distance
	const backgroundGradient = useTransform(dragX, xInputRange, [
		"linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
		"linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
		"linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
	])

	/**
	 * State to store the initial mouse coordinates on drag start.
	 * This is used to calculate the drag distance, which influences the rotation of the card.
	 */
	const [startPoint, setStartPoint] = React.useState<StartPoint>(null)

	const handleDragStart = (_e: MouseEvent, info: PanInfo) => {
		setStartPoint({ x: info.point.x, y: info.point.y })
	}

	const handleDrag = (_e: MouseEvent, info: PanInfo) => {
		if (!startPoint) return

		const offsetX = info.point.x - startPoint.x

		dragX.set(offsetX)
		rotate.set(offsetX * 0.1)
	}

	const handleDragEnd = () => {
		const moveDistance = window.innerWidth + 100
		const targetRotation = moveDistance > 820 ? 90 : 60

		switch (true) {
			case dragX.get() >= 160:
				return rotateAndMoveSmoothly(moveDistance, targetRotation, controls)

			case dragX.get() <= -160:
				return rotateAndMoveSmoothly(-moveDistance, -targetRotation, controls)

			default:
				setStartPoint(null)
				dragX.set(0)
				controls.start({ rotate: 0 })
		}
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
				style={{ rotate, background: backgroundGradient }}
				animate={controls}
				dragConstraints={{ left: 0, right: 0 }}
				transition={{ duration: 0.2 }}
			></motion.div>
		</div>
	)
}
