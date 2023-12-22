import { Editor } from "@tiptap/react"
import { cn } from "src/lib"
import { SvgDefaultProps } from "~/app/types"

export function getTipTapEditorSvgProps(name: string, editor: Editor | null): SvgDefaultProps {
	return {
		className: cn("w-[12px] h-[12px] fill-blue-400 z-50", {
			"fill-primary": editor?.isActive(name),
		}),
	}
}
