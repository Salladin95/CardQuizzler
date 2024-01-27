import React from "react"
import { cn } from "~/lib"
import * as RadixTabs from "@radix-ui/react-tabs"
import { PropsWithChildren, PropsWithClassName, SvgDefaultProps } from "~/app/types"
import { LineIcon } from "./icons"

type RadixTabTriggerProps = {
	name: string
	isActive: boolean
} & PropsWithClassName &
	PropsWithChildren &
	SvgDefaultProps

export function TabTrigger(props: RadixTabTriggerProps) {
	const { name, className, children, isActive, ...rest } = props
	return (
		<RadixTabs.Trigger className={cn("tab-trigger relative", className)} value={name}>
			{children}
			{isActive && <LineIcon className={"w-[5rem] 428:w-[7.5rem] absolute-x-center -bottom-1"} {...rest} />}
		</RadixTabs.Trigger>
	)
}
