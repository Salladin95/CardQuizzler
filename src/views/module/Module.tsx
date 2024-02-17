"use client"
import React from "react"
import { WithId } from "~/app/types"
import { QuizConfettiScreen } from "~/widgets"
import { ModuleType, TermType } from "~/app/models"
import { cleanSwipedCards, initializeSwiperData } from "./utils"
import { FlatProgressBar, LoadingDataRenderer, useFetchModule } from "~/shared"
import { getNegativeAnswers, getPositiveAnswers, Swiper, SwiperData } from "~/features/swiper"

function Module(props: ModuleType) {
	const { terms } = props
	const [swiperState, setSwiperState] = React.useState<SwiperData<TermType>>(initializeSwiperData(terms))

	const negativeAnswers = getNegativeAnswers(swiperState.swipedCards)
	const positiveAnswers = getPositiveAnswers(swiperState.swipedCards)

	React.useEffect(() => {
		if (swiperState.originalTerms.length === negativeAnswers.length + positiveAnswers.length) {
			console.log("FINISH")
		}
	}, [negativeAnswers.length, positiveAnswers.length, swiperState.originalTerms.length])

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
					onContinue={() => setSwiperState(initializeSwiperData(cleanSwipedCards(negativeAnswers)))}
					onRestart={() => setSwiperState(initializeSwiperData([...terms]))}
				/>
			)}
		</main>
	)
}

export function ModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: Module, data, isLoading })
}
