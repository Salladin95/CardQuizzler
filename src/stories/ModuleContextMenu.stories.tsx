import { Locale } from "~/app/i18n"
import { ModuleContextMenu } from "~/features"
import { Meta, StoryObj } from "@storybook/react"
import withQuery from "~/stories/decorators/withQuery"
import withTranslation from "~/stories/decorators/withTranslation"

const meta: Meta<typeof ModuleContextMenu> = {
	title: "Features/ModuleContextMenu",
	component: ModuleContextMenu,
	decorators: [withTranslation({ locale: Locale.EN }), withQuery()],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "ModuleContextMenu component",
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof ModuleContextMenu>

export const ModuleStory: Story = {
	args: {
		id: "1",
		userID: "22",
	},
}
