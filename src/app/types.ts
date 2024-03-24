import React from "react"
import { useAnimate } from "framer-motion"

export type WithId = { id: string }
export type WithParamsId = { params: WithId }
export type PropsWithClassName = { className?: string }
export type SvgDefaultProps = React.HTMLAttributes<SVGElement> & { viewBox?: string }
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

export type ApiResponse<T> = {
	detail: T
}

export type ApiValidationError = {
	input: null
	/**
	 * Path to field with error
	 * */
	loc: string[]
	/**
	 * Error message
	 * */
	msg: string
	/**
	 * Error type
	 * */
	type: string
}

export type ApiValidationResponse = ApiResponse<ApiValidationError[]>
export type ApiResponseError = string
export type ApiCommonResponse = ApiResponse<ApiResponseError>
export type Animate = ReturnType<typeof useAnimate>[1]
