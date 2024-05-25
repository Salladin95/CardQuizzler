"use client"
import React from "react"
import { WithParamsId } from "~/app/types"
import { ModulePage } from "~/views/module"
import { useProtectedProfile } from "~/shared"

export default function ProtectedModule(props: WithParamsId) {
	const {
		params: { id },
	} = props
	useProtectedProfile()
	return <ModulePage id={id} />
}
