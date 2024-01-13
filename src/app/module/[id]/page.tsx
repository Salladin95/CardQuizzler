"use client"
import React from "react"
import { getModule } from "~/api/requests"
import { QuizConfettiScreen } from "~/widgets"
import { Swiper } from "~/features/swiper/Swiper"
import { WithId, WithParamsId } from "~/app/types"
import { ModuleType, TermType } from "~/app/models"
import { moduleQueryKey, useFetchModule } from "~/api"
import { cleanSwipedCards, initializeSwiperData } from "../utils"
import { DataHydration, FlatProgressBar, LoadingDataRenderer } from "~/shared"
import { getNegativeAnswers, getPositiveAnswers, SwiperData } from "~/features/swiper"

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

function ModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: Module, data, isLoading })
}

export default function ModuleWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<ModuleType> getData={() => getModule(params.id)} queryKeys={[moduleQueryKey, params.id]}>
			<ModulePage id={params.id} />
		</DataHydration>
	)
}
