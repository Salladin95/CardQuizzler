"use client"
import React from "react"
import { HomePage } from "~/views/home"
import { useProtectedProfile } from "~/shared"

export default function HomeWithDataHydration() {
	useProtectedProfile()
	return (
		// <DataHydration getData={getHomePageData} queryKeys={[homeDataKey]}>
		<HomePage />
		// </DataHydration>
	)
}
