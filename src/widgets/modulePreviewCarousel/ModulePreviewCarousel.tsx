"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { ModuleType, TermType } from "~/app/models"
import { Flippable, withSplideCarousel } from "~/features"
import { DisplayEditorContent } from "~/features/quizCard/DisplayEditorContent"
import { ArrowsPointingOutIcon, Button, RotateByAxis, UpdateTermCtxProvider } from "~/shared"

type ModulePreviewCarouselProps = {
	module: ModuleType
}

export function ModulePreviewCarousel(props: ModulePreviewCarouselProps) {
	const { module } = props
	const router = useRouter()
	const renderGoToQuiz = (t: TermType) => {
		return (
			<Button
				onClick={(e) => {
					e.stopPropagation()
					router.push(`/module/${t.moduleID}`)
				}}
				variant={"none"}
				className={"absolute w-min h-min p-0 cursor-pointer right-2 bottom-2"}
			>
				<ArrowsPointingOutIcon className={"w-4 h-4"} />
			</Button>
		)
	}
	const PreviewCardComp = (term: TermType) => (
		<UpdateTermCtxProvider>
			<Flippable
				rotateByAxis={RotateByAxis.X}
				frontSideContent={<DisplayEditorContent render={renderGoToQuiz} term={term} content={term.title} />}
				backSideContent={<DisplayEditorContent render={renderGoToQuiz} term={term} content={term.description} />}
			/>
		</UpdateTermCtxProvider>
	)
	const Carousel = withSplideCarousel<TermType>(PreviewCardComp)
	return (
		<Carousel
			options={{
				arrows: false,
				pagination: true,
				classes: {
					pagination: `splide-pagination splide__pagination gap-x-2`,
					page: "splide__pagination__page mt-4 w-2 h-2 bg-sub-primary rounded-full transition-colors",
				},
			}}
			data={module.terms}
			className={"h-2"}
		/>
	)
}
