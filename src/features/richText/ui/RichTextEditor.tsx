"use client"
import React from "react"

import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { EditorColorPickerOption } from "./EditorColorPicerOption"

import boldIcon from "~/public/assets/icons/bold.svg"
import italicIcon from "~/public/assets/icons/italic.svg"
import underlineIcon from "~/public/assets/icons/underline.svg"
import strikethroughIcon from "~/public/assets/icons/strikethrough.svg"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export function RichTextEditor() {
	const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

	return (
		<Editor
			editorState={editorState}
			onEditorStateChange={setEditorState}
			wrapperClassName={"flex-center flex-col container relative"}
			toolbarClassName={"gap-x-1"}
			editorClassName={"textarea textarea-primary px-4 min-h-[4rem] w-full rounded min-w-[30rem]"}
			toolbar={{
				options: ["colorPicker", "inline"],
				inline: {
					options: ["bold", "italic", "underline", "strikethrough"],
					bold: { icon: boldIcon.src, className: "editor-inline-option" },
					italic: { icon: italicIcon.src, className: "editor-inline-option" },
					underline: { icon: underlineIcon.src, className: "editor-inline-option" },
					strikethrough: {
						icon: strikethroughIcon.src,
						className: "editor-inline-option",
					},
				},
				colorPicker: { component: EditorColorPickerOption },
			}}
		/>
	)
}
