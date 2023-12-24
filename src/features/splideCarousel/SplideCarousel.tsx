"use client"
import React from "react"
import { PropsWithClassName, WithId } from "~/app/types"
import { CarouselControllers } from "~/features/splideCarousel/CarouselControllers"
import { splideDefaultOptions } from "~/features/splideCarousel/lib/splideDefaultOptions"
import { Options, Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"

import "@splidejs/react-splide/css/core"

type SplideCarouselProps<T> = {
	cards: T[]
	options?: Options
	withControllers?: boolean
} & PropsWithClassName

export function withSplideCarousel<DataType extends WithId>(
	Component: React.ComponentType<DataType & PropsWithClassName>,
) {
	return function (props: SplideCarouselProps<DataType>) {
		const { cards, options = splideDefaultOptions, withControllers = true, className } = props
		return (
			<Splide hasTrack={false} options={options}>
				<SplideTrack>
					{cards.map((card) => (
						<SplideSlide key={card.id}>
							<Component {...card} className={className} />
						</SplideSlide>
					))}
				</SplideTrack>
				{withControllers && <CarouselControllers />}
			</Splide>
		)
	}
}
