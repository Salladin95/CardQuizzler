import type { Meta, StoryObj } from "@storybook/react"
import { Button, Tooltip } from "~/shared"

const meta: Meta<typeof Tooltip> = {
	title: "Shared/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Tooltip component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Tooltip>

const trigger = <Button>Trigger</Button>
const content = (
	<div>
		<h5 className={"border-b border-b-primary mb-1"}>Secret info</h5>
		<p className={"text-gray-400"}>Abrakadabra</p>
	</div>
)

export const Left: Story = {
	args: {
		trigger,
		side: "left",
		align: "start",
		children: content,
	},
}

export const Top: Story = {
	args: {
		trigger,
		side: "top",
		align: "start",
		children: content,
	},
}

export const Right: Story = {
	args: {
		trigger,
		side: "right",
		align: "start",
		children: content,
	},
}

export const Bottom: Story = {
	args: {
		trigger,
		side: "bottom",
		align: "start",
		children: content,
	},
}
