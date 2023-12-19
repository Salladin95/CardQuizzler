import { Editor } from "@tiptap/react"
import { cn } from "src/lib"
import { DefaultSvgProps } from "~/app/types"

export function getTipTapEditorSvgProps(name: string, editor: Editor | null): DefaultSvgProps {
	return {
		className: cn("w-[12px] h-[12px] fill-blue-400 stroke-1 z-50", {
			"fill-primary": editor?.isActive(name),
		}),
	}
}
