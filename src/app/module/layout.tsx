"use client"
import { PropsWithChildren } from "~/app/types"
import { useProtectedProfile } from "~/api"

export default function ModuleLayout({ children }: PropsWithChildren) {
	useProtectedProfile()
	return children
}
