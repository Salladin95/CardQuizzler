import { Variants } from "framer-motion"

export const fadeAnimationVariants: Variants = {
	open: {
		opacity: 1,
		y: [-10, 20],
		transition: { type: "spring", bounce: 0.4, duration: 0.6 },
	},
	closed: {
		opacity: 0,
		y: 10,
		transition: { ease: "easeOut", duration: 0.2 },
	},
}
