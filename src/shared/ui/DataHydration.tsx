"use client"
import React from "react"
import { getQueryClient } from "~/api/queryClient"
import { dehydrate, DehydratedState, Hydrate } from "@tanstack/react-query"

type WithHydrationProps<DataT> = {
	children: React.ReactNode
	queryKeys: string[]
	getData: () => Promise<DataT>
}

export function DataHydration<DataT>(props: WithHydrationProps<DataT>) {
	const { queryKeys, children, getData } = props
	const queryClient = getQueryClient()
	const [dehydratedState, setDehydratedState] = React.useState<DehydratedState>()
	React.useEffect(() => {
		;(async () => {
			await queryClient.prefetchQuery(queryKeys, getData)
			const dehydratedState = dehydrate(queryClient)
			setDehydratedState(dehydratedState)
		})()
	}, [getData, queryClient, queryKeys])

	return <Hydrate state={dehydratedState}>{children}</Hydrate>
}
