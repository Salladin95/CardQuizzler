import React from "react"
import { cn } from "~/lib"
import { FieldError } from "react-hook-form"
import { PropsWithChildren, PropsWithClassName } from "~/app/types"

type FormFieldProps = {
	error?: FieldError
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
		<div className={cn({ "text-red-400": Boolean(error) }, "relative", className)}>
			{label && (
				<label className={"cursor-pointer inline-block mb-2"} htmlFor={id}>
					{label}
				</label>
			)}
			{children}
			{error && <span className={"absolute right-0 -bottom-6"}>{error?.message}</span>}
		</div>
	)
}

export function FormField(props: FormFieldProps) {
	const { children, error, className } = props
	return (
		<div className={cn({ "text-red-400": Boolean(error) }, "relative", className)}>
			{children}
			{error && <span className={"absolute right-0 -bottom-6"}>{error?.message}</span>}
		</div>
	)
}
