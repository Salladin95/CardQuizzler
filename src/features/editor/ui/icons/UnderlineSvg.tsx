import { SvgDefaultProps } from "~/app/types"
import { cn } from "~/shared/lib"

export function UnderlineSvg(props: SvgDefaultProps) {
	const { className, ...rest } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={20}
			height={20}
			fill="none"
			viewBox="-2.5 0 22 22"
			{...rest}
			className={cn("fill-[#758CA3]", className)}
		>
			<path
				fillRule="evenodd"
				d="M15.991 10.867c.006.043.009.088.009.133v6a1 1 0 1 1-2 0v-1.4a7.5 7.5 0 0 1-13-5.1V2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2v8.5a5.5 5.5 0 1 0 11 0V2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2v8.5c0 .123-.003.245-.009.367zM1 22a1 1 0 1 1 0-2h15a1 1 0 1 1 0 2H1z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
