"use client"

import { useToast } from "~/shared"
import { AxiosError } from "axios"

export default function useApiErrorToast() {
	const toast = useToast()
	return (error: unknown) => {
		if (error instanceof AxiosError) {
			return toast({ variant: "error", title: "Error", description: error.response?.data || error.message })
		} else if (error instanceof Error) {
			return toast({ variant: "error", title: "Error", description: error.message })
		}
		return toast({ variant: "error", title: "Error", description: "Something went wrong" })
	}
}
