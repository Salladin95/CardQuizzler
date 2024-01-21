import React from "react"
import { cn } from "~/lib"
import * as RadixTabs from "@radix-ui/react-tabs"
import { PropsWithChildren, PropsWithClassName, SvgDefaultProps } from "~/app/types"
import { LineIcon } from "./icons"

type RadixTabTriggerProps = {
	name: string
} & PropsWithClassName &
	PropsWithChildren &
	SvgDefaultProps

export function TabTrigger(props: RadixTabTriggerProps) {
	const { name, className, children, ...rest } = props
	return (
		<RadixTabs.Trigger className={cn("tab-trigger", className)} value={name}>
			{children}
			<LineIcon className={"opacity-0 w-[7.5rem] mx-auto"} {...rest} />
		</RadixTabs.Trigger>
	)
}
