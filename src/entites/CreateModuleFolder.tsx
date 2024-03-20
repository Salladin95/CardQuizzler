"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "~/app/i18n"
import { CreateEditFolder } from "./CreateEditFolder"
import { useQueryClient } from "@tanstack/react-query"
import { Button, foldersQueryKey, Popover, useCreateFolderMutation } from "~/shared"

export function CreateModuleFolder() {
	const router = useRouter()
	const [showPopover, setShowPopover] = React.useState(false)
	const t = useTranslations("Features")

	function closePopover() {
		setShowPopover(false)
	}

	const queryClient = useQueryClient()
	const createFolder = useCreateFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [foldersQueryKey] }),
	})

	async function handleFolderCreation(folderName: string) {
		const folder = await createFolder.mutateAsync({ title: folderName })
		router.push(`/folder/${folder.id}`)
	}

	return (
		<Popover onOpenChange={setShowPopover} open={showPopover} side={"top"} trigger={<Button>{t("create")}</Button>}>
			<div className={"px-4 py-2"}>
				<Button className={"mb-4"} variant={"secondary"} onClick={closePopover}>
					<Link href={"/module/create"}>{t("createModule")}</Link>
				</Button>
				<CreateEditFolder
					trigger={<Button variant={"secondary"}>{t("createFolder")}</Button>}
					title={t("createNewFolder")}
					onSubmit={handleFolderCreation}
					hasSubmitted={Boolean(createFolder.submittedAt)}
				/>
			</div>
		</Popover>
	)
}
