"use client"
import { Module } from "~/entites"
import { ModuleType } from "~/app/models"
import { useRouter } from "next/navigation"
import { ModuleContextMenu } from "~/features"
import { withSplideCarousel } from "~/features/splideCarousel/withSplideCarousel"

export const ModulesCarousel = withSplideCarousel<ModuleType>(ModuleContextMenu)

function DifficultModule(props: ModuleType) {
	const router = useRouter()
	const encodedTitle = encodeURIComponent(props.title)
	return <Module {...props} onClick={() => router.push(`/difficult-module/${encodedTitle}`)} />
}

export const DifficultModulesCarousel = withSplideCarousel<ModuleType>(DifficultModule)
