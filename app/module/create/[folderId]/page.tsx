"use client"
import React from "react"
import { AddModuleToTheFolderPage } from "~/views/module/"

export default function AddModuleToTheFolder(props: { params: { folderId: string } }) {
	return <AddModuleToTheFolderPage id={props.params.folderId} />
}
