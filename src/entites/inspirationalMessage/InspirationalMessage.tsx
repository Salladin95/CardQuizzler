import React from "react"
import { cn } from "~/lib"
import { ConfettiIcon } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { getRandomInspirationalMessage } from "./inspirationalMessages"

type InspirationalMessageProps = PropsWithClassName

export function InspirationalMessage(props: InspirationalMessageProps) {
	const { className } = props
	return (
		<div className={cn("flex-center", className)}>
			<h1 className={"h1 mr-3"}>{getRandomInspirationalMessage()}</h1>
			<ConfettiIcon className={"w-[10rem] h-[10rem]"} />
		</div>
	)
}
