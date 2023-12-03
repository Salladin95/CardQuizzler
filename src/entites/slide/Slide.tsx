"use client"
import React from "react"

export type SlideProps = {
	id: string
	slide: string | number
}

export const Slide = (props: SlideProps) => {
	const { slide } = props
	return <div className={"min-w-full h-[600px] bg-green-300 relative"}>{slide}</div>
}
