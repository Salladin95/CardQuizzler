const REM = 16

// Sort colors by numbers: https://elektrobild.org/tools/sort-colors
const colors = {
	primary: "#7749F8",
	gold: "#FFC107",
	green: "#28A745",
	info: "#3D8BFD",
	danger: "#EC3A48",
	main: "#333333",
	white: "#FFF",
	gray: {
		100: "#F5F5F5",
		200: "#EFEFEF",
		300: "#D6D6D6",
		400: "#CCCCCC",
		500: "#7F7E7E",
		600: "#4b5563",
	},
}

function convertObjectPixelsToRems(object) {
	return Object.keys(object).reduce((acc, key) => {
		const value = object[key]
		const isEndsWithPixels = value.endsWith("px")
		if (isEndsWithPixels) {
			const parsedPixels = Number(value.replace("px", ""))
			if (Number.isNaN(parsedPixels)) {
				console.error(key, value)
				throw new Error("tailwind-config.js -> Failed to parse string")
			}

			return {
				...acc,
				[key]: parsedPixels / REM + "rem",
			}
		}

		return {
			...acc,
			[key]: value,
		}
	}, {})
}

/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		screens: {
			// Mobile
			360: "360px",
			375: "375px",
			428: "428px",
			// Tablet
			640: "640px",
			768: "768px",
			1024: "1024px",
			1180: "1180px",
			// Desktop
			1280: "1280px",
			1440: "1440px",
			1680: "1680px",
			1860: "1860px",
		},
		fontSize: convertObjectPixelsToRems({
			"8px": "8px",
			"9px": "9px",
			"10px": "10px",
			"11px": "11px",
			"12px": "12px",
			"13px": "13px",
			"14px": "14px",
			"15px": "15px",
			"16px": "16px",
			"17px": "17px",
			"18px": "18px",
			"19px": "19px",
			"20px": "20px",
		}),
		extend: {
			colors,
			fontFamily: {
				noto: ["var(--font-noto)"],
				inter: ["var(--font-inter)"],
			},
			/**
			 * Underline
			 * */
			textDecorationColor: {
				primary: colors.primary,
			},
			textDecorationThickness: {
				// 1px
				primary: "0.0625rem",
			},
			textUnderlineOffset: {
				// 2px
				primary: "0.125rem",
			},
			/**
			 * Ring
			 * */
			ringWidth: {
				// 1px
				primary: "0.0625rem",
				error: "0.0625rem",
			},
			ringOpacity: {},
			ringOffsetWidth: {
				// 1px
				primary: "0.0625rem",
				error: "0.0625rem",
			},
			ringColor: {
				primary: colors.primary,
				error: colors.danger,
			},
			ringOffsetColor: {
				primary: colors.gray["300"],
				error: colors.gray["300"],
			},
			boxShadow: {
				toggle: "0 0 0.125rem 0 rgba(0, 0, 0, 0.20)",
				popover: "0px 8px 20px 0px rgba(0, 0, 0, 0.14)",
			},
			spacing: ({ theme }) => {
				return convertObjectPixelsToRems({
					...theme("screens"),
					unset: "unset",
					fit: "fit-content",
					"1px": "1px",
					"2px": "2px",
					"3px": "3px",
					"10px": "10px",
					"15px": "15px",
					"22px": "22px",
					"25px": "25px",
				})
			},
			minWidth: ({ theme }) => {
				return {
					// Spacing
					...theme("spacing"),
					// Other
				}
			},
			maxWidth: ({ theme }) => {
				return {
					// Spacing
					...theme("spacing"),
					// Other
				}
			},
			minHeight: ({ theme }) => {
				return {
					// Spacing
					...theme("spacing"),
					// Other
				}
			},
			maxHeight: ({ theme }) => {
				return {
					// Spacing
					...theme("spacing"),
					// Other
				}
			},
			borderWidth: convertObjectPixelsToRems({
				"1px": "1px",
				"1.5px": "1.5px",
				"2px": "2px",
				"3px": "3px",
				2.5: "10px",
			}),
			borderRadius: convertObjectPixelsToRems({
				inherit: "inherit",
				"2px": "2px",
				"4px": "4px",
				"8px": "8px",
				"10px": "10px",
				"12px": "12px",
				"14px": "14px",
				"16px": "16px",
				"18px": "18px",
				"20px": "20px",
			}),
			backgroundSize: {
				full: "100%",
				full2x: "200%",
			},
			transitionProperty: {
				// Overwrite default transition-colors to include box-shadow that is almost used for 'ring' classes
				colors: "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
			},
			/*
			 * Radix ui suspended from removing while element has running animation.
			 * Define necessary durations here to animate your component exit animation with framer
			 * And not have it removed before animation was done
			 * https://www.radix-ui.com/primitives/docs/guides/animation
			 * */
			animation: {
				// Feel free to add any other timings here
				"framer-0.3": "framer 0.3s ease",
				"overlay-open": "overlay-open 0.3s ease",
				"overlay-closed": "overlay-closed 0.3s ease",
			},
			keyframes: {
				/*
				 * I got strange behavior in production when no styles set in animation.
				 * Animation was infinite and as a result Popover wasn't hidden.
				 * Applied some test styles here to avoid this like "caretColor"
				 *
				 * This is tightly coupled with previous animation property comment
				 * */
				framer: {
					"0%": {
						caretColor: "auto",
					},
					"100%": {
						caretColor: "currentColor",
					},
				},
				"overlay-open": {
					"0%": {
						opacity: 0,
					},
					"100%": {
						opacity: 0.3,
					},
				},
				"overlay-closed": {
					"0%": {
						opacity: 0.3,
					},
					"100%": {
						opacity: 0,
					},
				},
			},
		},
	},
	plugins: [],
}

module.exports = config
