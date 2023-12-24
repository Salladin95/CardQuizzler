"use client"
import { withSplideCarousel } from "~/features/splideCarousel/SplideCarousel"
import { Folder, FolderType } from "~/entites"

export const FolderCarousel = withSplideCarousel<FolderType>(Folder)
