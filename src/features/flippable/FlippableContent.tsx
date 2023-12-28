import React from "react"
import { cn } from "src/lib"
import { PropsWithClassName } from "~/app/types"

type FlippableContentProps = PropsWithClassName & {
	onClick?: () => void
	frontSideContent: React.ReactNode
	backSideContent: React.ReactNode
}

export function FlippableContent(props: FlippableContentProps) {
	const { frontSideContent, backSideContent, className, onClick } = props

	function handleClick() {
		onClick && onClick()
	}
	return (
		<>
			<div className={cn("w-[100%] h-[100%] absolute backface-hidden", className)} onClick={handleClick}>
				{frontSideContent}
			</div>
			<div
				className={cn("w-[100%] h-[100%] absolute backface-hidden", className)}
				onClick={handleClick}
				style={{
					transform: `rotateY(180deg)`,
				}}
			>
				{backSideContent}
			</div>
		</>
	)
}
