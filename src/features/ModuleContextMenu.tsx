"use client"
import React from "react"
import Link from "next/link"
import { ActionBtn, Module, ModuleProps } from "~/entites"
import {
	AdjustIcon,
	ArrowsPointingOutIcon,
	Button,
	homeDataKey,
	moduleQueryKey,
	modulesQueryKey,
	Popover,
	TrashIcon,
	useDeleteModuleMutation,
	useToast,
} from "~/shared"
import { useQueryClient } from "@tanstack/react-query"

export function ModuleContextMenu(props: ModuleProps) {
	const { id } = props
	const [showPopover, setShowPopover] = React.useState(false)

	const toast = useToast()
	const queryClient = useQueryClient()

	const deleteModule = useDeleteModuleMutation({
		onSuccess: () => {
			toast({ variant: "primary", title: "Success", description: "Module has been deleted" })
			queryClient.invalidateQueries({ queryKey: [homeDataKey] })
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey] })
			queryClient.invalidateQueries({ queryKey: [moduleQueryKey, id] })
		},
	})

	function handleDeleteModule() {
		deleteModule.mutate(id)
		setShowPopover(false)
	}

	return (
		<Popover
			side={"top"}
			trigger={
				<div>
					<Module {...props} />
				</div>
			}
			open={showPopover}
			onOpenChange={setShowPopover}
			className={"min-w-[10rem] flex-center flex-col gap-y-2"}
		>
			<Button disabled={!props?.terms.length} className={"justify-start"} asChild>
				<Link href={`/module/${id}`}>
					<span className={"mr-2"}>
						<ArrowsPointingOutIcon />
					</span>
					<span>Открыть</span>
				</Link>
			</Button>
			<Button className={"justify-start"} asChild>
				<Link href={`/module/edit/${id}`}>
					<span className={"mr-2"}>
						<AdjustIcon />
					</span>
					<span>Редактировать</span>
				</Link>
			</Button>
			{/*TODO: EXTRACT TO SEPARATE FUNCTION ADD CONFIRM MODULE*/}
			<ActionBtn
				disabled={deleteModule.isSuccess}
				loading={deleteModule.isPending}
				onClick={handleDeleteModule}
				variant={"danger"}
				className={"justify-start"}
			>
				<span className={"mr-2"}>
					<TrashIcon />
				</span>
				<span>Удалить</span>
			</ActionBtn>
		</Popover>
	)
}
