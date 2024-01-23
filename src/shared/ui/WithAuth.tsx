import React from "react"
import { useProtectedProfile } from "~/api"

export function withAuth<CompPropsType extends JSX.IntrinsicAttributes>(Component: React.ComponentType) {
	function Auth(props: CompPropsType) {
		useProtectedProfile()
		return <Component {...props} />
	}

	return Auth
}
