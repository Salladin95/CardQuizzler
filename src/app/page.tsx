"use client"
import { DataHydration } from "~/shared"
import { HomePage } from "~/app/HomePage"
import { getHomePageData, homeDataKey } from "~/api"

export default function HomeWithDataHydration() {
	// useProtectedProfile()

	return (
		<DataHydration getData={getHomePageData} queryKeys={[homeDataKey]}>
			<HomePage />
		</DataHydration>
	)
}
