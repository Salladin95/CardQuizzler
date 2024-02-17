import React from "react"
import { PropsWithChildren } from "~/app/types"
import { UseRequestEmailVerification, useRequestEmailVerification, useToast } from "~/shared"

type RequestEmailVerificationCtxType = {
	resetForm: (() => void) | null
	requestEmailVerification: UseRequestEmailVerification
	email: string
	setEmail: (email: string) => void
}

const RequestEmailVerificationCtx = React.createContext<RequestEmailVerificationCtxType | null>(null)

export function RequestEmailVerificationCtxProvider(props: PropsWithChildren) {
	const toast = useToast()
	const requestEmailVerification = useRequestEmailVerification({
		onError: () => {
			toast({ variant: "error", title: "Failed", description: "failed  to request email verification" })
		},
	})
	const [email, setEmail] = React.useState("")
	return (
		<RequestEmailVerificationCtx.Provider
			value={{
				email,
				setEmail,
				resetForm: null,
				requestEmailVerification,
			}}
		>
			{props.children}
		</RequestEmailVerificationCtx.Provider>
	)
}

export const useRequestEmailVerificationCtx = () => {
	const ctx = React.useContext(RequestEmailVerificationCtx)
	if (!ctx) {
		throw new Error("Request email verification context is not defined")
	}
	return ctx
}
