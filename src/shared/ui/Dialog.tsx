"use client"

import React from "react"
import * as Framer from "framer-motion"
import * as RadixDialog from "@radix-ui/react-dialog"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/lib"

const dialogVariants = cva("dialog", {
	variants: {
		variant: {
			primary: ["dialog-primary"],
		},
	},
	compoundVariants: [],
	defaultVariants: {
		variant: "primary",
	},
})

type DialogVariant = VariantProps<typeof dialogVariants>

export type DialogProps = RadixDialog.DialogContentProps & {
	trigger?: React.ReactNode
	children: React.ReactNode
	variant?: DialogVariant["variant"]
	open?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	onOverlayClick?: () => void
}
export const Dialog = (props: DialogProps) => {
	const {
		className,
		trigger,
		children,
		variant,
		open: propsOpen,
		defaultOpen,
		onOpenChange,
		onOverlayClick,
		...rest
	} = props
	const [open, setOpen] = React.useState(false)
	React.useEffect(() => setOpen(Boolean(propsOpen)), [propsOpen])
	React.useEffect(() => onOpenChange && onOpenChange(open), [onOpenChange, open])

	return (
		<RadixDialog.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open}>
			{trigger && (
				<RadixDialog.Trigger asChild onClick={() => setOpen(true)}>
					{trigger}
				</RadixDialog.Trigger>
			)}

			<RadixDialog.Portal>
				<RadixDialog.Overlay className={"dialog-overlay"} onClick={onOverlayClick} />
				<RadixDialog.Content {...rest} asChild>
					<Framer.motion.div
						// Suspend element from removing by animation. Check tailwind.config.js keyframes
						// https://www.radix-ui.com/primitives/docs/guides/animation
						animate={open ? "animate" : "exit"}
						className={cn(dialogVariants({ variant, className }))}
						// y and x for center position
						initial={{ opacity: 0, scale: 0, y: "-50%", x: "-50%" }}
						transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
						variants={{
							animate: { opacity: 1, scale: 1, y: "-50%", x: "-50%" },
							exit: { opacity: 0, scale: 0, y: "-50%", x: "-50%" },
						}}
					>
						{children}
					</Framer.motion.div>
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}

Dialog.Close = RadixDialog.Close
