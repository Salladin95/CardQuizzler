import React from "react"
import { debounce } from "lodash"

interface HighlightPosition {
	top: number
	left: number
}

export function useEditorHighlightPosition(selector: string) {
	const [highlightPosition, setHighlightPosition] = React.useState<HighlightPosition | null>(null)

	const updateSelectedText = () => {
		const selection = window.getSelection()

		if (selection && selection.rangeCount > 0) {
			const selectedText = selection.toString().trim()

			if (selectedText) {
				const range = selection.getRangeAt(0)
				const rect = range.getBoundingClientRect()

				setHighlightPosition({
					top: rect.top + window.scrollY,
					left: rect.left + window.scrollX,
				})
				return
			}

			// Set to null when there is no selected text
			setHighlightPosition(null)
		}
	}

	const handleClick = debounce(updateSelectedText, 300)

	React.useEffect(() => {
		queryEditor(selector)?.addEventListener("mouseup", handleClick)

		return () => {
			queryEditor(selector)?.removeEventListener("mouseup", handleClick)
		}
	}, [handleClick, selector])
	return highlightPosition
}

function queryEditor(selector: string) {
	return document.querySelector(selector)
}
