import React from "react"

export type WithId = { id: string }
export type PropsWithClassName = { className?: string }
export type SvgDefaultProps = React.HTMLAttributes<SVGElement>
export type SelectOption<V = string> = {
	label: string
	value: V
}
export type PropsWithChildren = { children?: React.ReactNode }
export type DataAttributesProps = {
	custom?: string
} & {
	[key: `data-${string}`]: unknown
}
