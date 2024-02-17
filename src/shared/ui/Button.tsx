"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/shared/lib"

const buttonVariants = cva("btn", {
	variants: {
		variant: {
			primary: ["btn-primary"],
			secondary: ["btn-secondary"],
			danger: ["btn-danger"],
			gray: ["btn-gray"],
			inline: ["btn-inline"],
			nav: ["btn-nav"],
			none: [],
		},
		size: {
			default: ["btn-size-default"],
			inline: ["btn-size-inline"],
			"round-sm": ["btn-size-round-sm"],
			none: [],
		},
	},
	compoundVariants: [],
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

type ButtonVariant = VariantProps<typeof buttonVariants>
export type ButtonProps = {
	/* Strange error with i18n */
	children: React.ReactNode
	/**
	 * see @radix-ui/react-slot
	 * */
	asChild?: boolean
	/**
	 * Variant: [primary, secondary, gray, inline, nav, none]
	 * */
	variant?: ButtonVariant["variant"]
	/**
	 * Size: [primary, inline, round-sm, none]
	 * */
	size?: ButtonVariant["size"]
	/**
	 * Like disable
	 * */
	loading?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className, variant, size, loading, disabled, asChild, ...rest } = props
	const isDisabled = loading || disabled

	const Comp = asChild ? Slot : "button"
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={isDisabled}
			ref={ref}
			type={"button"}
			{...rest}
		/>
	)
})
