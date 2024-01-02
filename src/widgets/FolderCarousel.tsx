"use client"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"
import { Folder } from "~/entites"
import { FolderType } from "~/app/models"

export const FolderCarousel = withSplideCarousel<FolderType>(Folder)
