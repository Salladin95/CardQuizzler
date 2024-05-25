"use client"
import React from "react"
import { PropsWithChildren } from "~/app/types"
import { useSessionStorage } from "react-use"

type ProtectedModuleCtxType = {
	password: string
	updatePassword: (password: string) => void
}

const ProtectedModuleCtx = React.createContext<ProtectedModuleCtxType | null>(null)

type ProtectedModuleCtxProviderProps = {
	sessionStoreKey: string
} & PropsWithChildren

export function ProtectedModuleCtxProvider(props: ProtectedModuleCtxProviderProps) {
	const { children, sessionStoreKey } = props
	const [sessionStorePassword, setSessionStorePassword] = useSessionStorage(sessionStoreKey, "")
	const [password, setPassword] = React.useState(sessionStorePassword)

	function updatePassword(password: string) {
		setSessionStorePassword(password)
		setPassword(password)
	}

	return <ProtectedModuleCtx.Provider value={{ password, updatePassword }}>{children}</ProtectedModuleCtx.Provider>
}

export function useProtectedModuleCtx() {
	return React.useContext(ProtectedModuleCtx)
}
