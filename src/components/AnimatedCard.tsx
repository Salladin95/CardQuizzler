"use client"
import React from "react"
import cls from "classnames"
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { animateOntoScreen, rotateAndMoveSmoothly } from "./animations"
import { calculateMoveParameters } from "~/components/utils"
import { Card, SwipeDirection, SwiperCard } from "~/components/AnimatedSlide/types"

type StartPoint = {
	x: number
	y: number
} | null

const maxRotateAngle = 25

type AnimatedCardProps<T> = {
	card: SwiperCard<T>
	onSwipe: (direction: SwipeDirection) => void
	onAnimationStart: () => void
	onAnimationComplete: () => void
	isTheFirstCard: boolean
	/**
	 * Creating a queueing effect where the earlier cards are visually in front.
	 */
	zIndex: number
}

export default function AnimatedCard(props: AnimatedCardProps<Card>) {
	const { card, zIndex, onSwipe, onAnimationStart, onAnimationComplete, isTheFirstCard } = props
	const controls = useAnimation()
	const rotate = useMotionValue(0)
	const rotateRange = [-maxRotateAngle, 0, maxRotateAngle]

	// Background gradient transformation based on drag distance
	const background = useTransform(rotate, rotateRange, [
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
					break
				case "right":
					await animateOntoScreen(controls, moveDistance, targetRotation)
					break
			}
		})()
	}, [card.swipedTowards, controls])

	return (
		<motion.div
			className={cls("absolute w-360 h-360 bg-green-300 rounded-12px", {
				"pointer-events-none": !isTheFirstCard,
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
			<p className={cls("text-white", { "opacity-0": !isTheFirstCard })}>{card.title}</p>
		</motion.div>
	)
}
