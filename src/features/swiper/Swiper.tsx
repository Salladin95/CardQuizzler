"use client"
import { withSwiper } from "~/features/swiper/index"
import { QuizCard } from "~/features/quizCard/QuizCard"
import { TermType } from "~/app/models"

export const Swiper = withSwiper<TermType>(QuizCard)
