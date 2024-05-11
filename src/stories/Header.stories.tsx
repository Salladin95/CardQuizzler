import { Header } from "~/widgets"
import { Locale } from "~/app/i18n"
import { ModuleContextMenu } from "~/features"
import { mockModule } from "~/shared/lib/mock"
import withQuery from "~/stories/decorators/withQuery"
import type { Meta, StoryObj } from "@storybook/react"
import withTranslation from "~/stories/decorators/withTranslation"
import { reactRouterParameters, withRouter } from "storybook-addon-react-router-v6"

const meta: Meta<typeof Header> = {
	title: "Widgets/Header",
	component: Header,
	decorators: [withTranslation({ locale: Locale.EN }), withQuery(), withRouter],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Header component",
			},
			reactRouter: reactRouterParameters({
				location: {
					pathParams: { userId: "42" },
				},
				routing: { path: "/users/:userId" },
			}),
		},
	},
}

export default meta

type Story = StoryObj<typeof Header>

export const Primary: Story = {
	args: {},
}

export const Secondary: Story = {
	args: {
		renderContextMenu: () => <ModuleContextMenu {...mockModule()} />,
	},
}
