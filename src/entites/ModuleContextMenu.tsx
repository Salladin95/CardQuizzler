"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { Module, ModuleProps } from "./Module"
import { AdjustIcon, ArrowsPointingOutIcon, Button, Popover } from "~/shared"

export function ModuleContextMenu(props: ModuleProps) {
	const { id } = props
	const [showPopover, setShowPopover] = React.useState(false)
	const router = useRouter()

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
			<Button className={"h4"} onClick={() => router.push(`/module/edit/${id}`)}>
				<span className={"mr-2"}>
					<AdjustIcon />
				</span>
				<span>Редактировать</span>
			</Button>
			<Button className={"justify-start"} onClick={() => router.push(`/module/${id}`)}>
				<span className={"mr-2"}>
					<ArrowsPointingOutIcon />
				</span>
				<span>Открыть</span>
			</Button>
		</Popover>
	)
}
