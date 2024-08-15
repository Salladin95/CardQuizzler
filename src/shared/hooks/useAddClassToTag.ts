import React from "react"

export const useAddClassToTag = (className: string, tag: string) => {
	React.useEffect(() => {
		if (!className) return
		document.querySelector(tag)?.classList.add(className)
		return () => {
			document.querySelector(tag)?.classList.remove(className)
		}
	}, [className, tag])
}
