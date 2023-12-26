"use client"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"
import { Module, ModuleType } from "~/entites"

export const ModuleCarousel = withSplideCarousel<ModuleType>(Module)
