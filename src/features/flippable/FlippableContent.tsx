import React from "react"
import { cn } from "~/utils"
import { PropsWithClassName } from "~/app/types"
import { FlippableProps } from "~/features/flippable/Flippable"

type FlippableContentProps = Pick<FlippableProps, "frontSideContent" | "backSideContent"> & PropsWithClassName

export function FlippableContent(props: FlippableContentProps) {
	const { frontSideContent, backSideContent, className } = props
	return (
		<>
			<div className={cn("w-[100%] h-[100%] absolute backface-hidden", className)}>{frontSideContent}</div>
			<div
				className={cn("w-[100%] h-[100%] absolute backface-hidden", className)}
				style={{
					transform: `rotateY(180deg)`,
				}}
			>
				{backSideContent}
			</div>
		</>
	)
}
