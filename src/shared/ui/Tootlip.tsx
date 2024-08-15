"use client"

import React from "react"
import { Popover, PopoverProps } from "./Popover"
import { cva, VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

const tooltipVariants = cva("tooltip", {
	variants: {
		variant: {
			primary: ["tooltip-primary"],
		},
		size: {
			default: ["tooltip-size-default"],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

type TooltipContentVariant = VariantProps<typeof tooltipVariants>
export type TooltipProps = Omit<PopoverProps, "variant" | "size"> & {
	/**
	 * Variant: [primary]
	 * */
	variant?: TooltipContentVariant["variant"]
	/**
	 * Size: [primary]
	 * */
	size?: TooltipContentVariant["size"]
}
export const Tooltip = (props: TooltipProps) => {
	const { className, trigger, children, variant, size, ...rest } = props

	const timerRef = React.useRef<any>()
	React.useEffect(() => {
		return () => {
			clearTimeout(timerRef.current)
		}
	}, [])

	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		clearTimeout(timerRef.current)
		setOpen(true)
	}

	const handleClose = () => {
		clearTimeout(timerRef.current)
		timerRef.current = setTimeout(() => {
			setOpen(false)
			clearTimeout(timerRef.current)
		}, 300)
	}

	return (
		<Popover
			className={tooltipVariants({ variant, size, className })}
			onMouseEnter={handleOpen}
			onMouseLeave={handleClose}
			onOpenChange={setOpen}
			open={open}
			size={"none"}
			trigger={
				<Slot onMouseEnter={handleOpen} onMouseLeave={handleClose}>
					{trigger}
				</Slot>
			}
			variant={"none"}
			{...rest}
		>
			{children}
		</Popover>
	)
}
