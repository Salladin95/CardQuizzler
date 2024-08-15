"use client"
import { cn } from "~/shared/lib"
import { ModuleType } from "~/app/models"
import { ClosedBookIcon } from "~/shared"
import { useTranslations } from "~/app/i18n"
import { PropsWithClassName } from "~/app/types"

export type ModuleProps = ModuleType &
	PropsWithClassName & {
		onClick?: () => void
	}

export function Module(props: ModuleProps) {
	const t = useTranslations("Module")
	const { title, terms, className, onClick } = props

	function handleClick() {
		onClick && onClick()
	}
	return (
		<div
			onClick={handleClick}
			className={cn(
				"min-w-[20rem] w-full py-4 px-2 bg-gray-800 box-border text-white rounded-[2px]",
				"cursor-pointer transition-colors border-4 border-gray-700 hover:border-[#6528F7]",
				className,
			)}
		>
			<p className={"mb-1 text-body-2"}>{t("numberOfTerms", { number: terms.length })}</p>
			<div className={"flex items-center gap-2"}>
				<ClosedBookIcon className={"text-white"} />
				<h1 className={"h3"}>{title}</h1>
			</div>
		</div>
	)
}
