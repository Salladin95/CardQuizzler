"use client"
import React from "react"
import { ModuleType } from "~/app/models"
import { WithParamsId } from "~/app/types"
import { EditModulePage } from "~/views/module"
import { DataHydration, getModule, moduleQueryKey } from "~/shared"

export default function ModuleWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<ModuleType> getData={() => getModule(params.id)} queryKeys={[moduleQueryKey, params.id]}>
			<EditModulePage id={params.id} />
		</DataHydration>
	)
}
