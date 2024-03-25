import { PropsWithChildren } from "~/app/types"
import React from "react"
import { useTranslations } from "~/app/i18n"

type UpdateTermCtxType = {
	renderUpdateTerm: () => React.ReactNode
}

const UpdateTermCtx = React.createContext<UpdateTermCtxType | null>(null)

export function UpdateTermCtxProvider(props: PropsWithChildren) {
	const { children } = props
	return <UpdateTermCtx.Provider value={null}>{children}</UpdateTermCtx.Provider>
}

export function useUpdateTermCtx() {
	const ctx = React.useContext(UpdateTermCtx)
	const t = useTranslations("Exceptions")
	if (!ctx) {
		throw new Error(t("updateTermCtxNotDefined"))
	}
	return ctx
}
