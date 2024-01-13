import React from "react"
import { calculateProgress } from "~/lib"
import { CircularProgressBar } from "~/shared"
import { QuizStatisticsItem } from "./quizStatisticsItem"

type QuizStatisticsProps = {
	positiveAnswers: number
	negativeAnswers: number
}

export function QuizStatistics(props: QuizStatisticsProps) {
	const { positiveAnswers, negativeAnswers } = props
	return (
		<div className={"flex items-center gap-8 mb-12"}>
			<CircularProgressBar progress={calculateProgress(positiveAnswers, positiveAnswers + negativeAnswers)} />
			<div className={"min-w-360 max-w-640"}>
				<QuizStatisticsItem className={"mb-4"} title={"Знаю"} value={positiveAnswers} />
				<QuizStatisticsItem variant={"danger"} title={"Не знаю"} value={negativeAnswers} />
			</div>
		</div>
	)
}
