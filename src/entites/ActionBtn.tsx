import React from "react"
import { cn } from "~/lib"
import { Button, ButtonProps, Loader } from "~/shared"

export function ActionBtn(props: ButtonProps) {
	const { loading, children, className, ...rest } = props
	return (
		<Button className={cn("relative", className)} loading={loading} {...rest}>
			{loading && <Loader className={"absolute-center"} variant={"secondary"} />}
			{!loading && children}
		</Button>
	)
}
