"use client"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { focusFirstDiv } from "src/lib"
import { CheckIcon } from "../icons"

export const checkboxVariants = cva("checkbox", {
	variants: {
		variant: {
			primary: ["checkbox-primary"],
			outlined: ["checkbox-outlined"],
			option: ["checkbox-option"],
			circle: ["checkbox-circle"],
		},
		size: {
			default: "checkbox-size-default",
			option: ["checkbox-size-option"],
			circle: ["checkbox-size-circle"],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type CheckboxVariant = VariantProps<typeof checkboxVariants>
export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	/**
	 * Variant: [primary, outlined]
	 * */
	variant?: CheckboxVariant["variant"]
	/**
	 * Variant: [primary]
	 * */
	size?: CheckboxVariant["size"]
	/**
	 * Label: {string}
	 */
	label?: React.ReactNode
	/**
	 * Applies error styles
	 * */
	error?: boolean
	/**
	 * Label: {string}
	 */
	checkIcon?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const { label, variant, className, size, tabIndex = 0, error, checkIcon, ...rest } = props
	return (
		<label className={checkboxVariants({ variant, size, className })} data-error={error} onClick={focusFirstDiv}>
			<input
				aria-invalid={error}
				className={"peer w-0 h-0 opacity-0 pointer-events-none"}
				ref={ref}
				tabIndex={-1}
				type="checkbox"
				{...rest}
			/>
			<div className="checkbox-input peer-checked:checkbox-input-checked" tabIndex={tabIndex}>
				{checkIcon || <CheckIcon className="checkbox-icon" />}
			</div>
			{label && <span className="checkbox-label">{label}</span>}
		</label>
	)
})

Checkbox.displayName = "Checkbox"
