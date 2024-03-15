import React from "react"
import { Header } from "~/widgets"
import { PropsWithChildren } from "~/app/types"

import "~/globals.css"

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Header className={"border-[1px] border-b-primary"} />
			{children}
		</>
	)
}
