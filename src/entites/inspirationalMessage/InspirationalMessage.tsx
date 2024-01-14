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
			<h1 className={"h3 mr-4 768:h1 640:h2"}>{getRandomInspirationalMessage()}</h1>
			<ConfettiIcon className={"768:min-w-[7rem] 768:min-h-[7rem] min-w-[4rem] min-h-[4rem]"} />
		</div>
	)
}
