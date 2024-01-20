"use client"
import React from "react"
import { Header } from "~/widgets"
import { PropsWithChildren } from "~/app/types"

import BG from "~/../public/assets/images/purple-items.png"

const style: React.CSSProperties = {
	backgroundImage: `url(${BG.src})`,
	backgroundPosition: "top",
	backgroundSize: "cover",
}
export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main style={style} className={"w-full h-full"}>
			<Header className={"border-gray-100 border-b-1.5px text-white"} />
			{children}
		</main>
	)
}
