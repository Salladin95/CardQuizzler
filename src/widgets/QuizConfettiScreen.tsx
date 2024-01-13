"use client"
import React from "react"
import { cn } from "~/lib"
import { Button, Confetti } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { InspirationalMessage, QuizStatistics } from "~/entites"

type QuizConfettiScreenProps = {
	positiveAnswers: number
	negativeAnswers: number
	onContinue: () => void
	onRestart: () => void
} & PropsWithClassName

export function QuizConfettiScreen(props: QuizConfettiScreenProps) {
	const { positiveAnswers, negativeAnswers, onRestart, onContinue, className } = props
	return (
		<div className={cn("container mb-12", className)}>
			<Confetti />
			<InspirationalMessage className={"mb-12"} />
			<QuizStatistics positiveAnswers={positiveAnswers} negativeAnswers={negativeAnswers} />
			{negativeAnswers && (
				<Button className={"mb-4 mx-auto w-[20rem]"} onClick={onContinue}>
					Продолжить изучение - {negativeAnswers} терминов
				</Button>
			)}
			<Button className={"w-[20rem] mx-auto"} variant={"secondary"} onClick={onRestart}>
				Начать заново
			</Button>
		</div>
	)
}
