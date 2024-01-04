"use client"
import React from "react"
import { WithId, WithParamsId } from "~/app/types"
import { ModuleType } from "~/app/models"
import { getModule } from "~/api/requests"
import { Swiper } from "~/features/swiper/Swiper"
import { moduleQueryKey, useFetchModule } from "~/api"
import { DataHydration, LoadingDataRenderer } from "~/shared"

function Module(props: ModuleType) {
	return (
		<main className={"flex-center overflow-hidden"}>
			<Swiper cards={props.terms} className={""} />
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
