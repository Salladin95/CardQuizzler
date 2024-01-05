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
	const createFolder = useCreateFolderMutation({ onSuccess: () => queryClient.invalidateQueries([foldersQueryKey]) })

	async function handleFolderCreation(folderName: string) {
		closePopover()
		const folder = await createFolder.mutateAsync(folderName)
		router.push(`/folder/${folder.id}`)
	}

	return (
		<Popover
			onOpenChange={setShowPopover}
			open={showPopover}
			side={"top"}
			trigger={<Button>Создать</Button>}
			className={""}
		>
			<Button className={"mb-4"} variant={"secondary"} onClick={closePopover}>
				<Link href={"/module/create"}>Создать модуль</Link>
			</Button>
			<CreateEditFolder onSubmit={handleFolderCreation} />
		</Popover>
	)
}
