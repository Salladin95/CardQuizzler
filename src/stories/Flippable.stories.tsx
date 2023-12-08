import type { Meta, StoryObj } from "@storybook/react"
import { Flippable, FlippableProps } from "~/features/flippable/Flippable"
import React from "react"

const meta: Meta<typeof Flippable> = {
	title: "example/Flippable",
	component: Flippable,
	parameters: {
		layout: "centered",
	},
}

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (props: Omit<FlippableProps, "onClick" | "isFlipped">) => {
	const [isFlipped, setIsFlipped] = React.useState(false)
	return <Flippable {...props} isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)} />
}

export const Primary: Story = {
	render: StoryRender,
	args: {
		frontSideContent: "FRONT",
		backSideContent: "BACK",
		className: "w-640 h-360 bg-green-400 rounded-12px",
	},
}
