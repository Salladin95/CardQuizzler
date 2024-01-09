"use client"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "~/app/types"
import useBodyClass from "~/shared/hooks/useBodyClass"

const Layout = ({ children }: PropsWithChildren) => {
	const pathname = usePathname()
	const hideScrollbar = /create|edit/.test(pathname) ? "hide-scrollbar" : ""
	// Hide scrollbar when on create/edit module pages
	useBodyClass(hideScrollbar)
	return children
}

export default Layout
