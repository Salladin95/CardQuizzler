"use client"
import React from "react"
import { useSessionStorage } from "react-use"
import { PropsWithChildren } from "~/app/types"

type ProtectedByPasswordCtxType = {
	password: string
	updatePassword: (password: string) => void
}

const ProtectedByPasswordCtx = React.createContext<ProtectedByPasswordCtxType | null>(null)

type ProtectedByPasswordCtxProviderProps = {
	sessionStoreKey: string
} & PropsWithChildren

export function ProtectedByPasswordCtxProvider(props: ProtectedByPasswordCtxProviderProps) {
	const { children, sessionStoreKey } = props
	const [sessionStorePassword, setSessionStorePassword] = useSessionStorage(sessionStoreKey, "")
	const [password, setPassword] = React.useState(sessionStorePassword)

	function updatePassword(password: string) {
		setSessionStorePassword(password)
		setPassword(password)
	}

	return (
		<ProtectedByPasswordCtx.Provider value={{ password, updatePassword }}>{children}</ProtectedByPasswordCtx.Provider>
	)
}

export function useProtectedModuleCtx() {
	return React.useContext(ProtectedByPasswordCtx)
}
