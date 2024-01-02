import React from "react"
import { cn } from "src/lib"
import { TermType } from "~/app/models"
import { PropsWithClassName } from "~/app/types"

export type CardProps = Pick<TermType, "title"> &
	PropsWithClassName & {
		style?: React.CSSProperties
	}

export function Card(props: CardProps) {
	const { className, title, ...rest } = props
	return (
		<div className={cn("card", className)} {...rest}>
			{title}
		</div>
	)
}
