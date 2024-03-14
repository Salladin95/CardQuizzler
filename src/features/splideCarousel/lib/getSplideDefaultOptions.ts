import { clampBetween } from "~/shared/lib"

export const getSplideDefaultOptions = (value: number) => ({
	gap: 16,
	rewind: true,
	breakpoints: {
		1180: {
			perPage: clampBetween({ min: 1, max: 2, value }),
			perMove: clampBetween({ min: 1, max: 2, value }),
		},
		768: {
			perPage: 1,
			perMove: 1,
		},
	},
})
