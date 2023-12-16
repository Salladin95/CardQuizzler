import React from "react"
import { getQueryClient } from "~/api/queryClient"
import { QueryKeyOption, queryKeys } from "~/api/constants"
import { dehydrate, Hydrate } from "@tanstack/react-query"

type WithHydrationProps<DataT> = {
	children: React.ReactNode
	queryKey: QueryKeyOption
	getData: () => Promise<DataT>
}
export const DataHydration = async <DataT,>(props: WithHydrationProps<DataT>) => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery([queryKeys[props.queryKey]], props.getData)
	const dehydratedState = dehydrate(queryClient)

	return <Hydrate state={dehydratedState}>{props.children}</Hydrate>
}
