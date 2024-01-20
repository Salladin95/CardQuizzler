"use client"
import React from "react"
import Link from "next/link"
import { faker } from "@faker-js/faker"
import { HomePageData } from "~/app/models"
import { CreateModuleFolder } from "~/entites"
import { Button, DataHydration, Loader } from "~/shared"
import { FolderCarousel, Header, ModuleCarousel } from "~/widgets"
import {
	getHomePageData,
	homeDataKeys,
	useFetchDifficultModules,
	useFetchFolders,
	useFetchLastActions,
	useFetchModules,
} from "~/api"

function Home() {
	const { data: lastActions, isLoading: isLastActionsLoading } = useFetchLastActions()
	const { data: difficultModules, isLoading: isDifModulesLoading } = useFetchDifficultModules()
	const { data: modules, isLoading: isModulesLoading } = useFetchModules()
	const { data: folders, isLoading: isFoldersLoading } = useFetchFolders()

	if (isDifModulesLoading || isLastActionsLoading || isModulesLoading || isFoldersLoading) {
		return (
			<main className={"bg-gray-100 flex-center"}>
				<Loader className={"flex-none"} />
			</main>
		)
	}

	return (
		<main className={"container overflow-hidden"}>
			<section className="mb-4">
				<h1>Последние действия</h1>
				<ModuleCarousel data={lastActions} className={"h-[11rem]"} />
			</section>

			<section className="">
				<h3>Сложные модули</h3>
				<ModuleCarousel data={difficultModules} className={"h-[11rem]"} />
			</section>

			<section className="mb-4">
				<h2>Мои папки</h2>
				<FolderCarousel data={folders} className={"h-[9rem]"} />
			</section>

			<section className="mb-12">
				<h3>Мои модули</h3>
				<ModuleCarousel data={modules} className={"h-[11rem]"} />
			</section>

			<div className={"flex gap-x-4"}>
				<CreateModuleFolder />
				<Button className={"mb-4"}>
					{/*TODO: ADD LOGIC FOR EXTRACTING ID OF RANDOM MODULE*/}
					<Link href={`/module/${faker.string.uuid()}`}>Открыть рандомный модуль</Link>
				</Button>
			</div>
		</main>
	)
}

export default function HomeWithDataHydration() {
	return (
		<DataHydration<HomePageData> getData={getHomePageData} queryKeys={homeDataKeys}>
			<Header />
			<Home />
		</DataHydration>
	)
}
