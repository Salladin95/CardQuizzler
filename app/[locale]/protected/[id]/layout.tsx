"use client"
import React from "react"
import { WithParamsId } from "~/app/types"
import { ProtectedModuleCtxProvider } from "~/shared/context/ProtectedModuleCtxProvider"

export default function PasswordProtectedLayout({
	children,
	params: { id },
}: { children: React.ReactNode } & WithParamsId) {
	return <ProtectedModuleCtxProvider sessionStoreKey={id}>{children}</ProtectedModuleCtxProvider>
}
