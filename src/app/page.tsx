import React from "react"
import { mockCards } from "~/entites/card"
import { Swiper } from "~/widgets/Swiper"

export default async function Home() {
	return <Swiper cards={mockCards()} />
}
