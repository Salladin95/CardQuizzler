import { Slider } from "~/widgets/Slider"
import { Swiper } from "~/widgets/Swiper"
import { mockCards } from "~/entites/card"
import { mockSlides } from "~/entites/slide"

const swiperBackgroundColors: [string, string, string] = [
	"linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
	"linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
	"linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
]

export default function Home() {
	return (
		<div className={"flex flex-col gap-y-4"}>
			<Slider slides={mockSlides()} />
			<Swiper cards={mockCards()} backgroundColors={swiperBackgroundColors} />
		</div>
	)
}
