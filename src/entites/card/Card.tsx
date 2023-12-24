import React from "react"
import { cn } from "src/lib"
import { CardType } from "~/features/quizCard/model"
import { PropsWithClassName } from "~/app/types"

export type CardProps = Pick<CardType, "title"> &
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
