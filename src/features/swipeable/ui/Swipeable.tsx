"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { animateOntoScreen, moveCardToItsInitialPosition, rotateAndMoveSmoothly } from "../animations"
import { calculateMoveParameters } from "../utils"
import { DataAttributesProps, PropsWithClassName } from "~/app/types"

type StartPoint = {
	x: number
	y: number
} | null

const maxRotateAngle = 8

export type SwipedCard = {
	// We should add return effect, if it was swiped before
	answer?: boolean
}

export const redGradient = "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)"
export const purpleGradient = "linear-gradient(90deg, rgba(29,55,145,1) 0%, rgba(0,25,52,1) 100%)"
export const greenGradient = "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
const swiperBackgroundColors: [string, string, string] = [redGradient, purpleGradient, greenGradient]
export type SwipeableProps = SwipedCard & {
	children?: React.ReactNode
	onSwipe: (answer: boolean) => void
	isAnimating?: boolean
	onAnimationStart?: () => void
	onAnimationComplete?: () => void
	// We want to only show the content of the card that is on top of our pack
	isTheTopCard?: boolean
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
} & PropsWithClassName &
	DataAttributesProps

export const Swipeable = React.forwardRef<HTMLDivElement, SwipeableProps>((props: SwipeableProps, ref) => {
	const {
		answer,
		onSwipe,
		onAnimationStart,
		onAnimationComplete,
		isTheTopCard,
		backgroundColors = swiperBackgroundColors,
		isAnimating,
		className,
		children,
		...rest
	} = props
	const controls = useAnimation()
	const rotate = useMotionValue(0)
	const x = useMotionValue(0)
	const rotateRange = [-maxRotateAngle, 0, maxRotateAngle]
	const [dragActive, setDragActive] = React.useState(false)
	// Background gradient transformation based on drag distance
	const background = useTransform(rotate, rotateRange, backgroundColors)

	/**
	 * State to store the initial mouse coordinates on drag start.
	 * This is used to calculate the drag distance.
	 */
	const [startPoint, setStartPoint] = React.useState<StartPoint>(null)

	const handleDragStart = (_e: MouseEvent, info: PanInfo) => {
		if (isAnimating || startPoint) return
		setStartPoint({ x: info.point.x, y: info.point.y })
		setDragActive(true)
	}

	const handleDrag = (_e: MouseEvent, info: PanInfo) => {
		if (!startPoint || isAnimating) return
		const offsetX = info.point.x - startPoint.x
		x.set(offsetX)
		rotate.set(offsetX * 0.1)
	}

	const handleDragEnd = async () => {
		const { moveDistance, targetRotation } = calculateMoveParameters()
		//The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
		// if we hit left or right edge we swipe the card, otherwise we return it to its original position
		switch (true) {
			case rotate.get() >= maxRotateAngle:
				await rotateAndMoveSmoothly(moveDistance, targetRotation, controls)
				onSwipe(true)
				break

			case rotate.get() <= -maxRotateAngle:
				await rotateAndMoveSmoothly(-moveDistance, -targetRotation, controls)
				onSwipe(false)
				break

			default:
				setStartPoint(null)
				await moveCardToItsInitialPosition(controls)
				setDragActive(false)
		}
	}

	React.useEffect(() => {
		// animates return
		if (answer === undefined) return
		;(async () => {
			const { moveDistance, targetRotation } = calculateMoveParameters()
			switch (answer) {
				case false:
					await animateOntoScreen(controls, -moveDistance, -targetRotation)
					break
				case true:
					await animateOntoScreen(controls, moveDistance, targetRotation)
					break
			}
		})()
	}, [answer, controls])

	function handleOnClick(_e: React.SyntheticEvent) {
		// When we try to click the card that is not on its original position we return it back
		if (dragActive) {
			moveCardToItsInitialPosition(controls)
			return
		}
	}

	return (
		<div className={cn("perspective-1000 w-[100%] h-[100%] text-white", className)} {...rest}>
			<motion.div
				ref={ref}
				className={cn("swipeable w-[100%] h-[100%] rounded-12px flex-center transform-style-3d relative", {
					"pointer-events-none": !isTheTopCard || isAnimating,
					"z-50": isTheTopCard,
				})}
				drag={true}
				dragElastic={0.4}
				onDragStart={handleDragStart}
				onDrag={handleDrag}
				onDragEnd={handleDragEnd}
				onClick={handleOnClick}
				style={{
					rotate,
					x,
					// when we are animating the return animation, we want to apply the default color
					background: !answer ? background : backgroundColors[1],
				}}
				animate={controls}
				dragConstraints={{ left: 0, right: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				onAnimationStart={onAnimationStart}
				onAnimationComplete={onAnimationComplete}
				data-drag-active={dragActive}
			>
				{children}
			</motion.div>
		</div>
	)
})
