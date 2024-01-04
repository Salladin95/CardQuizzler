import React from "react"
import type { Decorator } from "@storybook/react"
import { ToastProviderProps, withToasts as withUiToasts } from "~/shared"

/**
 * Decorator to access useToast inside story
 * */
export default function withToasts(props?: ToastProviderProps): Decorator {
	return (Story) => {
		const StoryWithToasts = withUiToasts(Story, props)
		return <StoryWithToasts />
	}
}
