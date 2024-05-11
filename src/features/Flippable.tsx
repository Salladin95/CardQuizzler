import React from "react"
import { cn, RotateByAxis, useFlippable } from "~/shared"
import { FlippableContent } from "~/entites"
import { PropsWithClassName } from "~/app/types"
import { motion, useAnimate } from "framer-motion"

export type FlippableProps = {
	frontSideContent: React.ReactNode
	backSideContent: React.ReactNode
	isAnimating?: boolean
	onAnimationStart?: () => void
	onAnimationComplete?: () => void
	onClick?: () => void
	rotateByAxis?: RotateByAxis
} & PropsWithClassName

export function Flippable(props: FlippableProps) {
	const {
		frontSideContent,
		backSideContent,
		className,
		isAnimating,
		onClick,
		onAnimationComplete,
		onAnimationStart,
		rotateByAxis = RotateByAxis.Y,
	} = props

	const [isFlipped, setIsFlipped] = React.useState(false)
	function handleClick() {
		if (isAnimating) return
		onClick && onClick()
		setIsFlipped(!isFlipped)
	}

	const [scope] = useAnimate<HTMLDivElement>()

	useFlippable({ elementOrSelector: scope.current, isFlipped, rotateByAxis })

	return (
		<div className={"perspective-1000"} onClick={handleClick}>
			<motion.div
				ref={scope}
				id={"flippable"}
				className={cn("transform-style-3d min-w-[20rem] min-h-[10rem] bg-gold rounded-10px", className)}
				onAnimationComplete={onAnimationComplete}
				onAnimationStart={onAnimationStart}
			>
				<FlippableContent
					rotateByAxis={rotateByAxis}
					frontSideContent={frontSideContent}
					backSideContent={backSideContent}
				/>
			</motion.div>
		</div>
	)
}
