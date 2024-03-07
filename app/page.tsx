"use client"
import { HomePage } from "~/views/home"
import { DataHydration, getHomePageData, homeDataKey, useProtectedProfile } from "~/shared"

export default function HomeWithDataHydration() {
	useProtectedProfile()
	return (
		<DataHydration getData={getHomePageData} queryKeys={[homeDataKey]}>
			<HomePage />
		</DataHydration>
	)
}
