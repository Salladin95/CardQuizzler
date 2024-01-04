"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Popover } from "~/shared"
import { mockCreateFolder } from "~/lib/mock"
import { CreateEditFolder } from "./CreateEditFolder"

export function CreateModuleFolder() {
	const router = useRouter()
	const [showPopover, setShowPopover] = React.useState(false)

	function closePopover() {
		setShowPopover(false)
	}

	function handleFolderCreation(folderName: string) {
		console.log("CREATING FOLDER")
		closePopover()
		// TODO: REPLACE MOCK FUNCTION
		const folder = mockCreateFolder(folderName)
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
