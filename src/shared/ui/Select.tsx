"use client"

import React from "react"
import { cn } from "~/shared/lib"
import * as RadixSelect from "@radix-ui/react-select"
import * as Framer from "framer-motion"
import { cva, VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDown } from "./icons"
import { ScrollArea } from "./ScrollArea"
import { fade } from "~/shared/lib/animations"

export const selectVariants = cva("select", {
	variants: {
		variant: {
			primary: ["select-primary"],
		},
		size: {
			default: ["select-size-default"],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type SelectVariant = VariantProps<typeof selectVariants>
export type SelectOption<V = string> = {
	label: string
	value: V
}

export type SelectProps = Omit<RadixSelect.SelectContentProps, "children" | "onChange"> & {
	className?: string
	options: SelectOption<string | number | symbol>[]
	variant?: SelectVariant["variant"]
	size?: SelectVariant["size"]
	placeholder?: string
	arrowIcon?: React.ReactNode
	// Root props
	open?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	value?: string
	defaultValue?: string
	// Field props
	name?: string
	onChange?: (value: string) => void
	onBlur?: React.FocusEventHandler<HTMLButtonElement>
	error?: boolean
	disabled?: boolean
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
	const {
		className,
		options,
		variant,
		size,
		placeholder = "Select an option...",
		error,
		arrowIcon,
		disabled = false,
		dir,
		onChange,
		...rest
	} = props

	/* Exit animation doesn't work */
	const animation = fade[props.side || "bottom"]

	/* Wrap everything in div so styles are applied correctly and elements are nested inside .select */

	function handleChange(v: string) {
		onChange && onChange(v)
	}

	return (
		<div className={selectVariants({ variant, size })} data-disabled={Boolean(disabled)} data-error={error}>
			<RadixSelect.Root {...rest} onValueChange={handleChange}>
				<RadixSelect.Trigger className={"select-trigger"} disabled={Boolean(disabled)}>
					<RadixSelect.Value className={"select-trigger-value"} placeholder={placeholder} />
					<RadixSelect.Icon asChild className={"select-trigger-arrow"}>
						{arrowIcon || <ChevronDown />}
					</RadixSelect.Icon>
				</RadixSelect.Trigger>
				{/* No portal to have styles nesting and working for variants and sizes */}
				<RadixSelect.Content asChild position={"popper"} sideOffset={4}>
					<Framer.motion.div className={cn("select-content", className)} {...animation}>
						<RadixSelect.Viewport asChild>
							<ScrollArea>
								{options.map((option) => {
									const { label, value } = option
									return (
										<SelectItem key={value.toString()} value={value as string}>
											{label}
										</SelectItem>
									)
								})}
							</ScrollArea>
						</RadixSelect.Viewport>
					</Framer.motion.div>
				</RadixSelect.Content>
			</RadixSelect.Root>
		</div>
	)
})

export const SelectItem = React.forwardRef<
	HTMLDivElement,
	{ checkIcon?: React.ReactNode } & RadixSelect.SelectItemProps
>((props, ref) => {
	const { checkIcon, children, className, ...rest } = props
	return (
		<RadixSelect.Item className={cn(className, "select-item")} {...rest} ref={ref} tabIndex={0}>
			<RadixSelect.ItemText className={"select-item-text"}>{children}</RadixSelect.ItemText>
			<RadixSelect.ItemIndicator className="select-item-indicator">
				{checkIcon || <CheckIcon />}
			</RadixSelect.ItemIndicator>
		</RadixSelect.Item>
	)
})
