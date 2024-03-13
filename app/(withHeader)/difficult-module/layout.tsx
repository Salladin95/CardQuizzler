"use client"
import { useProtectedProfile } from "~/shared"
import { PropsWithChildren } from "~/app/types"

export default function DifficultModuleLayout({ children }: PropsWithChildren) {
	useProtectedProfile()
	return <>{children}</>
}
