"use client"
import React from "react"
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { rotateAndMoveSmoothly } from "./animations"
import { animateOntoScreen, calculateMoveParameters } from "~/components/utils"
import { Card, SwiperCard, SwipeDirection } from "~/components/AnimatedSlide/types"

type StartPoint = {
	x: number
	y: number
} | null

const maxRotateAngle = 25

type AnimatedCardProps<T> = {
	card: SwiperCard<T>
	onSwipe: (direction: SwipeDirection) => void
	onBackAnimationEnd: () => void
	/**
	 * Creating a queueing effect where the earlier cards are visually in front.
	 */
	zIndex?: number
}

export default function AnimatedCard(props: AnimatedCardProps<Card>) {
	const { card, zIndex, onSwipe, onBackAnimationEnd } = props
	const controls = useAnimation()
	const rotate = useMotionValue(0)

	// Drag distance range for background gradient interpolation
	const xInputRange = [-maxRotateAngle, 0, maxRotateAngle]

	// Background gradient transformation based on drag distance
	const backgroundGradient = useTransform(rotate, xInputRange, [
		"linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
		"linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
		"linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
	])

	/**
	 * State to store the initial mouse coordinates on drag start.
	 * This is used to calculate the drag distance.
	 */
	const [startPoint, setStartPoint] = React.useState<StartPoint>(null)

	const handleDragStart = (_e: MouseEvent, info: PanInfo) => {
		setStartPoint({ x: info.point.x, y: info.point.y })
	}

	const handleDrag = (_e: MouseEvent, info: PanInfo) => {
		if (!startPoint) return
		const offsetX = info.point.x - startPoint.x
		rotate.set(offsetX * 0.1)
	}

	const handleDragEnd = async () => {
		const { moveDistance, targetRotation } = calculateMoveParameters()
		switch (true) {
			case rotate.get() >= maxRotateAngle:
				await rotateAndMoveSmoothly(moveDistance, targetRotation, controls)
				onSwipe("right")
				break

			case rotate.get() <= -maxRotateAngle:
				await rotateAndMoveSmoothly(-moveDistance, -targetRotation, controls)
				onSwipe("left")
				break

			default:
				setStartPoint(null)
				controls.start({ rotate: 0 })
		}
	}

	React.useEffect(() => {
		if (!card.swipedTowards) return
		;(async () => {
			const { moveDistance, targetRotation } = calculateMoveParameters()
			switch (card.swipedTowards) {
				case "left":
					await animateOntoScreen(controls, -moveDistance, -targetRotation)
					onBackAnimationEnd()
					break
				case "right":
					await animateOntoScreen(controls, moveDistance, targetRotation)
					onBackAnimationEnd()
					break
			}
		})()
	}, [card.swipedTowards, controls])

	return (
		<motion.div
			className={"absolute w-360 h-360 absolute bg-green-300 rounded-12px"}
			drag={"x"}
			dragElastic={0.8}
			onDragStart={handleDragStart}
			onDrag={handleDrag}
			onDragEnd={handleDragEnd}
			style={{ rotate, background: backgroundGradient, zIndex }}
			animate={controls}
			dragConstraints={{ left: 0, right: 0 }}
			transition={{ duration: 0.2 }}
		>
			<p className={"text-white"}>{card.title}</p>
		</motion.div>
	)
}
