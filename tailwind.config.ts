import type { Config } from "tailwindcss"

export const colors = {
	primary: "#28A745",
	danger: "#EC3A48",
	info: "#3D8BFD",
	gold: "#FFC107",
	purple: "#7749F8",
	black: {
		100: "#333333",
		600: "#000000",
	},
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

export const spacing = {
	// Mobile
	"3xs": "22.5rem",
	"2xs": "23.4375rem",
	xs: "26.75rem",
	// Tablet
	sm: "40rem",
	md: "48rem",
	lg: "64rem",
	"2lg": "73.75rem",
	// Desktop
	xl: "80rem",
	"2xl": "90rem",
	"3xl": "105rem",
	"4xl": "116.25rem",
	// Other
	unset: "unset",
	fit: "fit-content",
	"1px": "0.0625rem",
	"2px": "0.125rem",
	3.75: "0.9375rem",
	4: "1rem",
	5: "1.25rem",
	6: "1.5rem",
	// 40
	10: "2.5rem",
	// 44
	11: "2.75rem",
	// 100
	25: "6.25rem",
	// 140
	35: "8.75rem",
	// 160
	40: "10rem",
	// 180
	45: "11.25rem",
	// 196
	49: "12.25rem",
	// 320
	80: "20rem",
	// 352
	88: "22rem",
	// 560
	140: "35rem",
}

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			// Mobile
			"3xs": "360px",
			"2xs": "375px",
			xs: "428px",
			// Tablet
			sm: "640px",
			md: "768px",
			lg: "1024px",
			"2lg": "1180px",
			// Desktop
			xl: "1280px",
			"2xl": "1440px",
			"3xl": "1680px",
			"4xl": "1860px",
		},
		fontSize: {
			// 34/48/600
			h1: [
				"2.125rem",
				{
					lineHeight: "3rem",
					fontWeight: "600",
				},
			],
			/* Mobile */
			// 24/32/500
			h2: [
				"1.5rem",
				{
					lineHeight: "2rem",
					fontWeight: "500",
				},
			],
			// 18/20/600
			h3: [
				"1.125rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "600",
				},
			],
			// 16/20/600
			h4: [
				"1rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "600",
				},
			],
			// 16/20/500
			h5: [
				"1rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "500",
				},
			],
			// 16/20/400
			h6: [
				"1rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "400",
				},
			],
			// 16/20/400
			"body-1": [
				"1rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "400",
				},
			],
			// 14/120%/400/-0.28px
			"body-2": [
				"0.875rem",
				{
					lineHeight: "120%",
					letterSpacing: "-0.0175rem;",
					fontWeight: "400",
				},
			],
			// 14/120%/500/-0.28px
			"body-3": [
				"0.875rem",
				{
					lineHeight: "120%",
					letterSpacing: "-0.0175rem;",
					fontWeight: "500",
				},
			],
			// 12/120%/400/-0.36px
			"body-4": [
				"0.75rem",
				{
					lineHeight: "normal",
					letterSpacing: "-0.0225rem;",
					fontWeight: "400",
				},
			],
			// 18/20/600
			"superscript-1": [
				"1.125rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "600",
				},
			],
			// 16/20/400
			"superscript-2": [
				"1rem",
				{
					lineHeight: "1.25rem",
					fontWeight: "400",
				},
			],
		},
		extend: {
			colors,
			spacing,
			minWidth: spacing,
			maxWidth: spacing,
			minHeight: spacing,
			maxHeight: spacing,
			borderWidth: {
				"1px": "0.0625rem",
				"1.5px": "0.09375rem",
				"2px": "0.125rem",
				2.5: "0.625rem",
				3: "0.1875rem",
				5: "1.25rem",
			},
			transitionProperty: {
				colors: "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
			},
			boxShadow: {
				switch: "0 0 1px 1px rgb(0 0 0 / 0.1)",
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
				"overlay-open": "overlay 0.3s ease",
				"overlay-closed": "overlay-closed 0.3s ease",
			},
			keyframes: {
				/*
				 * I got strange behavior in production when no styles set in animation.
				 * Animation was infinite and as a result Popover wasn't hidden.
				 * Applied some test styles here to avoid this like "caretColor"
				 * */
				framer: {
					"0%": {
						caretColor: "auto",
					},
					"100%": {
						caretColor: "currentColor",
					},
				},
				overlay: {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "0.3",
					},
				},
				"overlay-closed": {
					"0%": {
						opacity: "0.3",
					},
					"100%": {
						opacity: "0",
					},
				},
			},
		},
		fontFamily: {
			noto: ["var(--font-noto)"],
			inter: ["var(--font-inter)"],
		},
		scale: {
			click: "1.03",
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
	},
	plugins: [],
}
export default config
