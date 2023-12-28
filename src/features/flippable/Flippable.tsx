import React from "react"
import { motion } from "framer-motion"
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
} & PropsWithClassName

export function Flippable(props: FlippableProps) {
	const { frontSideContent, backSideContent, className, isAnimating, onClick, onAnimationComplete, onAnimationStart } =
		props

	const [isFlipped, setIsFlipped] = React.useState(false)
	function handleClick() {
		if (isAnimating || !onClick) return
		onClick()
		setIsFlipped(!isFlipped)
	}

	useFlippable("#flippable", isFlipped)

	return (
		<div className={"perspective-1000"} onClick={handleClick}>
			<motion.div
				id={"flippable"}
				className={cn("transform-style-3d w-428 h-428 bg-gold rounded-10px", className)}
				onAnimationComplete={onAnimationComplete}
				onAnimationStart={onAnimationStart}
			>
				<FlippableContent frontSideContent={frontSideContent} backSideContent={backSideContent} />
			</motion.div>
		</div>
	)
}
