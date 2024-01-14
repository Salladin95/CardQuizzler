import React from "react"
import { motion } from "framer-motion"
import { SvgDefaultProps } from "~/app/types"
import {cn} from "~/lib";

type CircularProgressBarProps = SvgDefaultProps & {
	progress: number
	width?: number
	strokeWidth?: number
	delay?: number
}

export function CircularProgressBar(props: CircularProgressBarProps) {
	const { progress, width = 200, strokeWidth = 20, delay = 0, className, ...rest } = props
	const radius = (width / 2) * 0.8
	const dashArray = 2 * Math.PI * radius * (progress / 100)

	return (
		<svg
			{...rest}
			viewBox={`0 0 ${width} ${width}`}
			width={width}
			height={width}
			fill={"transparent"}
			className={cn("relative", className)}
		>
			<circle
				cx={width / 2}
				cy={width / 2}
				r={radius}
				fill="none"
				stroke={"#FFEBD8"}
				strokeLinecap="round"
				strokeWidth={strokeWidth}
			/>
			<defs>
				<linearGradient id={"gradient"}>
					<stop offset={"10%"} stopColor={"#F8FF95"} />
					<stop offset={"50%"} stopColor={"#45FFCA"} />
					<stop offset={"100%"} stopColor={"#D0F288"} />
				</linearGradient>
			</defs>
			<motion.circle
				initial={{
					strokeDasharray: `0 1600`,
				}}
				animate={{
					strokeDasharray: `${dashArray} 1600`,
					transition: {
						duration: 2,
						delay,
					},
				}}
				cx={width / 2}
				cy={width / 2}
				r={radius}
				strokeWidth={strokeWidth}
				stroke={"url(#gradient)"}
				strokeLinecap="round"
				transform={`rotate(-90 ${width / 2} ${width / 2})`}
			/>
			<text
				x="50%"
				y="50%"
				dy={"0.3em"}
				textAnchor={"middle"}
				className={"text-[2.8rem] font-bold"}
				// fill={"url(#gradient)"}
				fill={"#333C83"}
			>
				{progress.toFixed()}%
			</text>
		</svg>
	)
}
