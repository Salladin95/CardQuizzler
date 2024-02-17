import { QueryClient } from "@tanstack/react-query"

export function getQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// to avoid re-fetching immediately on the client
				// staleTime: 120 * 1000,
				staleTime: 0,
				retry: false,
				refetchOnMount: true,
			},
		},
	})
}
