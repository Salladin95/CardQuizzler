"use client"
import React from "react"
import { ProfilePage } from "~/views/profile"
import { DataHydration, getProfile, profileQueryKey } from "~/shared"

export default function Profile() {
	return (
		<DataHydration queryKeys={[profileQueryKey]} getData={() => getProfile()}>
			<ProfilePage />
		</DataHydration>
	)
}
