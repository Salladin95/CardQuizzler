import React from "react"

const useBodyClass = (className: string) => {
	React.useEffect(() => {
		if (!className) return
		document.body.classList.add(className)
		return () => {
			document.body.classList.remove(className)
		}
	}, [className])
}

export default useBodyClass
