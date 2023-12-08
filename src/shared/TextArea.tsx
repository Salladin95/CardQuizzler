"use client"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"

export const textareaVariants = cva("textarea", {
	variants: {
		variant: {
			primary: ["textarea-primary"],
			outlined: ["textarea-outlined"],
		},
		size: {
			default: "textarea-size-default",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

export type TextareaVariant = VariantProps<typeof textareaVariants>

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	/**
	 * Variant: [primary]
	 * */
	variant?: TextareaVariant["variant"]
	/**
	 * Variant: [primary]
	 * */
	size?: TextareaVariant["size"]
	/**
	 * Applies styles if error from above
	 * */
	error?: boolean
	/**
	 * Label: {string}
	 */
	label?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
	const { className, variant, size, error, ...rest } = props

	return (
		<textarea
			aria-invalid={error}
			className={textareaVariants({ variant, size, className })}
			data-error={error}
			ref={ref}
			{...rest}
		/>
	)
})

Textarea.displayName = "Textarea"
