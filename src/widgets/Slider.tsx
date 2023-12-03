"use client"
import { withSlider } from "~/features/slider"
import { Slide, SlideProps } from "~/entites/slide"

export const Slider = withSlider<SlideProps>(Slide)
