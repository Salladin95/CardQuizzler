import React from "react"
import { mockCards } from "~/entites/card"
import { Swiper } from "~/features/swiper/Swiper"

export default async function Home() {
	return <Swiper cards={mockCards()} />
}
