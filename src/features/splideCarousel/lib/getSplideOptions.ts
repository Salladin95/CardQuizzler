import { Breakpoint } from "~/shared/"
import { clampBetween } from "~/shared/lib"

export const getSplideOptions = (value: number, breakpoint: Breakpoint) => {
	let maxPerPageMove = clampBetween({ min: 1, max: 3, value })
	switch (breakpoint) {
		case Breakpoint.MD:
			maxPerPageMove = clampBetween({ min: 1, max: 2, value })
			break
		case Breakpoint.XS:
			maxPerPageMove = 1
			break
	}
	return {
		gap: 16,
		rewind: true,
		perPage: maxPerPageMove,
		perMove: maxPerPageMove,
	}
}
