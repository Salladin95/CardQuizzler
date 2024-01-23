"use client"
import { HomePage } from "~/app/HomePage"
import { DataHydration } from "~/shared"
import { getHomePageData, homeDataKey, useProtectedProfile } from "~/api"

export default function HomeWithDataHydration() {
	useProtectedProfile()
	return (
		<DataHydration getData={getHomePageData} queryKeys={[homeDataKey]}>
			<HomePage />
		</DataHydration>
	)
}
