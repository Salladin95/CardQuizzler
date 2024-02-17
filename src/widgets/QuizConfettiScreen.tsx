"use client"
import React from "react"
import { cn } from "~/shared/lib"
import { Confetti } from "~/shared"
import { motion } from "framer-motion"
import { fade } from "~/shared/lib/animations"
import { PropsWithClassName } from "~/app/types"
import { InspirationalMessage, MotionButton, QuizStatistics } from "~/entites"

type QuizConfettiScreenProps = {
	positiveAnswers: number
	negativeAnswers: number
	onContinue: () => void
	onRestart: () => void
} & PropsWithClassName

export function QuizConfettiScreen(props: QuizConfettiScreenProps) {
	const { positiveAnswers, negativeAnswers, onRestart, onContinue, className } = props
	return (
		<div className={cn("container 1280:px-4 640:px-12 360:px-8 px-4 mb-12 pt-12", className)}>
			<Confetti duration={5000} />
			<motion.div {...fade.top} transition={{ ...fade.top.transition, duration: 1, delay: 2 }}>
				<InspirationalMessage className={"mb-12"} />
			</motion.div>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4, delay: 3 } }}>
				<QuizStatistics progressBarDelay={3} positiveAnswers={positiveAnswers} negativeAnswers={negativeAnswers} />
			</motion.div>
			{negativeAnswers && (
				<MotionButton
					motionsProps={{
						...fade.bottom,
						transition: { ...fade.bottom.transition, delay: 3.5 },
					}}
					className={"mb-4 mx-auto max-w-[20rem]"}
					onClick={onContinue}
				>
					Продолжить изучение - {negativeAnswers} терминов
				</MotionButton>
			)}
			<MotionButton
				motionsProps={{
					...fade.bottom,
					transition: { ...fade.bottom.transition, delay: 4 },
				}}
				className={"max-w-[20rem] mx-auto"}
				variant={"secondary"}
				onClick={onRestart}
			>
				Начать заново
			</MotionButton>
		</div>
	)
}
