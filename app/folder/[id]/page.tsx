"use client"
import React from "react"
import { FolderType } from "~/app/models"
import { WithParamsId } from "~/app/types"
import { FolderPage } from "~/views/folder/Folder"
import { DataHydration, folderQueryKey, getFolder } from "~/shared"

export default function FolderWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<FolderType> getData={() => getFolder(params.id)} queryKeys={[folderQueryKey, params.id]}>
			<FolderPage id={params.id} />
		</DataHydration>
	)
}
