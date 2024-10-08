import React from "react"
import { calculateProgress } from "~/shared/lib"
import { CircularProgressBar } from "~/shared"
import { QuizStatisticsItem } from "./quizStatisticsItem"
import { useTranslations } from "~/app/i18n"

type QuizStatisticsProps = {
	positiveAnswers: number
	negativeAnswers: number
	progressBarDelay?: number
}

export function QuizStatistics(props: QuizStatisticsProps) {
	const { positiveAnswers, negativeAnswers, progressBarDelay } = props
	const t = useTranslations("Widgets")
	return (
		<div className={"flex items-center gap-8 mb-12 640:flex-row flex-col"}>
			<CircularProgressBar
				delay={progressBarDelay}
				progress={calculateProgress(positiveAnswers, positiveAnswers + negativeAnswers)}
				className={"shrink-0"}
			/>
			<div className={"768:w-360 w-[90%] max-w-640"}>
				<QuizStatisticsItem className={"mb-4"} title={t("confettiScreen.finished")} value={positiveAnswers} />
				<QuizStatisticsItem variant={"danger"} title={t("confettiScreen.inProgress")} value={negativeAnswers} />
			</div>
		</div>
	)
}
