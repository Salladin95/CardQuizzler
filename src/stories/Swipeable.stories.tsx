import type { Meta, StoryObj } from "@storybook/react"
import { Swipeable } from "~/features/swipeable"

const meta: Meta<typeof Swipeable> = {
	title: "Features/Swipeable",
	component: Swipeable,
	parameters: {
		layout: "centered",
	},
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: (args) => <Swipeable {...args} />,
	args: {
		frontSideContent: "FRONT",
		backSideContent: "BACK",
		className: "w-360 h-428",
		isTheTopCard: true,
	},
}
