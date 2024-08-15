import React from "react"
import { Editor } from "@tiptap/react"
import { useTranslations } from "~/app/i18n"
import { PropsWithChildren } from "~/app/types"

type TermEditorCtxType = {
	editor: null | Editor
	setEditor: (editor: Editor | null) => void
}

const TermEditorCtx = React.createContext<null | TermEditorCtxType>(null)

export function TermEditorCtxProvider(props: PropsWithChildren) {
	const [editor, setEditor] = React.useState<Editor | null>(null)
	return (
		<TermEditorCtx.Provider
			value={{
				editor,
				setEditor,
			}}
		>
			{props.children}
		</TermEditorCtx.Provider>
	)
}

export const useTermEditorCtx = () => {
	const ctx = React.useContext(TermEditorCtx)
	const t = useTranslations("Exceptions")
	if (!ctx) {
		throw new Error(t("termCtxNotDefined"))
	}
	return ctx
}
