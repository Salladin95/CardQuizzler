import React from "react"
import Link from "next/link"
import { Button } from "~/shared"
import { FolderCarousel, ModuleCarousel } from "~/widgets"
import { mockFolders, mockModules } from "~/lib/mock/mock"
import { CreateModuleFolder } from "~/entites/CreateModuleFolder"

export default async function Home() {
	return (
		<main className={"container"}>
			<section className="mb-4">
				<h1>Последние действия</h1>
				{/*TODO: REMOVE MOCKED DATA*/}
				<ModuleCarousel data={mockModules()} className={"h-[13rem]"} />
			</section>

			<section className="">
				<h3>Сложные модули</h3>
				{/*TODO: REMOVE MOCKED DATA*/}
				<ModuleCarousel data={mockModules()} className={"h-[13rem]"} />
			</section>

			<section className="mb-4">
				<h2>Мои папки</h2>
				{/*TODO: REMOVE MOCKED DATA*/}
				<FolderCarousel data={mockFolders()} className={"h-[13rem]"} />
			</section>

			<section className="">
				<h3>Мои модули</h3>
				{/*TODO: REMOVE MOCKED DATA*/}
				<ModuleCarousel data={mockModules(15)} className={"h-[13rem]"} />
			</section>

			<div className={"flex gap-x-4"}>
				<CreateModuleFolder />
				<Button className={"mb-4"}>
					{/*TODO: ADD LOGIC FOR EXTRACTING ID OF RANDOM MODULE*/}
					<Link href={`/module/${22}`}>Открыть рандомный модуль</Link>
				</Button>
			</div>
		</main>
	)
}
