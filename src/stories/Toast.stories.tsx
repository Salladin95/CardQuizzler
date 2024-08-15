import type { Meta, StoryObj } from "@storybook/react"
import { Button, Toast, ToastProps, useToast } from "~/shared"
import withToasts from "./decorators/withToasts"

const meta: Meta<typeof Toast> = {
	title: "Shared/Toast",
	component: Toast,
	decorators: [withToasts()],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Toast component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Toast>

const StoryRender = (props: ToastProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const toast = useToast()
	return <Button onClick={() => toast(props)}>Trigger</Button>
}

export const Primary: Story = {
	render: StoryRender,
	args: {
		title: "Title",
		description: "Description",
		variant: "primary",
	},
}

export const Danger: Story = {
	render: StoryRender,
	args: {
		title: "Error",
		description: "Description",
	},
}

export const Info: Story = {
	render: StoryRender,
	args: {
		title: "Info",
		description: "Description",
		variant: "info",
	},
}

export const Long: Story = {
	render: StoryRender,
	args: {
		title: "Error",
		description:
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet" +
			"lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet, lorem ipsum dolores sit amet",
	},
}
