"use client"
import React from "react"
import cls from "classnames"
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { animateOntoScreen, rotateAndMoveSmoothly } from "../animations"
import { calculateMoveParameters } from "../utils"
import { SwipeDirection } from "~/features/swipeable"

type StartPoint = {
	x: number
	y: number
} | null

const maxRotateAngle = 25

export type SwipedCard = {
	// We should add return effect, if it was swiped before
	swipedTowards?: SwipeDirection
}
export type SwipeableProps = SwipedCard & {
	children: React.ReactNode
	onSwipe: (direction: SwipeDirection) => void
	onAnimationStart: () => void
	onAnimationComplete: () => void
	// We want to only show the content of the card that is on top of our pack
	isTheTopCard?: boolean
	// When we pack cards, by default we see the last card on top, but adjusting z-index we can adjust this effect
	zIndex?: number
	/**
	 * Background for the card. Should be an array of three colors.
	 * Each element in the array corresponds to a different case:
	 *
	 * 1. Background when card is swiped towards the left.
	 * 2. Background when card is swiped towards the right.
	 * 3. Default background when the card is in its initial state.
	 *
	 * Example: [
	 *   "linear-gradient(...) - Left swipe",
	 *   "linear-gradient(...) - Right swipe",
	 *   "linear-gradient(...) - Default"
	 * ]
	 */
	backgroundColors?: [string, string, string]
}

export function Swipeable(props: SwipeableProps) {
	const {
		swipedTowards,
		children,
		zIndex,
		onSwipe,
		onAnimationStart,
		onAnimationComplete,
		isTheTopCard,
		backgroundColors = [
			"linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
			"linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
			"linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
		],
	} = props
	const controls = useAnimation()
	const rotate = useMotionValue(0)
	const rotateRange = [-maxRotateAngle, 0, maxRotateAngle]

	// Background gradient transformation based on drag distance
	const background = useTransform(rotate, rotateRange, backgroundColors)

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
		//The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
		// if we hit left or right edge we swipe the card, otherwise we return it to its original position
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
		// animates return
		if (!swipedTowards) return
		;(async () => {
			const { moveDistance, targetRotation } = calculateMoveParameters()
			switch (swipedTowards) {
				case "left":
					await animateOntoScreen(controls, -moveDistance, -targetRotation)
					break
				case "right":
					await animateOntoScreen(controls, moveDistance, targetRotation)
					break
			}
		})()
	}, [swipedTowards, controls])

	return (
		<motion.div
			className={cls("absolute w-360 h-360 bg-green-300 rounded-12px", {
				"pointer-events-none": !isTheTopCard,
			})}
			drag={"x"}
			dragElastic={0.8}
			onDragStart={handleDragStart}
			onDrag={handleDrag}
			onDragEnd={handleDragEnd}
			style={{
				rotate,
				background,
				zIndex,
			}}
			animate={controls}
			dragConstraints={{ left: 0, right: 0 }}
			transition={{ duration: 0.2 }}
			onAnimationStart={onAnimationStart}
			onAnimationComplete={onAnimationComplete}
		>
			<div className={cls("text-white", { "opacity-0": !isTheTopCard })}>{children}</div>
		</motion.div>
	)
}
