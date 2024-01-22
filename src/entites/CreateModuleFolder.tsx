"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Popover } from "~/shared"
import { CreateEditFolder } from "./CreateEditFolder"
import { foldersQueryKey, useCreateFolderMutation } from "~/api"
import { useQueryClient } from "@tanstack/react-query"

export function CreateModuleFolder() {
	const router = useRouter()
	const [showPopover, setShowPopover] = React.useState(false)

	function closePopover() {
		setShowPopover(false)
	}

	const queryClient = useQueryClient()
	const createFolder = useCreateFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [foldersQueryKey] }),
	})

	async function handleFolderCreation(folderName: string) {
		const folder = await createFolder.mutateAsync(folderName)
		router.push(`/folder/${folder.id}`)
	}

	return (
		<Popover onOpenChange={setShowPopover} open={showPopover} side={"top"} trigger={<Button>Создать</Button>}>
			<div className={"px-4 py-2"}>
				<Button className={"mb-4"} variant={"secondary"} onClick={closePopover}>
					<Link href={"/module/create"}>Создать модуль</Link>
				</Button>
				<CreateEditFolder
					trigger={<Button variant={"secondary"}>Создать папку</Button>}
					title={"Создать новую папку"}
					onSubmit={handleFolderCreation}
				/>
			</div>
		</Popover>
	)
}
