"use client"
import React from "react"
import { CarouselControllers } from "./CarouselControllers"
import { PropsWithClassName, WithId } from "~/app/types"
import { useBreakpoint } from "~/shared/hooks/useBreakpoint"
import { getSplideOptions } from "~/features/splideCarousel/lib/getSplideOptions"
import { Options, Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"

import "@splidejs/react-splide/css/core"

export type SplideCarouselProps<T> = {
	data: T[] | undefined | null
	options?: Options
	onClick?: (id: string) => void
} & PropsWithClassName

export function withSplideCarousel<DataType extends WithId>(
	Component: React.ComponentType<DataType & PropsWithClassName>,
) {
	return function (props: SplideCarouselProps<DataType>) {
		const { data, onClick, options, className } = props

		function handleClick(id: string) {
			onClick && onClick(id)
		}

		if (!data) return null

		const breakpoint = useBreakpoint()

		const carouselOptions: Options = React.useMemo(
			() => ({
				...getSplideOptions(data.length, breakpoint),
				...options,
			}),
			[data.length, options, breakpoint],
		)

		return (
			<Splide hasTrack={false} options={carouselOptions}>
				<SplideTrack>
					{data.map((slide) => (
						<SplideSlide key={slide.id} onClick={() => handleClick(slide.id)}>
							<Component {...slide} className={className} />
						</SplideSlide>
					))}
				</SplideTrack>
				<CarouselControllers />
			</Splide>
		)
	}
}
