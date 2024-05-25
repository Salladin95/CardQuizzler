"use client"
import React from "react"
import { WithParamsId } from "~/app/types"
import { useProtectedProfile } from "~/shared"
import { ModulePreviewPage } from "~/views/module-preview"

export default function ProtectedModulePreview(props: WithParamsId) {
	const {
		params: { id },
	} = props
	useProtectedProfile()
	return <ModulePreviewPage id={id} />
}
