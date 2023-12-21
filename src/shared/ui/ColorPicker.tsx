import { HexColorPicker } from "react-colorful"
import React from "react"

export type ColorPickerProps = { color?: string; onChange: (color: string) => void; className?: string }

export function ColorPicker(props: ColorPickerProps) {
	return <HexColorPicker {...props} id={"color-picker"} />
}
