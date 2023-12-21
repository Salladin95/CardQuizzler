"use client"

import React from "react"
import * as Framer from "framer-motion"
import * as RadixPopover from "@radix-ui/react-popover"
import { cva, VariantProps } from "class-variance-authority"
import { fade } from "~/shared/lib/animations"
import { cn } from "~/lib"

const popoverVariants = cva("popover", {
	variants: {
		variant: {
			primary: ["popover-primary"],
			none: [],
		},
		size: {
			default: ["popover-size-default"],
			none: [],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type PopoverVariant = VariantProps<typeof popoverVariants>
export type PopoverProps = RadixPopover.PopoverProps &
	RadixPopover.PopoverContentProps & {
		/**
		 * React node for popover trigger
		 * */
		trigger: React.ReactNode
		/**
		 * Variant: [primary]
		 */
		variant?: PopoverVariant["variant"]
		/**
		 * Size: [default]
		 */
		size?: PopoverVariant["size"]
		/**
		 * Disable exit animation
		 * */
		noExitAnimation?: boolean
		/**
		 * Anchor container
		 * */
		container?: HTMLElement
	}
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
	const {
		className,
		trigger,
		children,
		variant,
		size,
		open: propsOpen,
		onOpenChange,
		defaultOpen,
		noExitAnimation,
		container,
		...rest
	} = props

	const [open, setOpen] = React.useState(false)
	React.useEffect(() => {
		setOpen(Boolean(propsOpen))
	}, [propsOpen])

	const handleOpenChange = (open: boolean) => {
		onOpenChange ? onOpenChange(open) : setOpen(open)
	}

	const animation = fade[props.side || "bottom"]

	return (
		<RadixPopover.Root defaultOpen={defaultOpen} onOpenChange={handleOpenChange} open={open}>
			<RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
			<RadixPopover.Portal container={container}>
				<RadixPopover.Content ref={ref} side={"bottom"} sideOffset={4} {...rest} asChild>
					<Framer.motion.div
						// Suspend element from removing by animation. Check tailwind.config.js keyframes
						// https://www.radix-ui.com/primitives/docs/guides/animation
						animate={open ? "animate" : "exit"}
						className={popoverVariants({
							variant,
							size,
							className: cn(className, {
								"data-[state=closed]:animate-framer-0.3": !noExitAnimation,
							}),
						})}
						initial={animation.initial}
						transition={animation.transition}
						variants={{
							animate: animation.animate as Framer.Variant,
							exit: animation.exit as Framer.Variant,
						}}
					>
						{children}
					</Framer.motion.div>
				</RadixPopover.Content>
			</RadixPopover.Portal>
		</RadixPopover.Root>
	)
})

// Popover.Anchor = RadixPopover.Anchor
// Popover.Close = RadixPopover.Close
