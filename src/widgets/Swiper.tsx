"use client"

import { withSwiper } from "~/features/swiper"
import { Card, CardProps } from "~/entites/card"

export const Swiper = withSwiper<CardProps>(Card)
