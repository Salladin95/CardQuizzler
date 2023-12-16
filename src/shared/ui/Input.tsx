"use client"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { focusFirstInput } from "../../utils"

const inputVariants = cva("input", {
	variants: {
		variant: {
			primary: ["input-primary"],
			secondary: ["input-secondary"],
			none: [],
		},
		size: {
			default: ["input-size-default"],
			none: [],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type InputVariant = VariantProps<typeof inputVariants>
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> & {
	/**
	 * Goes before input
	 * prefix: {ReactNode}
	 * */
	prefix?: React.ReactNode
	/**
	 * Goes after input
	 * Suffix: {ReactNode}
	 * */
	suffix?: React.ReactNode
	/**
	 * Variant: [primary, secondary, none]
	 * */
	variant?: InputVariant["variant"]
	/**
	 * Size: [default, none]
	 * */
	size?: InputVariant["size"]
	/**
	 * Applies error styles
	 * */
	error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { id, variant, size, className, prefix, suffix, error, ...rest } = props
	return (
		<div
			className={inputVariants({
				variant,
				size,
				className,
			})}
			data-error={error}
			onClick={focusFirstInput}
		>
			{prefix && <Slot className={"input-slot"}>{prefix}</Slot>}
			<input aria-invalid={error} autoComplete="off" className={"input__input"} id={id} ref={ref} {...rest} />
			{suffix && <Slot className={"input-slot"}>{suffix}</Slot>}
		</div>
	)
})
