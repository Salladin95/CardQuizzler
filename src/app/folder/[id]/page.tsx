"use client"
import React from "react"
import Link from "next/link"
import { FolderType } from "~/app/models"
import { getFolder } from "~/api/requests"
import { isModuleInFolder } from "~/app/folder/lib/utils"
import { WithId, WithParamsId } from "~/app/types"
import { useQueryClient } from "@tanstack/react-query"
import { FolderContextMenu, ModuleContextMenu } from "~/entites"
import { folderQueryKey, useAddModuleToFolderMutation, useFetchFolder } from "~/api"
import { AddIcon, Button, CloseIcon, DataHydration, Dialog, FolderIcon, LoadingDataRenderer, TrashIcon } from "~/shared"

function Folder(folder: FolderType) {
	const [showDialog, setShowDialog] = React.useState(false)
	const queryClient = useQueryClient()

	const addModuleToFolder = useAddModuleToFolderMutation({
		onSuccess: () => queryClient.invalidateQueries([folderQueryKey, folder.id]),
	})
	const deleteModuleFromFolder = useAddModuleToFolderMutation({
		onSuccess: () => queryClient.invalidateQueries([folderQueryKey, folder.id]),
	})

	function handleActionButtonClick(moduleId: string) {
		if (isModuleInFolder(folder, moduleId)) {
			return deleteModuleFromFolder.mutate({ moduleId, folderId: folder.id })
		}
		return addModuleToFolder.mutate({ moduleId, folderId: folder.id })
	}

	function ActionButton(props: { id: string }) {
		const { id } = props
		return (
			<Button className={"w-min"} variant={"secondary"} onClick={() => handleActionButtonClick(id)}>
				{isModuleInFolder(folder, id) ? <AddIcon /> : <TrashIcon />}
			</Button>
		)
	}

	return (
		<main className={"container"}>
			<section className={"mb-4 flex items-center justify-between"}>
				<p className={"h4"}>Всего модулей - {folder.modules.length}</p>
				<div className={"flex gap-x-2"}>
					<Button onClick={() => setShowDialog(true)} variant={"secondary"} className={"max-w-[3rem] h2"}>
						<AddIcon />
					</Button>
					<FolderContextMenu folder={folder} />
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
			<Button onClick={() => setShowDialog(true)} variant={"primary"} className={"max-w-[20rem] h3 mx-auto"}>
				Добавить модуль
			</Button>
			<Dialog
				open={showDialog}
				onOpenChange={setShowDialog}
				className={"w-360 640:w-428 1024:w-768 overflow-y-scroll h-[90vh] p-0 rounded-none"}
			>
				<div className={"flex justify-between items-center mb-8 bg-gray-800 text-white px-4 py-6"}>
					<h1 className={"h2"}>Добавить модуль</h1>
					<Button variant={"gray"} className={"w-min"} onClick={() => setShowDialog(false)}>
						<CloseIcon />
					</Button>
				</div>

				<Button asChild variant={"secondary"} className={"h3 mb-4 mx-auto w-[90%]"}>
					<Link href={`/module/create/${folder.id}`}>Создать новый модуль</Link>
				</Button>

				<section className={"flex flex-col gap-y-2 px-6 py-8 "}>
					{folder.modules.map((module) => (
						<div
							key={module.id}
							className={"flex justify-between items-center px-4 py-3 rounded bg-gray-800 text-white"}
						>
							<span>{module.title}</span>
							<ActionButton id={module.id} />
						</div>
					))}
				</section>
			</Dialog>
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
