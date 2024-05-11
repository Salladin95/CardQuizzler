"use client"
import React from "react"
import { WithId } from "~/app/types"
import { QuizConfettiScreen } from "~/widgets"
import { ModuleType, TermType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { EditorToolBar, UpdateTerm } from "~/features"
import { cleanSwipedCards, initializeSwiperData } from "./utils"
import { getNegativeAnswers, getPositiveAnswers, Swiper, SwiperData } from "~/features/swiper"
import {
	difficultModulesQueryKey,
	FlatProgressBar,
	LoadingDataRenderer,
	recentActionsQueryKey,
	UpdateTermCtxProvider,
	useFetchDifficultModules,
	useFetchModule,
	useProcessQuizResult,
	useStoredSwiperState,
} from "~/shared"

type ModuleProps = ModuleType

function Module(props: ModuleProps) {
	const { terms, id } = props
	const queryClient = useQueryClient()

	const processQuiz = useProcessQuizResult()

	const [storedProgress, setStoredProgress, removeStoredProgress] = useStoredSwiperState(id)

	const [swiperState, setSwiperState] = React.useState<SwiperData<TermType>>(
		storedProgress || initializeSwiperData(terms),
	)

	function handleUpdateSwiperState(updatedState: SwiperData<TermType>) {
		setSwiperState(updatedState)
		setStoredProgress(updatedState)
	}

	const negativeAnswers = getNegativeAnswers(swiperState.swipedCards)
	const positiveAnswers = getPositiveAnswers(swiperState.swipedCards)

	function handleRestart() {
		const state = initializeSwiperData([...terms])
		setSwiperState(state)
		setStoredProgress(state)
		processQuiz.reset()
	}

	function handleContinue() {
		const state = initializeSwiperData(cleanSwipedCards(negativeAnswers))
		setSwiperState(state)
		setStoredProgress(state)
		processQuiz.reset()
	}

	function handleTermUpdate(term: TermType) {
		const startingTerms = swiperState.startingTerms.map((t) => {
			if (t.id === term.id) {
				return term
			}
			return t
		})
		setStoredProgress({ ...swiperState, startingTerms })
	}

	const renderUpdateTerm = (term: TermType) => (
		<UpdateTerm
			onTermUpdate={handleTermUpdate}
			originalTerm={term}
			renderToolBar={() => <EditorToolBar className={"mb-6"} />}
		/>
	)

	React.useEffect(() => {
		if (
			!processQuiz.submittedAt &&
			swiperState.startingTerms?.length === negativeAnswers?.length + positiveAnswers?.length
		) {
			processQuiz.mutate(
				{ terms: swiperState.swipedCards, moduleID: props.id },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: [recentActionsQueryKey] })
						queryClient.invalidateQueries({ queryKey: [difficultModulesQueryKey] })
						removeStoredProgress()
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
		removeStoredProgress,
		swiperState,
		swiperState.startingTerms,
		swiperState.swipedCards,
	])

	return (
		<main className={"flex flex-col relative overflow-hidden"}>
			<FlatProgressBar progress={swiperState.progress} className={"absolute inset-0 w-full"} />
			{swiperState.progress !== 100 && (
				<UpdateTermCtxProvider renderUpdateTerm={renderUpdateTerm}>
					<Swiper swiperData={swiperState} onUpdate={handleUpdateSwiperState} />
				</UpdateTermCtxProvider>
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
	return LoadingDataRenderer<ModuleProps>({ Comp: Module, data, isLoading })
}

export function DifficultModulePage(props: { title: string }) {
	const { data, isLoading } = useFetchDifficultModules()
	const [module, setModule] = React.useState<ModuleType | null>(null)
	React.useEffect(() => {
		if (!isLoading && data) {
			const targetModule = data.find((m) => m.title === props.title)
			targetModule && setModule(targetModule)
		}
	}, [data, isLoading, props.title])
	return LoadingDataRenderer<ModuleType>({ Comp: Module, data: module, isLoading })
}
