"use client"
import React from "react"
import { ModuleEditor } from "src/widgets/moduleEditor"

export default function CreateModule() {
	return (
		<main className={"container"}>
			{/* TODO: REPLACE MOCK LOGIC */}
			<ModuleEditor onSubmit={(terms) => console.log(terms)} />
		</main>
	)
}
