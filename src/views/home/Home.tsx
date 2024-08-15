"use client"
import React from "react"
import Link from "next/link"
import { HomePageData } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { Button, getRandomArrEl, LoadingDataRenderer, useFetchHomePageData } from "~/shared"
import { CreateModuleFolder, HomeSearchBar } from "~/entites"
import { DifficultModulesCarousel, FolderCarousel, ModulesCarousel } from "~/widgets"

function Home(props: HomePageData) {
	const { lastActions, modules, difficultModules, folders } = props
	const t = useTranslations("Home")

	return (
		<main className={"container overflow-hidden"}>
			<div>
				<HomeSearchBar className={"mb-2"} />
				{Boolean(lastActions?.length) && (
					<section className="mb-4">
						<h1>{t("lastActions")}</h1>
						<ModulesCarousel data={lastActions} className={"h-[11rem]"} />
					</section>
				)}

				{Boolean(difficultModules?.length) && (
					<section className="">
						<h3>{t("difficultModules")}</h3>
						<DifficultModulesCarousel data={difficultModules} className={"h-[11rem]"} />
					</section>
				)}

				{Boolean(folders?.length) && (
					<section className="mb-4">
						<h2>{t("myFolders")}</h2>
						<FolderCarousel data={folders} className={"h-[9rem]"} />
					</section>
				)}

				{Boolean(modules?.length) && (
					<section className="mb-12">
						{t("myModules")}
						<ModulesCarousel data={modules} className={"h-[11rem]"} />
					</section>
				)}

				<div className={"flex gap-x-4"}>
					<CreateModuleFolder />
					<Button disabled={!modules?.length} className={"mb-4"}>
						<Link href={`/module/${getRandomArrEl(modules)?.id}`}>{t("randomModule")}</Link>
					</Button>
				</div>
			</div>
		</main>
	)
}

export function HomePage() {
	const { data, isPending } = useFetchHomePageData()
	return LoadingDataRenderer<HomePageData>({ Comp: Home, data, isLoading: isPending })
}
