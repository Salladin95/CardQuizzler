import React from "react"
import { calculateProgress } from "~/lib"
import { CircularProgressBar } from "~/shared"
import { QuizStatisticsItem } from "./quizStatisticsItem"

type QuizStatisticsProps = {
	positiveAnswers: number
	negativeAnswers: number
	progressBarDelay?: number
}

export function QuizStatistics(props: QuizStatisticsProps) {
	const { positiveAnswers, negativeAnswers, progressBarDelay } = props
	return (
		<div className={"flex items-center gap-8 mb-12 640:flex-row flex-col"}>
			<CircularProgressBar
				delay={progressBarDelay}
				progress={calculateProgress(positiveAnswers, positiveAnswers + negativeAnswers)}
				className={"shrink-0"}
			/>
			<div className={"768:w-360 w-[50%] max-w-640"}>
				<QuizStatisticsItem className={"mb-4"} title={"Знаю"} value={positiveAnswers} />
				<QuizStatisticsItem variant={"danger"} title={"Не знаю"} value={negativeAnswers} />
			</div>
		</div>
	)
}
