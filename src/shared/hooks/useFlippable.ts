import React from "react"
import { animate } from "framer-motion"

const rotateByX = (isFlipped: boolean) => ({ rotateX: isFlipped ? 180 : 0, rotateY: 0 })
const rotateByY = (isFlipped: boolean) => ({ rotateY: isFlipped ? 180 : 0, rotateX: 0 })

export enum RotateByAxis {
	"X" = "x",
	"Y" = "y",
}

type UseFlippableParams = {
	elementOrSelector: Element | string | null | undefined
	isFlipped: boolean
	rotateByAxis: RotateByAxis
}

export function useFlippable(params: UseFlippableParams) {
	const { elementOrSelector, isFlipped, rotateByAxis } = params
	const [isAnimating, setIsAnimating] = React.useState(false)
	React.useEffect(() => {
		if (!elementOrSelector) return
		const keyframes = rotateByAxis === RotateByAxis.X ? rotateByX(isFlipped) : rotateByY(isFlipped)
		animate(elementOrSelector, keyframes, {
			duration: 0.5,
			ease: "easeOut",
			onPlay: () => setIsAnimating(true),
			onComplete: () => setIsAnimating(false),
		})
	}, [elementOrSelector, isFlipped, rotateByAxis])
	return isAnimating
}
