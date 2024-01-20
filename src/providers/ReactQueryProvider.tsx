"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "~/app/types"

export function ReactQueryProvider({ children }: PropsWithChildren) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// to avoid re-fetching immediately on the client
						staleTime: 120 * 1000,
						retry: false,
					},
				},
			}),
	)
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
