"use client"
import React from "react"
import { Module, ModuleProps } from "./Module"
import { AdjustIcon, ArrowsPointingOutIcon, Button, Popover } from "~/shared"
import Link from "next/link"

export function ModuleContextMenu(props: ModuleProps) {
	const { id } = props
	const [showPopover, setShowPopover] = React.useState(false)

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
			<Button className={"justify-start"} asChild>
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
		</Popover>
	)
}
