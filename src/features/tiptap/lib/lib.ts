import { Editor } from "@tiptap/react"
import { cn } from "src/lib"

export function getTipTapEditorSvgClassName(name: string, editor: Editor | null) {
	return cn("w-[1rem] h-[1rem] fill-blue-400 z-50", {
		"fill-primary": editor?.isActive(name),
	})
}
