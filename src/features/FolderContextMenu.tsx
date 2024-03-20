"use client"
import React from "react"
import { FolderType } from "~/app/models"
import { useRouter } from "next/navigation"
import { useTranslations } from "~/app/i18n"
import { useQueryClient } from "@tanstack/react-query"
import { ActionBtn, CreateEditFolder } from "~/entites"
import {
	AdjustIcon,
	Button,
	EllipsisIcon,
	folderQueryKey,
	foldersQueryKey,
	homeDataKey,
	Popover,
	TrashIcon,
	useDeleteFolderMutation,
	useUpdateFolderMutation,
} from "~/shared"

type FolderSettingsMenuProps = {
	folder: FolderType
}

export function FolderContextMenu(props: FolderSettingsMenuProps) {
	const t = useTranslations()
	const { folder } = props
	const queryClient = useQueryClient()
	const router = useRouter()
	const [showPopover, setShowPopover] = React.useState(false)

	function closePopover() {
		setShowPopover(false)
	}

	async function invalidateQueries() {
		return Promise.all([
			queryClient.invalidateQueries({ queryKey: [homeDataKey] }),
			queryClient.invalidateQueries({ queryKey: [foldersQueryKey] }),
			queryClient.invalidateQueries({ queryKey: [folderQueryKey, folder.id] }),
		])
	}
	const updateFolder = useUpdateFolderMutation({
		onSuccess: invalidateQueries,
	})

	const deleteFolder = useDeleteFolderMutation({
		onSuccess: async () => {
			await invalidateQueries()
			router.push("/")
		},
	})

	function handleUpdateFolder(folderName: string) {
		closePopover()
		if (folderName === folder.title) {
			return
		}
		updateFolder.mutate({ title: folderName, id: folder.id })
	}

	function handleDeleteFolder() {
		closePopover()
		deleteFolder.mutate(folder.id)
	}

	return (
		<Popover
			onOpenChange={setShowPopover}
			open={showPopover}
			trigger={
				<Button variant={"secondary"} className={"max-w-[3rem] h2"}>
					<EllipsisIcon />
				</Button>
			}
			className={"min-w-[10rem] flex-center flex-col gap-y-2"}
		>
			<CreateEditFolder
				trigger={
					<ActionBtn loading={updateFolder.isPending} className={"h4"}>
						<span className={"mr-2"}>
							<AdjustIcon />
						</span>
						<span>{t("Features.edit")}</span>
					</ActionBtn>
				}
				onSubmit={handleUpdateFolder}
				folder={folder}
				title={t("Features.editFolder")}
			/>
			<ActionBtn
				loading={deleteFolder.isPending}
				disabled={deleteFolder.isSuccess}
				onClick={handleDeleteFolder}
				className={"h4 justify-start"}
				variant={"danger"}
			>
				<span className={"mr-2"}>
					<TrashIcon />
				</span>
				<span>{t("Features.delete")}</span>
			</ActionBtn>
		</Popover>
	)
}
