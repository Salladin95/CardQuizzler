"use client"
import { HomePage } from "~/app/HomePage"
import { DataHydration } from "~/shared"
import { getHomePageData, homeDataKey } from "~/api"

export default function HomeWithDataHydration() {
	return (
		<DataHydration getData={getHomePageData} queryKeys={[homeDataKey]}>
			<HomePage />
		</DataHydration>
	)
}
