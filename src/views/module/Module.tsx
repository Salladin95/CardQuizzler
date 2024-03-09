"use client"
import React from "react"
import { WithId } from "~/app/types"
import { QuizConfettiScreen } from "~/widgets"
import { ModuleType, TermType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { cleanSwipedCards, initializeSwiperData } from "./utils"
import { getNegativeAnswers, getPositiveAnswers, Swiper, SwiperData } from "~/features/swiper"
import {
	difficultModulesQueryKey,
	FlatProgressBar,
	LoadingDataRenderer,
	recentActionsQueryKey,
	useFetchModule,
	useProcessQuizResult,
} from "~/shared"

function Module(props: ModuleType) {
	const { terms } = props
	const queryClient = useQueryClient()

	const processQuiz = useProcessQuizResult()
	const [swiperState, setSwiperState] = React.useState<SwiperData<TermType>>(initializeSwiperData(terms))

	const negativeAnswers = getNegativeAnswers(swiperState.swipedCards)
	const positiveAnswers = getPositiveAnswers(swiperState.swipedCards)

	React.useEffect(() => {
		// eslint-disable-next-line no-debugger
		// debugger
		if (
			!processQuiz.submittedAt &&
			swiperState.originalTerms?.length === negativeAnswers?.length + positiveAnswers?.length
		) {
			// eslint-disable-next-line no-debugger
			// debugger
			processQuiz.mutate(
				{ id: props.id, terms: swiperState.swipedCards },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: [recentActionsQueryKey] })
						queryClient.invalidateQueries({ queryKey: [difficultModulesQueryKey] })
					},
				},
			)
		}
	}, [
		negativeAnswers,
		positiveAnswers,
		processQuiz,
		props.id,
		queryClient,
		swiperState.originalTerms,
		swiperState.swipedCards,
	])

	function handleRestart() {
		setSwiperState(initializeSwiperData([...terms]))
		processQuiz.reset()
	}

	function handleContinue() {
		setSwiperState(initializeSwiperData(cleanSwipedCards(negativeAnswers)))
		processQuiz.reset()
	}

	return (
		<main className={"flex flex-col relative overflow-hidden"}>
			<FlatProgressBar progress={swiperState.progress} className={"absolute inset-0 w-full"} />
			{swiperState.progress !== 100 && (
				<Swiper
					swiperData={swiperState}
					className={"mt-12 container"}
					onUpdate={(swiperData) => setSwiperState(swiperData)}
				/>
			)}
			{swiperState.progress === 100 && (
				<QuizConfettiScreen
					positiveAnswers={positiveAnswers.length}
					negativeAnswers={negativeAnswers.length}
					onContinue={handleContinue}
					onRestart={handleRestart}
				/>
			)}
		</main>
	)
}

export function ModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: Module, data, isLoading })
}
