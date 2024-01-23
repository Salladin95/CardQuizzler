"use client"
import { useProtectedProfile } from "~/api"
import { PropsWithChildren } from "~/app/types"

export default function FolderLayout({ children }: PropsWithChildren) {
	useProtectedProfile()
	return children
}
