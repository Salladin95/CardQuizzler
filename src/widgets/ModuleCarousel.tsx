"use client"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"
import { ModuleType } from "~/app/models"
import { ModuleContextMenu } from "~/entites/ModuleContextMenu"

export const ModuleCarousel = withSplideCarousel<ModuleType>(ModuleContextMenu)
