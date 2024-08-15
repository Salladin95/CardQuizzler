import { SvgDefaultProps } from "~/app/types"
import { cn } from "~/shared/lib"

export function ReorderHandleIcon(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			{...rest}
			className={cn("fill-current w-6 h-6", className)}
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				fill="currentColor"
				d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM14 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
			/>
		</svg>
	)
}
