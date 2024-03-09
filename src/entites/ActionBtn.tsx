import React from "react"
import { cn } from "~/shared/lib"
import { Button, ButtonProps, Loader } from "~/shared"

export const ActionBtn = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { loading, children, className, ...rest } = props
	return (
		<Button className={cn("relative", className)} loading={loading} ref={ref} {...rest}>
			{loading && <Loader className={"absolute-center"} variant={"secondary"} />}
			{!loading && children}
		</Button>
	)
})
