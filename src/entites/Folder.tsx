import { FolderIcon } from "~/shared"

type FolderProps = {
	title: string
	amountOfModules: number
}

export function Folder(props: FolderProps) {
	const { title, amountOfModules } = props
	return (
		<div className={"panel"}>
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
