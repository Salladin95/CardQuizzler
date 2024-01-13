import React from "react"
import { debounce } from "lodash"

export interface HighlightedPosition {
	top: number
	left: number
}

export function useEditorHighlightedPosition(element?: Element | null) {
	const [highlightedPosition, setHighlightedPosition] = React.useState<HighlightedPosition | null>(null)

	React.useEffect(() => {
		const updateSelectedText = () => {
			const selection = element?.ownerDocument.getSelection()

			if (selection && selection.rangeCount > 0) {
				const selectedText = selection.toString().trim()

				if (selectedText) {
					const range = selection.getRangeAt(0)
					const rect = range.getBoundingClientRect()

					return setHighlightedPosition({
						top: rect.top + window.scrollY,
						left: rect.left + window.scrollX,
					})
				}

				// Set to null when there is no selected text
				setHighlightedPosition(null)
			}
		}

		const handleSelectionChange = debounce(updateSelectedText, 150)

		element?.addEventListener("mouseup", handleSelectionChange)

		return () => {
			element?.removeEventListener("mouseup", handleSelectionChange)
		}
	}, [element])

	return highlightedPosition
}
