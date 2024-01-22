import React from "react"
import { ReactQueryProvider } from "src/providers"
import type { Metadata } from "next"

import "~/globals.css"
import { PropsWithChildren } from "~/app/types"

export const metadata: Metadata = {
	title: "CardQuizzer",
	description: "App for learning languages with cards",
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	)
}
