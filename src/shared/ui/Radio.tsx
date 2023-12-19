"use client"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { focusFirstDiv } from "~/lib"

export const radioVariants = cva("radio", {
	variants: {
		variant: {
			primary: ["radio-primary"],
			outlined: ["radio-outlined"],
			option: ["radio-option"],
		},
		size: {
			default: "radio-size-default",
			option: "radio-size-option",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type RadioVariant = VariantProps<typeof radioVariants>

export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	/**
	 * Variant: [primary, outlined, option]
	 * */
	variant?: RadioVariant["variant"]
	/**
	 * Variant: [primary, option]
	 * */
	size?: RadioVariant["size"]
	/**
	 * Label: {string}
	 */
	label?: string
	/**
	 * Applies error styles
	 * */
	error?: boolean
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	const { label, variant, className, size, tabIndex = 0, error, ...rest } = props

	return (
		<label className={radioVariants({ variant, size, className })} data-error={error} onClick={focusFirstDiv}>
			<input
				aria-invalid={error}
				className={"peer w-0 h-0 opacity-0 pointer-events-none"}
				ref={ref}
				tabIndex={-1}
				type="radio"
				{...rest}
			/>
			<div className="radio-input peer-checked:radio-input-checked" tabIndex={tabIndex} />
			{label && <span className="radio-label">{label}</span>}
		</label>
	)
})

Radio.displayName = "Radio"
