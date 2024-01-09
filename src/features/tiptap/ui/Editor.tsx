"use client"
import React from "react"
import { cn } from "~/lib"
import { Popover } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { EditorContent, EditorOptions } from "@tiptap/react"
import { EditorToolBar, useConfigureEditor } from "~/features/tiptap"
import { HighlightedPosition, useEditorHighlightedPosition } from "~/features/tiptap/hooks"

type TipTapEditorProps = {
	options?: Partial<EditorOptions>
} & PropsWithClassName

export function Editor(props: TipTapEditorProps) {
	const { className, options } = props
	const [showToolbar, setShowToolbar] = React.useState(false)
	const parentRef = React.useRef<HTMLDivElement>(null)
	const editor = useConfigureEditor({ ...options })

	const highlightedTextPosition = useEditorHighlightedPosition(parentRef.current)

	React.useEffect(() => {
		setShowToolbar(Boolean(highlightedTextPosition))
	}, [highlightedTextPosition])

	const popoverStyle = getPopoverStyles(highlightedTextPosition, parentRef.current)

	return (
		<div className={cn("editor-wrapper", className)} ref={parentRef}>
			<EditorContent editor={editor} />
			<Popover open={showToolbar} onOpenChange={setShowToolbar} style={popoverStyle} side={"top"}>
				<EditorToolBar editor={editor} />
			</Popover>
		</div>
	)
}

function getPopoverStyles(
	highlightedPosition: HighlightedPosition | null,
	parentElement: HTMLElement | null,
): React.CSSProperties {
	if (!highlightedPosition || !parentElement) {
		return {}
	}
	return {
		position: "absolute",
		// TODO: REMOVE ARBITRARY VALUES!!!
		top: highlightedPosition.top - window.scrollY - 80,
		left: Math.min(
			Math.max(highlightedPosition.left - 80, parentElement.getBoundingClientRect().left),
			parentElement.getBoundingClientRect().right - 200,
		),
	}
}
