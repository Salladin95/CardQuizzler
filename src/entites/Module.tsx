"use client"
import { useRouter } from "next/navigation"
import { cn } from "~/lib"
import { PropsWithClassName } from "~/app/types"
import { ModuleType } from "~/app/models"

type ModuleProps = ModuleType & PropsWithClassName

export function Module(props: ModuleProps) {
	const { title, terms, className, id } = props
	const router = useRouter()
	return (
		<div onClick={() => router.push(`/module/${id}`)} className={cn("panel min-w-[20rem] w-full py-4 px-2", className)}>
			<p className={"mb-1 text-body-2"}>
				Всего терминов: <span className={"italic"}>{terms.length}</span>
			</p>
			<h1 className={"h3"}>{title}</h1>
		</div>
	)
}
