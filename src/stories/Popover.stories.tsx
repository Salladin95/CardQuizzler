import type { Meta, StoryObj } from "@storybook/react"
import { Button, Checkbox, Popover } from "~/shared"

const meta: Meta<typeof Popover> = {
	title: "Shared/Popover",
	component: Popover,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Popover component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Popover>

const trigger = <Button>Trigger</Button>

const content = (
	<div className="flex flex-col gap-3 border border-transparent">
		<h4>Popover content</h4>
		<label className="flex items-center gap-3 whitespace-nowrap">
			<div>Label 1</div>
		</label>
		<Checkbox label="Label 2" />
	</div>
)

export const Primary: Story = {
	args: {
		trigger,
		children: content,
		avoidCollisions: false,
	},
}

export const DefaultOpen: Story = {
	args: {
		trigger,
		defaultOpen: true,
		children: content,
	},
}

export const Top: Story = {
	args: {
		trigger,
		children: content,
		side: "top",
		avoidCollisions: false,
	},
}

export const Right: Story = {
	args: {
		trigger,
		children: content,
		side: "right",
		avoidCollisions: false,
	},
}

export const Bottom: Story = {
	args: {
		trigger,
		children: content,
		side: "bottom",
		avoidCollisions: false,
	},
}

export const Left: Story = {
	args: {
		trigger,
		children: content,
		side: "left",
		avoidCollisions: false,
	},
}
