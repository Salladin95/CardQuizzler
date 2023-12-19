import { Variants } from "framer-motion"

export const fadeAnimationVariants: Variants = {
	open: {
		opacity: 1,
		y: [-10, 25],
		transition: { type: "spring", bounce: 0.4, duration: 0.4 },
	},
	closed: {
		opacity: 0,
		y: 10,
		transition: { ease: "easeOut", duration: 0.2 },
	},
}
