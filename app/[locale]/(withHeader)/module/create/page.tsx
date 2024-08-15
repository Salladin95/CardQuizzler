"use client"
import React from "react"
import { createEmptyTerms } from "~/shared"
import { CreateModulePage } from "~/views/module"

export default function CreateModule() {
	const terms = createEmptyTerms(3)
	return <CreateModulePage terms={terms} />
}
