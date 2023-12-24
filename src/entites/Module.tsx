import { PropsWithClassName } from "~/app/types"
import { cn } from "~/lib"

export type ModuleType = {
	id: string
	title: string
	amountOfTerms: number
}

type ModuleProps = ModuleType & PropsWithClassName

export function Module(props: ModuleProps) {
	const { title, amountOfTerms, className } = props
	return (
		<div className={cn("panel min-w-[20rem] w-full py-4 px-2", className)}>
			<p className={"mb-1 text-body-2"}>
				Всего терминов: <span className={"italic"}>{amountOfTerms}</span>
			</p>
			<h1 className={"h3"}>{title}</h1>
		</div>
	)
}
