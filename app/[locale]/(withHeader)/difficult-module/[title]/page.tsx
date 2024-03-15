"use client"
import React from "react"
import { DifficultModulePage } from "~/views/module"

export default function ModuleWithDataHydration(props: { params: { title: string } }) {
	const { params } = props
	const decodedTitle = decodeURIComponent(params.title)
	return <DifficultModulePage title={decodedTitle} />
}
