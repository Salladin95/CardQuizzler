"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// to avoid re-fetching immediately on the client
						staleTime: 120 * 1000,
					},
				},
			}),
	)
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
