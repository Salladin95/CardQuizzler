import { DefaultSvgProps } from "~/app/types"
import { cn } from "~/utils"

export function BoldSvg(props: DefaultSvgProps) {
	const { className, ...rest } = props
	return (
		<svg
			{...rest}
			xmlns="http://www.w3.org/2000/svg"
			width={20}
			height={20}
			fill="none"
			viewBox="-3 0 22 22"
			className={cn("fill-[#758CA3]", className)}
		>
			<path
				fillRule="evenodd"
				d="M1 2a1 1 0 0 1 0-2h7a6 6 0 0 1 4.102 10.379A6.002 6.002 0 0 1 10 22H1a1 1 0 1 1 0-2V2zm2 0v8h5a4 4 0 0 0 0-8H3zm0 10v8h7a4 4 0 0 0 0-8H3z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
