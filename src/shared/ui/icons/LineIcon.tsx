import React from "react"
import { SvgDefaultProps } from "~/app/types"
import { motion } from "framer-motion"

export function LineIcon(props: SvgDefaultProps) {
	const pathVariants = {
		initial: { pathLength: 0, opacity: 0 },
		animate: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
	}

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 380 50" {...props}>
			<motion.path
				variants={pathVariants}
				initial="initial"
				animate="animate"
				fill="none"
				stroke='url("#a")'
				strokeLinecap="round"
				strokeWidth={9}
				d="M8.52 392.825c4.897-3.39 25.31-24.215 34.978-24.215 9.668 0 24.412 24.34 34.08 24.215 9.669-.125 26.063-25.238 34.978-25.112 8.915.126 19.66 25.883 28.7 26.009 9.04.126 27.838-25.112 35.874-25.112 8.036 0 13.866 24.986 21.525 25.112 7.659.126 26.278-24.34 33.184-24.215 6.905.125 9.112 24.986 16.143 25.112 7.031.125 26.296-24.09 34.08-24.215 7.786-.126 13.615 23.318 21.525 23.318 7.91 0 27.193-23.57 34.978-23.318 7.785.25 14.224 25.112 20.628 25.112 6.403 0 17.955-24.861 25.112-25.112 7.157-.252 17.973 23.192 26.009 23.318 8.036.126 22.977-22.17 31.39-22.422 8.413-.25 20.538 20.252 28.7 20.628 8.161.377 22.44-18.063 29.596-17.937 7.157.126 14.996 18.457 21.525 18.834 6.529.377 21.596-13.883 25.112-16.143"
			/>
			<defs>
				<linearGradient id="a" gradientTransform="rotate(85 .5 .5)">
					<stop offset={0} stopColor="hsl(185, 53%, 55%)" />
					<stop offset={1} stopColor="hsl(0, 73%, 55%)" />
				</linearGradient>
			</defs>
		</svg>
	)
}
