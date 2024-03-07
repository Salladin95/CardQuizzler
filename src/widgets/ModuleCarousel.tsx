"use client"
import { ModuleType } from "~/app/models"
import { ModuleContextMenu } from "~/features"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"

export const ModuleCarousel = withSplideCarousel<ModuleType>(ModuleContextMenu)
