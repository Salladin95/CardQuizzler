"use client"
import React from "react"
import { Module, ModuleProps } from "~/entites"
import { ModuleType } from "~/app/models"
import { useRouter } from "next/navigation"
import { SplideCarouselProps, withSplideCarousel } from "~/features"

export const ModulesCarousel = (props: SplideCarouselProps<ModuleType>) => {
	const router = useRouter()
	const Comp = (props: ModuleProps) => <Module {...props} onClick={() => router.push(`/module-preview/${props.id}`)} />
	const Carousel = withSplideCarousel<ModuleType>(Comp)
	return <Carousel {...props} />
}

function DifficultModule(props: ModuleType) {
	const router = useRouter()
	const encodedTitle = encodeURIComponent(props.title)
	return <Module {...props} onClick={() => router.push(`/difficult-module/${encodedTitle}`)} />
}

export const DifficultModulesCarousel = withSplideCarousel<ModuleType>(DifficultModule)
