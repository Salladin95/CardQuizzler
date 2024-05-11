import React from "react"
import { cn } from "~/shared/lib"
import { RotateByAxis } from "~/shared"
import { PropsWithClassName } from "~/app/types"

type FlippableContentProps = PropsWithClassName & {
	onClick?: () => void
	frontSideContent: React.ReactNode
	backSideContent: React.ReactNode
	rotateByAxis: RotateByAxis
	render?: () => React.ReactNode
}

export function FlippableContent(props: FlippableContentProps) {
	const { frontSideContent, backSideContent, className, rotateByAxis, render } = props
	const transform = rotateByAxis === RotateByAxis.X ? "rotateX(180deg)" : "rotateY(180deg)"
	return (
		<>
			<div className={cn("w-[100%] h-[100%] absolute backface-hidden px-6", className)}>{frontSideContent}</div>
			<div
				className={cn("w-[100%] h-[100%] absolute backface-hidden px-6", className)}
				style={{
					transform,
				}}
			>
				{backSideContent}
			</div>
		</>
	)
}
