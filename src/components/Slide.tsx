"use client"
import React from "react"

type SlideProps = {
	slide: string | number
}

export const Slide = (props: SlideProps) => {
	const { slide } = props
	return <div className={"card"}>{slide}</div>
}
