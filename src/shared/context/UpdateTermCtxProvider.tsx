import React from "react"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { PropsWithChildren } from "~/app/types"

type UpdateTermCtxType = {
	renderUpdateTerm?: (t: TermType) => React.ReactNode
}

const UpdateTermCtx = React.createContext<UpdateTermCtxType | null>(null)

export function UpdateTermCtxProvider(props: PropsWithChildren & UpdateTermCtxType) {
	const { children, renderUpdateTerm } = props
	return <UpdateTermCtx.Provider value={{ renderUpdateTerm }}>{children}</UpdateTermCtx.Provider>
}

export function useUpdateTermCtx() {
	const ctx = React.useContext(UpdateTermCtx)
	const t = useTranslations("Exceptions")
	if (!ctx) {
		throw new Error(t("updateTermCtxNotDefined"))
	}
	return ctx
}
