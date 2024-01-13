import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { PropsWithClassName } from "~/app/types"

const compVariants = cva("quiz-statistics-item", {
	variants: {
		variant: {
			success: ["quiz-statistics-item-success"],
			danger: ["quiz-statistics-item-danger"],
		},
	},
	defaultVariants: {
		variant: "success",
	},
})

type AnswerStatisticsItemProps = {
	variant?: VariantProps<typeof compVariants>["variant"]
	title: string
	value: string | number
} & PropsWithClassName

export function QuizStatisticsItem(props: AnswerStatisticsItemProps) {
	const { variant, title, value, className } = props
	return (
		<div className={compVariants({ variant, className })}>
			<span>{title}</span>
			<span className={"quiz-value"}>{value}</span>
		</div>
	)
}
