"use client"

import React from "react"
import * as RadixScrollArea from "@radix-ui/react-scroll-area"
import { cva, VariantProps } from "class-variance-authority"

const scrollAreaVariants = cva("scroll-area", {
	variants: {
		variant: {
			primary: ["scroll-area-primary"],
		},
		size: {
			default: ["scroll-area-size-default"],
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
})

type ScrollAreaVariant = VariantProps<typeof scrollAreaVariants>
export type ScrollAreaProps = RadixScrollArea.ScrollAreaProps & {
	viewport?: RadixScrollArea.ScrollAreaViewportProps
	scrollbar?: RadixScrollArea.ScrollAreaScrollbarProps
	thumb?: RadixScrollArea.ScrollAreaThumbProps
	corner?: RadixScrollArea.ScrollAreaCornerProps
	/**
	 * Variant: [primary]
	 * */
	variant?: ScrollAreaVariant["variant"]
	/**
	 * Size: [primary]
	 * */
	size?: ScrollAreaVariant["size"]
	children: React.ReactNode
}
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => {
	const { children, className, variant, size, viewport, scrollbar, thumb, corner } = props
	const { orientation = "vertical", ...restScrollbar } = scrollbar || {}
	/*
	 * This code solves one problem: ScrollArea has strict height, so if content has smaller height
	 * Than ScrollArea it will have space before div ends. We need height: "auto" if content doesn't fit ScrollArea.
	 *
	 * It could be solved in a more simple way, but we have height animations like in Dropdown and you can't
	 * Just take child.clientHeight to calculate ScrollArea, because it has height: 0.
	 *
	 * When animating - Root also has just padding height.
	 * getComputedStyle(root) - ❌
	 * root.clientHeight - ❌
	 * root.computedStyleMap() - ✅ EXPERIMENTAL API
	 *
	 * NOTE: You can't use gap-x-4 or mb-4 in wrapped content because these styles don't impact height
	 * and as a result can't be calculated. Use padding instead. As an example you can take items in dropdown
	 *
	 * That's why you should "scroll-area-auto-height" class down the tree where content placed. That way content
	 * Height can be calculated and animated at the same and if it doesn't fit height: "auto" will be set.
	 * */
	const viewportRef = React.useRef<HTMLDivElement>(null)
	React.useEffect(() => {
		const viewportEl = viewportRef.current
		if (viewportEl) {
			/*
			 * Take ScrollArea root element to get it's height
			 * */
			const root = viewportEl.parentElement
			/*
			 * Get our content by service class or take viewport itself
			 * */
			const child = viewportEl.querySelector(".scroll-area-auto-height") || viewportEl
			if (root && child) {
				const children = child.children

				let childrenHeight = 0
				/*
				 * If content has children calculate their height.
				 * Either take container's height
				 * */
				if (children.length) {
					for (let i = 0; i < children.length; i++) {
						const child = children.item(i)
						if (child) {
							childrenHeight += child.clientHeight
						}
					}
				} else {
					childrenHeight = child.clientHeight
				}
				/*
				 * Get root height
				 * ATTENTION: computedStyleMap() is EXPERIMENTAL API, but works :D.
				 * */
				// @ts-ignore
				const rootComputedStyleMap = root.computedStyleMap()
				const rootHeight = rootComputedStyleMap.get("height")?.value
				/*
				 * If ScrollArea height more that content height, set height: "auto"
				 * */
				if (rootHeight > childrenHeight) {
					root.style.height = "auto"
				}
			}
			/*
			 * When use asChild for RadixScrollArea.Viewport it accepts strange display: table style
			 * That prevent scroll. Remove it...
			 * */
			viewportEl.style.display = "block"
		}
	}, [viewportRef])

	return (
		<RadixScrollArea.Root className={scrollAreaVariants({ variant, size, className })} ref={ref}>
			<RadixScrollArea.Viewport asChild className="scroll-area-viewport" ref={viewportRef} {...viewport}>
				{children}
			</RadixScrollArea.Viewport>
			<RadixScrollArea.Scrollbar className="scroll-area-scrollbar" orientation={orientation} {...restScrollbar}>
				<RadixScrollArea.Thumb className="scroll-area-thumb" {...thumb} />
			</RadixScrollArea.Scrollbar>
			<RadixScrollArea.Corner className="scroll-area-corner" {...corner} />
		</RadixScrollArea.Root>
	)
})
