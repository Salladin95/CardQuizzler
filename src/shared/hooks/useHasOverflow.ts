import React from "react"

export function useHasOverflow(contentRef: HTMLElement | null | undefined) {
	const [hasOverflow, setHasOverflow] = React.useState(false)

	React.useEffect(() => {
		if (contentRef) {
			setHasOverflow(contentRef.scrollHeight > contentRef.clientHeight)
		}
	}, [contentRef])
	return hasOverflow
}
