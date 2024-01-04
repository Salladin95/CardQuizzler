"use client"
import React from "react"
import Link from "next/link"
import { WithId, WithParamsId } from "~/app/types"
import { FolderType } from "~/app/models"
import { getFolder } from "~/api/requests"
import { folderQueryKey, useFetchFolder } from "~/api"
import { FolderSettingsMenu, ModuleContextMenu } from "~/entites"
import { AddIcon, Button, DataHydration, FolderIcon, LoadingDataRenderer } from "~/shared"

function Folder(folder: FolderType) {
	return (
		<main className={"container"}>
			<section className={"mb-4 flex items-center justify-between"}>
				<p className={"h4"}>Всего модулей - {folder.modules.length}</p>
				<div className={"flex gap-x-2"}>
					<Link href={`/module/create/${folder.id}`}>
						<Button variant={"secondary"} className={"max-w-[3rem] h2"}>
							<AddIcon />
						</Button>
					</Link>
					<FolderSettingsMenu folder={folder} />
				</div>
			</section>
			<section className={"flex items-center gap-x-2 mb-4"}>
				<FolderIcon className={"w-8 h-8"} />
				<h1 className={"h2 bold"}>{folder.title}</h1>
			</section>
			<section className={"flex flex-col gap-y-4 mb-4"}>
				{folder.modules.map((module) => (
					<ModuleContextMenu {...module} key={module.id} />
				))}
			</section>
			<Link href={`/module/create/${folder.id}`}>
				<Button variant={"primary"} className={"max-w-[20rem] h3 mx-auto"}>
					Добавить модуль
				</Button>
			</Link>
		</main>
	)
}

function FolderPage(props: WithId) {
	const { data, isLoading } = useFetchFolder(props.id)
	return <LoadingDataRenderer<FolderType> Comp={Folder} data={data} isLoading={isLoading} />
}

export default function FolderWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<FolderType> getData={() => getFolder(params.id)} queryKeys={[folderQueryKey, params.id]}>
			<FolderPage id={params.id} />
		</DataHydration>
	)
}
