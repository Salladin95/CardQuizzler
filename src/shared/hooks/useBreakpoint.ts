import { useWindowSize } from "react-use"

export enum BreakpointSizes {
	XL = 1180,
	MD = 768,
	XS = 320,
}

export enum Breakpoint {
	XL = "XL",
	MD = "MD",
	XS = "XS",
}

export function useBreakpoint(): Breakpoint {
	const { width } = useWindowSize()
	switch (true) {
		case width >= BreakpointSizes.XL:
			return Breakpoint.XL
		case width < BreakpointSizes.XL && width > BreakpointSizes.MD:
			return Breakpoint.MD
		default:
			return Breakpoint.XS
	}
}
