"use client"
import React from "react"
import { CreateModuleInFolderPage } from "~/views/module/"

export default function CreateModuleInFolder(props: { params: { folderId: string } }) {
	return <CreateModuleInFolderPage id={props.params.folderId} />
}
