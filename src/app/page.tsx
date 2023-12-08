import React from "react"
import { mockCards } from "~/entites/card"
import { Swiper } from "~/features/swiper/Swiper"

export default async function Home() {
	return <Swiper cards={mockCards()} className={"640:w-428 768:w-640 1280:w-1024 1280:h-768"} />
}
