import { Decorator } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	},
})

export default function withQuery(): Decorator {
	return (Story) => (
		<QueryClientProvider client={queryClient}>
			<Story />
		</QueryClientProvider>
	)
}
