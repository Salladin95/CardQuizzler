import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, Dialog as DialogComp } from "~/shared"

const meta: Meta<typeof DialogComp> = {
	title: "Shared/Dialog",
	component: DialogComp,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Dialog component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof DialogComp>

export const Dialog: Story = {
	args: {
		trigger: <Button>Trigger</Button>,
		children: <div>Some cool content here</div>,
	},
}
