"use client"
import { withSplideCarousel } from "~/features/splideCarousel/SplideCarousel"
import { Module, ModuleType } from "~/entites"

export const ModuleCarousel = withSplideCarousel<ModuleType>(Module)
