"use client"
import React from "react"
import { FolderType } from "~/app/models"
import { CreateEditFolder } from "~/entites/createEditFolder"
import { AdjustIcon, Button, EllipsisIcon, Popover, TrashIcon } from "~/shared"

type UpdateProps = {
	folder: FolderType
}

export function FolderSettingsMenu(props: UpdateProps) {
	const { folder } = props
	const [showPopover, setShowPopover] = React.useState(false)

	function closePopover() {
		setShowPopover(false)
	}

	function editFolder(folderName: string) {
		if (folderName === folder.title) {
			console.log("FOLDER TITLE HASN'T UPDATED")
			return
		}
		console.log("UPDATING FOLDER")
		closePopover()
		// TODO: PUT LOGIC HERE
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
				onSubmit={editFolder}
				folder={folder}
				title={"Изменить папку"}
			/>
			<Button onClick={closePopover} className={"h4 justify-start"}>
				<span className={"mr-2"}>
					<TrashIcon />
				</span>
				<span>Удалить</span>
			</Button>
		</Popover>
	)
}
