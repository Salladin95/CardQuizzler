"use client"
import React from "react"
import { ModuleEditor } from "~/widgets/moduleEditor"
import { mockTerms } from "~/lib/mock"

export default function EditModule() {
	return (
		<main className={"container"}>
			{/* TODO: REPLACE MOCK LOGIC */}
			<ModuleEditor terms={mockTerms(20)} onSubmit={(terms) => console.log(terms)} />
		</main>
	)
}
