"use client"
import React from "react"
import { FolderType } from "~/app/models"
import { Button, Dialog, Input } from "~/shared"

type CreateFolderProps = {
	onSubmit?: (folderName: string) => void
	title?: string
	trigger?: React.ReactNode
	folder?: FolderType
}

export function CreateEditFolder(props: CreateFolderProps) {
	const { onSubmit, title, trigger, folder } = props
	const [folderName, setFolderName] = React.useState(folder?.title || "")
	const [showDialog, setShowDialog] = React.useState(false)

	// Created separated value for error, because I don't want to show input's error state on first render
	const [hasError, setHasError] = React.useState(false)

	function handleSubmit() {
		if (!folderName) {
			return
		}
		setShowDialog(false)
		onSubmit && onSubmit(folderName)
	}

	return (
		<Dialog open={showDialog} trigger={trigger} className={"w-360 640:w-428 768:w-640 h-[20rem] py-12 px-8"}>
			<div className={"relative w-full h-full"}>
				<h1 className={"mb-6 h2 640:h1 text-center"}>{title}</h1>
				<Input
					placeholder={"Введите название папки, например: 'граммитика'"}
					value={folderName}
					error={hasError}
					onChange={(e) => {
						const value = e.currentTarget.value
						setFolderName(value)
						setHasError(!value)
					}}
					className={"mb-4"}
				/>
				<Button
					className={"absolute bottom-0 right-0 w-[10rem]"}
					variant={"primary"}
					onClick={handleSubmit}
					// For "disabled" state I don't use "hasError" value because I want to disable it for the first render
					disabled={!folderName}
				>
					Сохранить
				</Button>
			</div>
		</Dialog>
	)
}
