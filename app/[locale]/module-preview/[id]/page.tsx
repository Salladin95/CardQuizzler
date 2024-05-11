"use client"
import { WithParamsId } from "~/app/types"
import { ModuleType } from "~/app/models"
import { ModulePreviewPage } from "~/views/module-preview"
import { DataHydration, getModule, moduleQueryKey, useProtectedProfile } from "~/shared"

export default function ModulePreview(props: WithParamsId) {
	const {
		params: { id },
	} = props
	useProtectedProfile()
	return (
		<DataHydration<ModuleType> getData={() => getModule(id)} queryKeys={[moduleQueryKey, id]}>
			<ModulePreviewPage id={id} />
		</DataHydration>
	)
}
