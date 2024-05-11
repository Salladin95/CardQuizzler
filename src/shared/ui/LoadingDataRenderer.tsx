"use client"
import React from "react"
import { Loader } from "~/shared"

type LoadingDataRendererProps<DataT> = Record<string, unknown> & {
	Comp: React.ComponentType<DataT>
	data: DataT | null | undefined
	isLoading: boolean
}

export function LoadingDataRenderer<DataT>(props: LoadingDataRendererProps<DataT>) {
	const { Comp, data, isLoading, ...rest } = props
	switch (true) {
		case isLoading:
			return (
				<main className={"bg-gray-100 flex-center"}>
					<Loader className={"flex-none"} />
				</main>
			)
		default:
			if (data) {
				return <Comp {...data} {...rest} />
			}
			return null
	}
}
