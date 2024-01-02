import { Swiper } from "~/features/swiper/Swiper"
import { mockTerms } from "~/lib/mock/mockTerm"

export default async function Module() {
	const cards = mockTerms()
	return (
		<main className={"flex-center overflow-hidden"}>
			<Swiper cards={cards} className={""} />
		</main>
	)
}
