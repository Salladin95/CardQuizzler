"use client"
import React from "react"
import Link from "next/link"
import { useTranslations } from "~/app/i18n"
import { useQueryClient } from "@tanstack/react-query"
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
	useStoredSwiperState,
	useToast,
} from "~/shared"

export function ModuleContextMenu(props: ModuleProps) {
	const t = useTranslations()
	const { id } = props
	const [showPopover, setShowPopover] = React.useState(false)

	const toast = useToast()
	const queryClient = useQueryClient()

	const [_v, _s, removeStoredProgress] = useStoredSwiperState(props.id)
	const deleteModule = useDeleteModuleMutation({
		onSuccess: () => {
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("Features.messages.deleteModuleSuccess"),
			})
			queryClient.invalidateQueries({ queryKey: [homeDataKey] })
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey] })
			queryClient.invalidateQueries({ queryKey: [moduleQueryKey, id] })
			removeStoredProgress()
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
			className={"min-w-[20rem] flex-center flex-col gap-y-2"}
		>
			<Button disabled={!props?.terms.length} className={"justify-start"} asChild>
				<Link href={`/module/${id}`}>
					<span className={"mr-2"}>
						<ArrowsPointingOutIcon />
					</span>
					<span>{t("Features.open")}</span>
				</Link>
			</Button>
			<Button className={"justify-start"} asChild>
				<Link href={`/module/edit/${id}`}>
					<span className={"mr-2"}>
						<AdjustIcon />
					</span>
					<span>{t("Features.edit")}</span>
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
				<span>{t("Features.delete")}</span>
			</ActionBtn>
		</Popover>
	)
}
