import React from "react"
import { CardType } from "~/features/quizCard/model"
import { Card } from "~/entites/card"
import { Swipeable, SwipeableProps } from "~/features/swipeable"

export type QuizCardProps = CardType & Omit<SwipeableProps, "frontSideContent" | "backSideContent">

export function QuizCard(props: QuizCardProps) {
	const { title, description, ...rest } = props
	return (
		<Swipeable {...rest} frontSideContent={<Card title={title} />} backSideContent={<Card title={description} />} />
	)
}
