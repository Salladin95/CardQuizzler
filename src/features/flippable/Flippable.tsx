import React from "react"
import { AnimationControls, motion, useAnimation } from "framer-motion"
import { WithOptionalClassName } from "~/app/types"
import cls from "classnames"
import { FlippableContent } from "~/features/flippable/FlippableContent"
import { useFlippable } from "~/features/flippable/useFlippable"

export type FlippableProps = {
	frontSideContent: React.ReactNode
	backSideContent: React.ReactNode
	isAnimating?: boolean
	onAnimationStart?: () => void
	onAnimationComplete?: () => void
	onClick?: () => void
	isFlipped: boolean
} & WithOptionalClassName

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
		<div className={cls(className, "perspective-1000")} onClick={handleClick}>
			<motion.div
				className="preserve-3d w-[100%] h-[100%]"
				initial={false}
				animate={controls}
				onAnimationComplete={onAnimationComplete}
				onAnimationStart={onAnimationStart}
			>
				<FlippableContent frontSideContent={frontSideContent} backSideContent={backSideContent} />
			</motion.div>
		</div>
	)
}
