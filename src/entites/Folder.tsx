"use client"
import { cn } from "~/shared/lib"
import { FolderIcon } from "~/shared"
import { FolderType } from "~/app/models"
import { useRouter } from "next/navigation"
import { useTranslations } from "~/app/i18n"
import { PropsWithClassName } from "~/app/types"

type FolderProps = FolderType & PropsWithClassName

export function Folder(props: FolderProps) {
	const { title, modules, className, id } = props
	const router = useRouter()
	const t = useTranslations("Folder")
	return (
		<div
			onClick={() => router.push(`/folder/${id}`)}
			className={cn(
				"py-4 px-2 bg-gray-700 text-white rounded-lg",
				"cursor-pointer transition-colors border-4 border-gray-800 hover:border-[#6528F7]",
				className,
			)}
		>
			<p className={"mb-1 text-body-2"}>{t("numberOfModules", { number: modules.length })}</p>
			<div className="flex items-center gap-x-2">
				<FolderIcon />
				<h1 className={"h3"}>{title}</h1>
			</div>
		</div>
	)
}
