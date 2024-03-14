"use client"
import React from "react"
import Link from "next/link"
import { HomePageData } from "~/app/models"
import { CreateModuleFolder } from "~/entites"
import { Button, getRandomArrEl, LoadingDataRenderer, useFetchHomePageData } from "~/shared"
import { DifficultModulesCarousel, FolderCarousel, ModulesCarousel } from "~/widgets"

export function Home(props: HomePageData) {
	const { lastActions, modules, difficultModules, folders } = props

	return (
		<main className={"container overflow-hidden"}>
			{Boolean(lastActions?.length) && (
				<section className="mb-4">
					<h1>Последние действия</h1>
					<ModulesCarousel data={lastActions} className={"h-[11rem]"} />
				</section>
			)}

			{Boolean(difficultModules?.length) && (
				<section className="">
					<h3>Сложные модули</h3>
					<DifficultModulesCarousel data={difficultModules} className={"h-[11rem]"} />
				</section>
			)}

			{Boolean(folders?.length) && (
				<section className="mb-4">
					<h2>Мои папки</h2>
					<FolderCarousel data={folders} className={"h-[9rem]"} />
				</section>
			)}

			{Boolean(modules?.length) && (
				<section className="mb-12">
					<h3>Мои модули</h3>
					<ModulesCarousel data={modules} className={"h-[11rem]"} />
				</section>
			)}

			<div className={"flex gap-x-4"}>
				<CreateModuleFolder />
				<Button disabled={!modules.length} className={"mb-4"}>
					<Link href={`/module/${getRandomArrEl(modules)?.id}`}>Рандомный модуль</Link>
				</Button>
			</div>
		</main>
	)
}

export function HomePage() {
	const { data, isPending } = useFetchHomePageData()
	return LoadingDataRenderer<HomePageData>({ Comp: Home, data, isLoading: isPending })
}
