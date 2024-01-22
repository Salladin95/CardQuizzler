import React from "react"
import { PropsWithChildren } from "~/app/types"

import BG from "~/../public/assets/images/purple-items.png"

const style: React.CSSProperties = {
	backgroundImage: `url(${BG.src})`,
	backgroundPosition: "top",
	backgroundSize: "cover",
}
export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main style={style} className={"w-full h-ful flex flex-row justify-between"}>
			<section className={"hidden 768:block"}>
				<h1>CardQuizzler</h1>
			</section>
			<section className={"bg-white pt-[6rem] w-full 768:w-[60%] 1180:w-[45%] flex justify-center"}>{children}</section>
		</main>
	)
}
