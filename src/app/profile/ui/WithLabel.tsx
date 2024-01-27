import React from "react"
import { cn } from "~/lib"
import { PropsWithClassName } from "~/app/types"

type WithLabelProps = {
	label: string
	title: string
} & PropsWithClassName

export function WithLabel(props: WithLabelProps) {
	const { label, title, className } = props
	return (
		<div className={cn("mb-4", className)}>
			<p className={"mb-1"}>{label}</p>
			<p className={"text-sub-primary text-body-2"}>{title}</p>
		</div>
	)
}
