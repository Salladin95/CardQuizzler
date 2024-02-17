import React from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "~/shared/lib"

type WithHydrationProps<DataT> = {
	children: React.ReactNode
	queryKeys: string[]
	getData: () => Promise<DataT>
}

export function DataHydration<DataT>(props: WithHydrationProps<DataT>) {
	const { queryKeys, children, getData } = props
	const queryClient = getQueryClient()
	queryClient.prefetchQuery({ queryKey: queryKeys, queryFn: getData })
	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
