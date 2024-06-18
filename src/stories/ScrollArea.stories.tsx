import { ScrollArea } from "~/shared"
import { mockTerms } from "~/shared/lib/mock"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ScrollArea> = {
	title: "Shared/ScrollArea",
	component: ScrollArea,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "ScrollArea component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Primary: Story = {
	args: {
		className: "h-[15rem] w-[20rem]",
		children: mockTerms(55).map((t) => (
			<div className={"cursor-copy"} key={t.id}>
				{t.title}
			</div>
		)),
	},
}
