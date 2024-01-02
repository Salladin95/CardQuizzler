"use client"
import { useRouter } from "next/navigation"
import { cn } from "~/lib"
import { FolderIcon } from "~/shared"
import { PropsWithClassName } from "~/app/types"
import { FolderType } from "~/app/models"

type FolderProps = FolderType & PropsWithClassName

export function Folder(props: FolderProps) {
	const { title, modules, className, id } = props
	const router = useRouter()
	return (
		<div onClick={() => router.push(`/folder/${id}`)} className={cn("panel py-4 px-2", className)}>
			<p className={"mb-1 text-body-2"}>
				Всего модулей: <span className={"italic"}>{modules.length}</span>
			</p>
			<div className="flex items-center gap-x-2">
				<FolderIcon />
				<h1 className={"h3"}>{title}</h1>
			</div>
		</div>
	)
}
