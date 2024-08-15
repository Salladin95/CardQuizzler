"use client"
import React from "react"
import { WithParamsId } from "~/app/types"
import { ProtectedByPasswordCtxProvider, useProtectedProfile } from "~/shared"

export default function PasswordProtectedLayout({
	children,
	params: { id },
}: { children: React.ReactNode } & WithParamsId) {
	useProtectedProfile()
	return <ProtectedByPasswordCtxProvider sessionStoreKey={id}>{children}</ProtectedByPasswordCtxProvider>
}
