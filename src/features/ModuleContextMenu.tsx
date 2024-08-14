"use client"
import React from "react"
import Link from "next/link"
import { ActionBtn } from "~/entites"
import { ModuleType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { useSessionStorage } from "react-use"
import { useQueryClient } from "@tanstack/react-query"
import {
	AdjustIcon,
	BookOpenIcon,
	Button,
	cn,
	CopyIcon,
	generateLink,
	homeDataKey,
	Input,
	moduleQueryKey,
	modulesQueryKey,
	MotionToggleButton,
	Popover,
	TrashIcon,
	useCopyModuleMutation,
	useDeleteModuleMutation,
	useProfile,
	useStoredSwiperState,
	useToast,
} from "~/shared"

export function ModuleContextMenu(props: ModuleType) {
	const t = useTranslations()
	const { id, userID } = props
	const [showPopover, setShowPopover] = React.useState(false)

	const toast = useToast()
	const queryClient = useQueryClient()

	const { data: profile } = useProfile()

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

	const copyModule = useCopyModuleMutation({
		onSuccess: () => {
			toast({
				variant: "primary",
				title: t("Generics.success"),
				description: t("Features.messages.copyModuleSuccess"),
			})
			queryClient.invalidateQueries({ queryKey: [homeDataKey] })
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey] })
		},
	})

	const [modulePassword] = useSessionStorage(id, "")

	function handleDeleteModule() {
		deleteModule.mutate(id)
		setShowPopover(false)
	}

	function handleCopyModule() {
		copyModule.mutate({ id, password: modulePassword })
	}

	const [showShareDialog, setShowShareDialog] = React.useState(false)

	const link = generateLink(props, userID) || ""

	const [isCopied, setIsCopied] = React.useState(false)

	return (
		<Popover
			side={"top"}
			trigger={<MotionToggleButton isOpen={showPopover} toggle={() => setShowPopover(!showPopover)} />}
			open={showPopover}
			onOpenChange={setShowPopover}
			className={"min-w-[20rem] flex-center flex-col gap-y-2"}
		>
			<Button className={"justify-start"} asChild>
				<Link href={`/module/${id}`}>
					<span className={"mr-2"}>
						<BookOpenIcon />
					</span>
					<span>{t("Features.studyModule")}</span>
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
			{profile?.id === userID && (
				// <Dialog
				// 	trigger={
				// 		<Button className={"justify-start"} asChild>
				// 			<span className={"mr-2"}>
				// 				<ShareIcon />
				// 			</span>
				// 			<span>{t("Features.share")}</span>
				// 		</Button>
				// 	}
				// 	open={showShareDialog}
				// 	onOpenChange={setShowShareDialog}
				// >
				<Input
					readOnly
					value={link}
					className={cn("text-primary", { "cursor-default": isCopied })}
					suffix={
						<Button
							onClick={async () => {
								await navigator.clipboard.writeText(link)
								setIsCopied(true)
							}}
							className={cn("text-white p-0 w-[2rem] h-[2rem]", { "pointer-events-none opacity-70": isCopied })}
						>
							<CopyIcon className={""} />
						</Button>
					}
				/>
				// 	</Dialog>
			)}

			{profile?.id === userID && (
				<ActionBtn className={"justify-start"} loading={copyModule.isPending} onClick={handleCopyModule}>
					<span className={"mr-2"}>
						<CopyIcon />
					</span>
					<span>{t("Features.copy")}</span>
				</ActionBtn>
			)}
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
