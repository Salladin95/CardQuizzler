import React from "react"
import { AnimationControls, motion, useAnimation } from "framer-motion"
import { PropsWithClassName } from "~/app/types"
import { FlippableContent } from "~/features/flippable/FlippableContent"
import { useFlippable } from "~/features/flippable/useFlippable"
import { cn } from "src/lib"

export type FlippableProps = {
	frontSideContent: React.ReactNode
	backSideContent: React.ReactNode
	isAnimating?: boolean
	onAnimationStart?: () => void
	onAnimationComplete?: () => void
	onClick?: () => void
	isFlipped: boolean
} & PropsWithClassName

export const flipTransition = { transition: { duration: 1, ease: "easeOut" } }
export const flipEffect = (isFlipped: boolean) => ({ rotateY: isFlipped ? 180 : 0, rotateX: 0, ...flipTransition })
export const flipAnimation = (controls: AnimationControls, isFlipped: boolean) =>
	controls.start({ ...flipEffect(isFlipped) })

export function Flippable(props: FlippableProps) {
	const {
		frontSideContent,
		backSideContent,
		className,
		isAnimating,
		isFlipped,
		onClick,
		onAnimationComplete,
		onAnimationStart,
	} = props

	const controls = useAnimation()

	function handleClick() {
		if (isAnimating || !onClick) return
		onClick()
	}

	useFlippable(controls, isFlipped)

	return (
		<div className={"perspective-1000"} onClick={handleClick}>
			<motion.div
				className={cn("transform-style-3d w-640 h-360 bg-blue-400", className)}
				animate={controls}
				onAnimationComplete={onAnimationComplete}
				onAnimationStart={onAnimationStart}
			>
				<FlippableContent frontSideContent={frontSideContent} backSideContent={backSideContent} />
			</motion.div>
		</div>
	)
}
