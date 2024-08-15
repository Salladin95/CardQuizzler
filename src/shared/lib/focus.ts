/**
 *  Focuses first input of event
 * */
export const focusFirstInput = (e: React.MouseEvent) => {
	const input = e.currentTarget.querySelector("input")
	input && input.focus()
}

/**
 *  Focuses first textarea of event
 * */
export const focusFirstTextArea = (e: React.MouseEvent) => {
	const textarea = e.currentTarget.querySelector("textarea")
	textarea && textarea.focus()
}

/**
 *  Focuses first div of event
 * */
export const focusFirstDiv = (e: React.MouseEvent) => {
	const div = e.currentTarget.querySelector("div")
	div && div.focus()
}

/**
 *  Focuses child by class
 * */
export const focusChildByClass = (element: HTMLElement, className: string) => {
	const child = element.querySelector(`.${className}`) as HTMLElement
	child && child.focus()
}

/**
 *  Clicks first input of event
 * */
export const clickFirstInput = (e: React.SyntheticEvent) => {
	const input = e.currentTarget.querySelector("input")
	input && input.click()
}
