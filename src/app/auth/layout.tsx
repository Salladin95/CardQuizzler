"use client"
import React from "react"
import { Logo } from "~/shared"

import { cn } from "~/lib"
import { PropsWithChildren } from "~/app/types"
import BG from "~/../public/assets/images/purple-items.png"
import { RequestEmailVerificationCtxProvider } from "~/providers/RequestEmailVerificationCtxProvider"

const style: React.CSSProperties = {
	backgroundImage: `url(${BG.src})`,
	backgroundPosition: "top",
	backgroundSize: "cover",
}
export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main style={style} className={"w-full h-ful flex flex-row justify-between"}>
			<section className={"hidden 768:block p-4 flex-1 relative"}>
				<p className={cn("font-y-today italic text-white text-[3rem] leading-[2.2rem]", "max-w-428 ")}>
					Embark on a language journey with us – where every word learned is a step towards a world of possibilities!
				</p>
				<Logo className={"absolute bottom-4 left-4"} />
			</section>
			<section className={"bg-white pt-[6rem] w-full 768:w-[60%] 1180:w-[45%] flex justify-center"}>
				<RequestEmailVerificationCtxProvider>{children}</RequestEmailVerificationCtxProvider>
			</section>
		</main>
	)
}
