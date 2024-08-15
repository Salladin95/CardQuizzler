"use client"

import React from "react"
import { getQueryClient } from "~/shared/lib"
import { PropsWithChildren } from "~/app/types"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function ReactQueryProvider({ children }: PropsWithChildren) {
	const [queryClient] = React.useState(() => getQueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
