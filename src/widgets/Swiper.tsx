"use client"
import { withSwiper } from "~/features/swiper"
import { QuizCard } from "~/features/quizCard/QuzCard"
import { CardType } from "~/features/quizCard/model"

export const Swiper = withSwiper<CardType>(QuizCard)
