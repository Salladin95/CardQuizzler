import React from "react"
import cls from "classnames"
import { WithOptionalClassName } from "~/app/types"
import { FlippableProps } from "~/features/flippable/Flippable"

type FlippableContentProps = Pick<FlippableProps, "frontSideContent" | "backSideContent"> & WithOptionalClassName

export function FlippableContent(props: FlippableContentProps) {
	const { frontSideContent, backSideContent, className } = props
	return (
		<>
			<div className={cls("w-[100%] h-[100%] absolute backface-hidden", className)}>{frontSideContent}</div>
			<div
				className={cls("w-[100%] h-[100%] absolute backface-hidden", className)}
				style={{
					transform: `rotateY(180deg)`,
				}}
			>
				{backSideContent}
			</div>
		</>
	)
}
