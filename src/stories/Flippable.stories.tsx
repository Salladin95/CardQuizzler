import type { Meta, StoryObj } from "@storybook/react"
import { Flippable, FlippableProps } from "~/features/Flippable"
import React from "react"
import { Card } from "~/entites"

const meta: Meta<typeof Flippable> = {
	title: "Features/Flippable",
	component: Flippable,
	parameters: {
		layout: "centered",
	},
}

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (props: Omit<FlippableProps, "onClick" | "isFlipped">) => {
	return <Flippable {...props} />
}

export const Primary: Story = {
	render: StoryRender,
	args: {
		frontSideContent: <Card title="FRONT" />,
		backSideContent: <Card title="BACK" />,
	},
}
