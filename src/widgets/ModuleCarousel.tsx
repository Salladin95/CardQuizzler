"use client"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"
import { Module } from "~/entites"
import { ModuleType } from "~/app/models"

export const ModuleCarousel = withSplideCarousel<ModuleType>(Module)
