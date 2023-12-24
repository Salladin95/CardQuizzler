import { FolderIcon } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { cn } from "~/lib"

export type FolderType = {
	id: string
	title: string
	amountOfModules: number
}

type FolderProps = FolderType & PropsWithClassName

export function Folder(props: FolderProps) {
	const { title, amountOfModules, className } = props
	return (
		<div className={cn("panel py-4 px-2", className)}>
			<p className={"mb-1 text-body-2"}>
				Всего модулей: <span className={"italic"}>{amountOfModules}</span>
			</p>
			<div className="flex items-center gap-x-2">
				<FolderIcon />
				<h1 className={"h3"}>{title}</h1>
			</div>
		</div>
	)
}
