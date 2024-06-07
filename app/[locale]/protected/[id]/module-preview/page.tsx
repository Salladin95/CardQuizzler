"use client"
import React from "react"
import { WithParamsId } from "~/app/types"
import { ModuleType } from "~/app/models"
import { ModulePreviewPage } from "~/views/module-preview"
import { DataHydration, getModule, moduleQueryKey } from "~/shared"

export default function ProtectedModulePreview(props: WithParamsId) {
	const {
		params: { id },
	} = props
	return (
		<DataHydration<ModuleType> getData={() => getModule({ id })} queryKeys={[moduleQueryKey, id]}>
			<ModulePreviewPage id={id} />
		</DataHydration>
	)
}
