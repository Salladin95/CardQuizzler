"use client"
import React from "react"
import Link from "next/link"
import { WithId } from "~/app/types"
import { hasFolderTheModule } from "./utils"
import { useTranslations } from "~/app/i18n"
import { FolderType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { FolderContextMenu } from "~/features"
import {
	AddIcon,
	Button,
	Dialog,
	FolderIcon,
	folderQueryKey,
	LoadingDataRenderer,
	TrashIcon,
	useAddModuleToFolderMutation,
	useDeleteModuleFromFolderMutation,
	useFetchFolder,
	useFetchUserModules,
	useProtectedModuleCtx,
	XMarkIcon,
} from "~/shared"
import { Module } from "~/entites"
import { useRouter } from "next/navigation"

type FolderProps = {
	folder?: FolderType
}

function Folder(props: FolderProps) {
	const t = useTranslations()
	const { folder } = props
	const [showDialog, setShowDialog] = React.useState(false)
	const queryClient = useQueryClient()

	const { data: userModules } = useFetchUserModules()

	const addModuleToFolder = useAddModuleToFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [folderQueryKey, folder?.id] }),
	})
	const deleteModuleFromFolder = useDeleteModuleFromFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [folderQueryKey, folder?.id] }),
	})

	function ActionButton(props: { id: string }) {
		const { id } = props
		if (!folder) return null
		const hasModule = hasFolderTheModule(folder, id)

		function handleActionButtonClick(moduleId: string) {
			if (!folder) return
			if (hasModule) {
				return deleteModuleFromFolder.mutate({ moduleId, folderId: folder.id })
			}
			return addModuleToFolder.mutate({ moduleId, folderId: folder.id })
		}

		return (
			<Button className={"w-min"} variant={"secondary"} onClick={() => handleActionButtonClick(id)}>
				{hasModule ? <TrashIcon /> : <AddIcon />}
			</Button>
		)
	}

	const router = useRouter()

	if (!folder) return null

	return (
		<main className={"container"}>
			<section className={"mb-4 flex items-center justify-between"}>
				<p className={"h4"}>{t("Folder.numberOfModules", { number: folder.modules.length })}</p>
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
					<Module onClick={() => router.push(`/module-preview/${module.id}`)} {...module} key={module.id} />
				))}
			</section>
			<Button onClick={() => setShowDialog(true)} variant={"primary"} className={"max-w-[20rem] h3 mx-auto"}>
				{t("Features.addModule")}
			</Button>
			<Dialog
				open={showDialog}
				onOpenChange={setShowDialog}
				className={"w-360 640:w-428 1024:w-768 overflow-y-scroll h-[90vh] p-0 rounded-none"}
			>
				<div className={"flex justify-between items-center mb-8 bg-gray-800 text-white px-4 py-6"}>
					<h1 className={"h2"}>{t("Features.addModule")}</h1>
					<Button variant={"gray"} className={"w-min"} onClick={() => setShowDialog(false)}>
						<XMarkIcon />
					</Button>
				</div>

				<Button asChild variant={"secondary"} className={"h3 mb-4 mx-auto w-[90%]"}>
					<Link href={`/module/create/${folder.id}`}>{t("Features.createNewModule")}</Link>
				</Button>

				<section className={"flex flex-col gap-y-2 px-6 py-8 "}>
					{userModules?.map((module) => (
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

export function FolderPage(props: WithId) {
	const protectedByPasswordCtx = useProtectedModuleCtx()
	const {
		error,
		data: folder,
		isPending: isFolderPending,
	} = useFetchFolder(
		{
			id: props.id,
			password: protectedByPasswordCtx?.password,
		},
		{ enabled: Boolean(props.id) },
	)

	React.useEffect(() => {
		if (!protectedByPasswordCtx) return
		if (error?.response?.status === 403) {
			protectedByPasswordCtx.updatePassword("")
		}
	}, [error, protectedByPasswordCtx])

	return <LoadingDataRenderer<FolderProps> Comp={Folder} data={{ folder: folder }} isLoading={isFolderPending} />
}
