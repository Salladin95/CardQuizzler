"use client"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"
import { Folder, FolderType } from "~/entites"

export const FolderCarousel = withSplideCarousel<FolderType>(Folder)
