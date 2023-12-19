import React from "react"

export function useHighlightText() {
	const [highlightedText, setHighlightedText] = React.useState("")

	const handleSelectionChange = () => {
		const selection = window.getSelection()
		if (!selection) {
			setHighlightedText("")
			return
		}

		const selectedText = selection.toString().trim()
		setHighlightedText(selectedText)
	}

	React.useEffect(() => {
		document.addEventListener("selectionchange", handleSelectionChange)

		return () => {
			document.removeEventListener("selectionchange", handleSelectionChange)
		}
	}, [])

	return highlightedText
}
