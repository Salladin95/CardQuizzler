import { SvgDefaultProps } from "~/app/types"
import { cn } from "~/lib"

export function ArrowLeft(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			{...rest}
			className={cn("w-6 h-6 fill-none", className)}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	)
}
