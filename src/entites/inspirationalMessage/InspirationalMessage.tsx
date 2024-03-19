import React from "react"
import { cn } from "~/shared/lib"
import { ConfettiIcon, getRandomInt } from "~/shared"
import { useTranslations } from "~/app/i18n"
import { PropsWithClassName } from "~/app/types"

type InspirationalMessageProps = PropsWithClassName

export function InspirationalMessage(props: InspirationalMessageProps) {
	const { className } = props
	const t = useTranslations("Widgets.confettiScreen.inspirationalMessages")
	return (
		<div className={cn("flex-center", className)}>
			<h1 className={"h3 mr-4 768:h1 640:h2 text-primary"}>{t(String(getRandomInt(9)))}</h1>
			<ConfettiIcon className={"768:min-w-[7rem] 768:min-h-[7rem] min-w-[4rem] min-h-[4rem]"} />
		</div>
	)
}
