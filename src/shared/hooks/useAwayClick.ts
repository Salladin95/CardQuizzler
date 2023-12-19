import React from "react"

export function useAwayClick(ref: React.MutableRefObject<HTMLElement>, callback: () => void) {
	React.useEffect(() => {
		const handleClick = (e: Event) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback()
			}
		}
		document.addEventListener("click", handleClick)

		return () => {
			document.removeEventListener("click", handleClick)
		}
	}, [callback, ref])
}
