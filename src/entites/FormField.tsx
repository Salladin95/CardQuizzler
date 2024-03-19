import React from "react"
import { cn } from "~/shared/lib"
import { PropsWithChildren, PropsWithClassName } from "~/app/types"

type FormFieldProps = {
	error?: string
} & PropsWithChildren &
	PropsWithClassName

type FormFieldWithLabelProps = {
	id: string
	label: string
} & PropsWithChildren &
	PropsWithClassName &
	FormFieldProps

export function FormFieldWithLabel(props: FormFieldWithLabelProps) {
	const { id, label, children, error, className } = props
	return (
		<div className={cn("relative text-primary", className, { "text-red-400": Boolean(error) })}>
			{label && (
				<label className={"cursor-pointer inline-block mb-2"} htmlFor={id}>
					{label}
				</label>
			)}
			{children}
			{error && <span className={"absolute right-0 -bottom-6"}>{error}</span>}
		</div>
	)
}

export function FormField(props: FormFieldProps) {
	const { children, error, className } = props
	return (
		<div className={cn({ "text-red-400": Boolean(error) }, "relative", className)}>
			{children}
			{error && <span className={"absolute right-0 -bottom-6"}>{error}</span>}
		</div>
	)
}
