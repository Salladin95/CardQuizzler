import { SvgDefaultProps } from "~/app/types"
import { cn } from "src/lib"

export function ItalicSvg(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			{...rest}
			xmlns="http://www.w3.org/2000/svg"
			width={20}
			height={20}
			fill="none"
			viewBox="-3 0 12 12"
			className={cn("fill-[#758CA3]", className)}
		>
			<path
				fillRule="evenodd"
				d="m1.18 10 1.605-8.023A1 1 0 0 1 3 0h2a1 1 0 1 1 0 2h-.18l-1.605 8.023A1 1 0 0 1 3 12H1a1 1 0 1 1 0-2h.18z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
