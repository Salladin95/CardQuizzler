"use client"
import React from "react"
import { ToastProvider } from "~/shared"
import { PropsWithChildren } from "~/app/types"
import { ReactQueryProvider } from "~/providers/ReactQueryProvider"

export function Providers(props: PropsWithChildren) {
	const { children } = props
	return (
		<ToastProvider>
			<ReactQueryProvider>{children}</ReactQueryProvider>
		</ToastProvider>
	)
}
