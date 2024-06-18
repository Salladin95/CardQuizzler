import React from "react"
import { Input, InputProps, SearchIcon } from "~/shared"

export type AutocompleteProps = InputProps & {
	renderHints: () => React.ReactNode
}

export function Autocomplete(props: AutocompleteProps) {
	const { renderHints, ...inputProps } = props
	const [isFocused, setIsFocused] = React.useState(false)
	return (
		<div className={"relative"}>
			<Input
				{...inputProps}
				onFocus={() => setIsFocused(true)}
				//We need timeout to handle click event before the hints get unmounted
				onBlur={() => setTimeout(() => setIsFocused(false), 100)}
				suffix={<SearchIcon />}
			/>
			<div className={"absolute w-full z-20 bg-gray-200 rounded max-h-[10rem] overflow-y-auto custom-scrollbar"}>
				{isFocused && renderHints()}
			</div>
		</div>
	)
}
