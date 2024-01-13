import { cn } from "~/lib"
import { SvgDefaultProps } from "~/app/types"

export function XMarkIcon(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			{...rest}
			className={cn("fill-current w-6 h-6", className)}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			fill="currentColor"
			stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
		</svg>
	)
}
