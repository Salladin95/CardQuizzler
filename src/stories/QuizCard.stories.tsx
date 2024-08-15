import React from "react"
import { Locale } from "~/app/i18n"
import { ModuleType } from "~/app/models"
import { QuizCard } from "~/features/quizCard"
import { mockModule, mockTerm } from "~/shared/lib/mock"
import type { Meta, StoryObj } from "@storybook/react"
import withQuery from "~/stories/decorators/withQuery"
import { Flippable } from "~/features"
import withTranslation from "~/stories/decorators/withTranslation"
import { UpdateTermCtxProvider } from "~/shared"
import { ModulePreviewCarousel } from "~/widgets"
import { DisplayEditorContent } from "~/features/quizCard/DisplayEditorContent"

const meta: Meta<typeof QuizCard> = {
	title: "Features/QuizCard",
	component: QuizCard,
	decorators: [withTranslation({ locale: Locale.RU }), withQuery()],
	parameters: {
		layout: "fullscreen",
	},
}

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = () => {
	const term = mockTerm()
	return (
		<div className={"container flex-center"}>
			<UpdateTermCtxProvider>
				<Flippable
					className={"w-640"}
					frontSideContent={<DisplayEditorContent term={term} content={term.title} />}
					backSideContent={<DisplayEditorContent term={term} content={term.description} />}
				/>
			</UpdateTermCtxProvider>
		</div>
	)
}

export const Primary: Story = {
	render: StoryRender,
	args: {},
}

const StoryRender1 = (props: { module: ModuleType }) => {
	return <ModulePreviewCarousel module={props.module} />
}

export const Primary1: Story = {
	loaders: [
		() => ({
			module: mockModule(),
		}),
	],
	render: (args, { loaded: { module } }) => <StoryRender1 module={module} />,
}
