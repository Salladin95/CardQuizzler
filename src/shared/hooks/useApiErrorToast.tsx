"use client"

import { AxiosError } from "axios"
import { useToast } from "~/shared"
import { ApiCommonResponse, ApiValidationResponse } from "~/app/types"
import { usePathname, useRouter } from "next/navigation"

export default function useApiErrorToast() {
	const toast = useToast()
	const router = useRouter()
	const pathname = usePathname()
	return (error: unknown) => {
		if (error instanceof AxiosError) {
			if (error.response) {
				const { data, status } = error.response
				switch (status) {
					/* Handle validation errors */
					case 422: {
						const { detail } = data as ApiValidationResponse
						if (detail && detail.length) {
							const description = detail.map((validationError) => {
								const { loc, msg } = validationError
								const fieldName = loc[loc.length - 1]
								const fieldMessage = msg.replace("Field ", "")
								return (
									<span className={"inline-block mb-2"} key={fieldName}>
										Field {fieldName}: {fieldMessage};
									</span>
								)
							}, "")

							toast({ variant: "error", title: "Validation Error", description })
						} else {
							toast({ variant: "error", title: "Validation Error", description: error.message })
						}

						break
					}
					/* Handle not authorized */
					case 401: {
						if (!pathname.includes("/auth") && !pathname.includes("/profile")) {
							toast({ variant: "error", title: "Error", description: "Not authorized" })
							router.push("/auth")
						}
						if (pathname.includes("/auth")) {
							const { detail } = data as ApiCommonResponse
							toast({ variant: "error", title: "Error", description: detail })
						}

						// TODO: REFACTOR
						if (pathname.includes("/profile")) {
							toast({ variant: "error", title: "Error", description: "Not authorized" })
						}

						break
					}
					/* Handle not found */
					case 404: {
						toast({ variant: "error", title: "Error", description: "Not found" })
						break
					}
					default: {
						toast({ variant: "error", title: "Error", description: data?.detail || error.message })
					}
				}
			} else {
				toast({ variant: "error", title: "Error", description: error.message })
			}
		} else if (error instanceof Error) {
			toast({ variant: "error", title: "Error", description: error.message })
		} else {
			toast({ variant: "error", title: "Error", description: "Internal error" })
		}
	}
}
