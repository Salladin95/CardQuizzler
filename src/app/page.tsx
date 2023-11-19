import { Slider, Swiper } from "~/components"

export default function Home() {
	return (
		<div className={"flex flex-col gap-y-4"}>
			<Slider />
			<Swiper />
		</div>
	)
}
