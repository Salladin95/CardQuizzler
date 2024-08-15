import * as Framer from "framer-motion"

export const height = {
	animate: { height: "auto", opacity: 1 },
	initial: { height: 0, opacity: 0 },
	exit: { height: 0, opacity: 0 },
	transition: { type: "spring", bounce: 0.3 },
}

export const opacity = {
	animate: { opacity: 1 },
	initial: { opacity: 0 },
	exit: { opacity: 0 },
	transition: { type: "spring" },
}

const fadeTransition = {
	type: "spring",
	bounce: 0.3,
	duration: 0.3,
}
export const fade: Record<"left" | "top" | "bottom" | "right", Framer.MotionProps> = {
	left: {
		animate: { x: 0, opacity: 1, pointerEvents: "auto" },
		initial: { x: "-30%", opacity: 0, pointerEvents: "none" },
		exit: { x: "-30%", opacity: 0, pointerEvents: "none" },
		transition: fadeTransition,
	},
	top: {
		animate: { y: 0, opacity: 1, pointerEvents: "auto" },
		initial: { y: "-30%", opacity: 0, pointerEvents: "none" },
		exit: { y: "-30%", opacity: 0, pointerEvents: "none" },
		transition: fadeTransition,
	},
	right: {
		animate: { x: 0, opacity: 1, pointerEvents: "auto" },
		initial: { x: "30%", opacity: 0, pointerEvents: "none" },
		exit: { x: "30%", opacity: 0, pointerEvents: "none" },
	},
	bottom: {
		animate: { y: 0, opacity: 1, pointerEvents: "auto" },
		initial: { y: "30%", opacity: 0, pointerEvents: "none" },
		exit: { y: "30%", opacity: 0, pointerEvents: "none" },
		transition: fadeTransition,
	},
}

const Motions = {
	opacity,
	fade,
	height,
}

export default Motions
