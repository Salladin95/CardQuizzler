import React from "react"
import { cn } from "~/shared/lib"

export function ClosedBookIcon(props: React.SVGAttributes<SVGElement>) {
	const { className, ...rest } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={cn("w-6 h-6 fill-current", className)}
			{...rest}
		>
			<path stroke="#1C274D" strokeWidth={1.5} d="M19.898 16h-12c-.93 0-1.395 0-1.777.102A3 3 0 0 0 4 18.224" />
			<path
				stroke="#1C274D"
				strokeLinecap="round"
				strokeWidth={1.5}
				d="M8 7h8M8 10.5h5M10 22c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16V8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.879C20 3.757 20 5.172 20 8m-6 14c2.828 0 4.243 0 5.121-.879C20 20.243 20 18.828 20 16v-4"
			/>
		</svg>
	)
}
