import React from "react"
import { cn } from "~/shared/lib"

export const CheckIcon = (props: React.SVGAttributes<SVGElement>) => {
	const { className, ...rest } = props
	return (
		<svg
			className={cn(className, "fill-current")}
			fill=""
			height="13"
			viewBox="0 0 17 13"
			width="17"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M5.17202 10.162L1.70202 6.69202C1.51504 6.50504 1.26145 6.4 0.99702 6.4C0.732594 6.4 0.478998 6.50504 0.292021 6.69202C0.105043 6.879 0 7.13259 0 7.39702C0 7.52795 0.0257889 7.6576 0.0758939 7.77856C0.125999 7.89953 0.199439 8.00944 0.292021 8.10202L4.47202 12.282C4.86202 12.672 5.49202 12.672 5.88202 12.282L16.462 1.70202C16.649 1.51504 16.754 1.26145 16.754 0.997021C16.754 0.732594 16.649 0.478998 16.462 0.292021C16.275 0.105043 16.0214 0 15.757 0C15.4926 0 15.239 0.105043 15.052 0.292021L5.17202 10.162Z"
				fill=""
			/>
		</svg>
	)
}
