"use client"
import { useProtectedProfile } from "~/shared"
import { PropsWithChildren } from "~/app/types"

export default function ModuleLayout({ children }: PropsWithChildren) {
	useProtectedProfile()
	return children
}
