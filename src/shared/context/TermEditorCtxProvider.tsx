import React from "react"
import { Editor } from "@tiptap/react"
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
	if (!ctx) {
		throw new Error("Term editor context is not defined")
	}
	return ctx
}
