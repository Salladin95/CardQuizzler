import { FolderIcon } from "~/shared"

type FolderProps = {
	title: string
	amountOfModules: number
}

export function Folder(props: FolderProps) {
	const { title, amountOfModules } = props
	return (
		<div
			className={
				"bg-gray-800 rounded-lg min-w-[20rem] w-full py-4 px-2 text-white gray-border cursor-pointer group relative after:absolute after:content-[''] after:w-full after:left-0 after:bottom-0 after:ease-out after:duration-300 after:transition-opacity after:h-[4px] after:opacity-0 after:bg-white hover:after:opacity-100"
			}
		>
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
