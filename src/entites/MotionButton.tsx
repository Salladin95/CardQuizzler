import { motion, MotionProps } from "framer-motion"
import { Button, ButtonProps } from "~/shared"

export function MotionButton(props: { motionsProps: MotionProps } & ButtonProps) {
	const { children, motionsProps, ...rest } = props
	return (
		<Button asChild {...rest}>
			<motion.button {...motionsProps}>{children}</motion.button>
		</Button>
	)
}
