import { SvgDefaultProps } from "~/app/types"
import { cn } from "~/lib"

export function EllipsisIcon(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			{...rest}
			className={cn("fill-current w-6 h-6", className)}
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
			/>
		</svg>
	)
}
