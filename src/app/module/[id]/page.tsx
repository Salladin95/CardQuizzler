import { Swiper } from "~/features/swiper/Swiper"
import { mockCards } from "~/lib/mock/mockCard"

export default async function Module() {
	const cards = mockCards()
	return (
		<main className={"flex-center overflow-hidden"}>
			<Swiper cards={cards} className={""} />
		</main>
	)
}
