"use client"
import { TermType } from "~/app/models"
import { withSwiper } from "./withSwiper"
import { QuizCard } from "~/features/quizCard/QuizCard"

export const Swiper = withSwiper<TermType>(QuizCard)
