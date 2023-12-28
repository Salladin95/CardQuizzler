import React from "react"
import { animate } from "framer-motion"

export function useFlippable(elementOrSelector: Element | string | null | undefined, isFlipped: boolean) {
	React.useEffect(() => {
		if (!elementOrSelector) return
		animate(elementOrSelector, { rotateY: isFlipped ? 180 : 0, rotateX: 0 }, { duration: 0.5, ease: "easeOut" })
	}, [elementOrSelector, isFlipped])
}
