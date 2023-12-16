import { DefaultSvgProps } from "~/app/types"

export function StrikethroughSvg(props: DefaultSvgProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={800} height={800} fill="none" viewBox="0 0 12 12" {...props}>
			<path
				fill="#758CA3"
				fillRule="evenodd"
				d="M7 10a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V8h2v2zm0-8v2H5V2H3a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0H7zM1 7a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2H1z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
