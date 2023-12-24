import { QueryClient } from "@tanstack/react-query"
// @ts-ignore
import { cache } from "react"

export const getQueryClient = cache(() => new QueryClient())
