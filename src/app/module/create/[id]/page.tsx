"use client"
import React from "react"
import { ModuleEditor } from "src/widgets/moduleEditor"

export default function AddModuleToTheFolder() {
	// TODO: WE SHOULD CRATE FOLDER AND ADD IT TO THE FOLDER. ID - IS THE FOLDER ID
	return (
		<main className={"container"}>
			{/* TODO: REPLACE MOCK LOGIC */}
			<ModuleEditor onSubmit={(terms) => console.log(terms)} />
		</main>
	)
}
