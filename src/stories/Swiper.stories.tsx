import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { TermType } from "~/app/models"
import { SwiperData } from "~/features/swiper"
import { mockTerms } from "~/lib/mock/mockTerm"
import { Swiper } from "~/features/swiper/Swiper"
import { initializeSwiperData } from "~/app/module/utils"

const meta: Meta<typeof Swiper> = {
	title: "Features/Swiper",
	component: Swiper,
	parameters: {
		layout: "fullscreen",
	},
}

export default meta

type Story = StoryObj<typeof meta>

function RenderStory() {
	const [swiperState, setSwiperState] = React.useState<SwiperData<TermType>>(initializeSwiperData(mockTerms()))
	return (
		<div className={"w-[100vw] h-[100vh] flex-center"}>
			<Swiper
				swiperData={swiperState}
				onUpdate={(swiperData) => setSwiperState(swiperData)}
				className={"w-360 h-428"}
			/>
		</div>
	)
}
export const Primary: Story = {
	render: RenderStory,
}
