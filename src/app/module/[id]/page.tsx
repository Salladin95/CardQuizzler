"use client"
import React from "react"
import { ModuleType } from "~/app/models"
import { getModule } from "~/api/requests"
import { Swiper } from "~/features/swiper/Swiper"
import { WithId, WithParamsId } from "~/app/types"
import { moduleQueryKey, useFetchModule } from "~/api"
import { DataHydration, LoadingDataRenderer } from "~/shared"

function Module(props: ModuleType) {
	return (
		<main className={"flex flex-col relative overflow-hidden"}>
			<Swiper cards={props.terms} className={"mt-12 container"} />
		</main>
	)
}

function ModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: Module, data, isLoading })
}

export default function ModuleWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<ModuleType> getData={() => getModule(params.id)} queryKeys={[moduleQueryKey, params.id]}>
			<ModulePage id={params.id} />
		</DataHydration>
	)
}
