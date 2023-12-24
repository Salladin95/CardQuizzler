import { ArrowLeft, ArrowRight } from "~/features/splideCarousel/icons"

export function CarouselControllers() {
	return (
		<div className="splide__arrows">
			<button className="splide__arrow splide__arrow--prev mr-4 mt-4">
				<ArrowLeft className={"hover:text-green transition-colors"} />
			</button>
			<button className="splide__arrow splide__arrow--next">
				<ArrowRight className={"hover:text-green transition-colors"} />
			</button>
		</div>
	)
}
