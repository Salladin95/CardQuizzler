"use client"
import React from "react"
import { FolderType } from "~/app/models"
import { CreateEditFolder } from "./CreateEditFolder"
import { useQueryClient } from "@tanstack/react-query"
import {
	AdjustIcon,
	Button,
	EllipsisIcon,
	folderQueryKey,
	foldersQueryKey,
	Popover,
	TrashIcon,
	useDeleteFolderMutation,
	useUpdateFolderMutation,
} from "~/shared"

type FolderSettingsMenuProps = {
	folder: FolderType
}

export function FolderContextMenu(props: FolderSettingsMenuProps) {
	const { folder } = props
	const [showPopover, setShowPopover] = React.useState(false)

	function closePopover() {
		setShowPopover(false)
	}

	const queryClient = useQueryClient()
	const updateFolder = useUpdateFolderMutation({
		onSuccess: (folder) => queryClient.invalidateQueries({ queryKey: [foldersQueryKey, folderQueryKey, folder.id] }),
	})

	const deleteFolder = useDeleteFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [foldersQueryKey, folderQueryKey, folder.id] }),
	})

	function handleUpdateFolder(folderName: string) {
		closePopover()
		if (folderName === folder.title) {
			return
		}
		updateFolder.mutate({ folderName, id: folder.id })
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
					<Button className={"h4"}>
						<span className={"mr-2"}>
							<AdjustIcon />
						</span>
						<span>Редактировать</span>
					</Button>
				}
				onSubmit={handleUpdateFolder}
				folder={folder}
				title={"Изменить папку"}
			/>
			<Button onClick={handleDeleteFolder} className={"h4 justify-start"}>
				<span className={"mr-2"}>
					<TrashIcon />
				</span>
				<span>Удалить</span>
			</Button>
		</Popover>
	)
}
