import React from "react"
import { motion, SVGMotionProps } from "framer-motion"

/**
 * Functional component for rendering an SVG path with motion.
 * @param {SVGMotionProps<SVGPathElement> & React.HTMLAttributes<SVGPathElement>} props - Props for the Path component.
 * @returns {JSX.Element} A motion path element with specified props.
 */
export function Path(props: SVGMotionProps<SVGPathElement> & React.HTMLAttributes<SVGPathElement>) {
	return (
		<motion.path className={"fill-current"} strokeWidth="3" stroke="currentColor" strokeLinecap="round" {...props} />
	)
}
