import { DefaultSvgProps } from "~/app/types"

export function ItalicSvg(props: DefaultSvgProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={800} height={800} fill="none" viewBox="-3 0 12 12" {...props}>
			<path
				fill="#758CA3"
				fillRule="evenodd"
				d="m1.18 10 1.605-8.023A1 1 0 0 1 3 0h2a1 1 0 1 1 0 2h-.18l-1.605 8.023A1 1 0 0 1 3 12H1a1 1 0 1 1 0-2h.18z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
