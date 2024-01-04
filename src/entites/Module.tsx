"use client"
import { cn } from "~/lib"
import { PropsWithClassName } from "~/app/types"
import { ModuleType } from "~/app/models"

export type ModuleProps = ModuleType & PropsWithClassName

export function Module(props: ModuleProps) {
	const { title, terms, className } = props
	return (
		<div className={cn("panel min-w-[20rem] w-full py-4 px-2", className)}>
			<p className={"mb-1 text-body-2"}>
				Всего терминов: <span className={"italic"}>{terms.length}</span>
			</p>
			<h1 className={"h3"}>{title}</h1>
		</div>
	)
}
