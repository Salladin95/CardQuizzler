import React from "react"
import { cn } from "~/shared/lib"

export function ChevronDown(props: React.SVGAttributes<SVGElement>) {
	const { className, ...rest } = props
	return (
		<svg
			className={cn(className, "stroke-current")}
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path d="M6 9L12 15L18 9" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
		</svg>
	)
}
