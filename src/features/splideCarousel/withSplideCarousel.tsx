"use client"
import React from "react"
import { PropsWithClassName, WithId } from "~/app/types"
import { CarouselControllers } from "~/features/splideCarousel/CarouselControllers"
import { splideDefaultOptions } from "~/features/splideCarousel/lib/splideDefaultOptions"
import { Options, Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"

import "@splidejs/react-splide/css/core"

type SplideCarouselProps<T> = {
	data: T[]
	options?: Options
	withControllers?: boolean
	onClick?: (id: string) => void
} & PropsWithClassName

export function withSplideCarousel<DataType extends WithId>(
	Component: React.ComponentType<DataType & PropsWithClassName>,
) {
	return function (props: SplideCarouselProps<DataType>) {
		const { data, onClick, options = splideDefaultOptions, withControllers = true, className } = props

		function handleClick(id: string) {
			onClick && onClick(id)
		}
		return (
			<Splide hasTrack={false} options={options}>
				<SplideTrack>
					{data.map((slide) => (
						<SplideSlide key={slide.id} onClick={() => handleClick(slide.id)}>
							<Component {...slide} className={className} />
						</SplideSlide>
					))}
				</SplideTrack>
				{withControllers && <CarouselControllers />}
			</Splide>
		)
	}
}
