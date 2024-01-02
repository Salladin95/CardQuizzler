import { Module } from "~/entites"
import { mockFolder } from "~/lib/mock/mock"
import { AddIcon, Button, FolderIcon } from "~/shared"
import { FolderSettingsMenu } from "./ui"

export default async function FolderPage() {
	const folder = mockFolder()

	return (
		<main className={"container"}>
			<section className={"mb-4 flex items-center justify-between"}>
				<p className={"h4"}>Всего модулей - {folder.modules.length}</p>
				<div className={"flex gap-x-2"}>
					<Button variant={"secondary"} className={"max-w-[3rem] h2"}>
						<AddIcon />
					</Button>
					<FolderSettingsMenu folder={folder} />
				</div>
			</section>
			<section className={"flex items-center gap-x-2 mb-4"}>
				<FolderIcon className={"w-8 h-8"} />
				<h1 className={"h2 bold"}>{folder.title}</h1>
			</section>
			<section className={"flex flex-col gap-y-4 mb-4"}>
				{folder.modules.map((module) => (
					<Module {...module} key={module.id} />
				))}
			</section>
			<Button variant={"primary"} className={"max-w-[20rem] h3 mx-auto"}>
				Добавить модуль
			</Button>
		</main>
	)
}
