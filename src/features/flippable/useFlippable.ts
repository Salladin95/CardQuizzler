import React from "react"
import { flipAnimation } from "~/features/flippable/Flippable"
import { AnimationControls } from "framer-motion"

export function useFlippable(controls: AnimationControls, isFlipped: boolean) {
	React.useEffect(() => {
		flipAnimation(controls, isFlipped!)
	}, [controls, isFlipped])
}
