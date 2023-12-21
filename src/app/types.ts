import React from "react"

export type WithId = { id: string }
export type PropsWithClassName = { className?: string }
export type DefaultSvgProps = React.HTMLAttributes<SVGElement>
export type SelectOption<V = string> = {
	label: string
	value: V
}
