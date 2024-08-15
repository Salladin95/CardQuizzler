"use client"
import React from "react"
import Link from "next/link"

import { cn } from "~/shared/lib"
import { PropsWithClassName } from "~/app/types"

export function Logo(props: PropsWithClassName) {
	return (
		<Link href={"/"} className={cn("logo", props.className)}>
			CardQuizzler
		</Link>
	)
}
