import { foldersQueryKey } from "~/api/queries/folder.queries"
import { difficultModulesQueryKey, lastActionsQueryKey, modulesQueryKey } from "~/api/queries/module.queries"

export const homeDataKeys = [foldersQueryKey, modulesQueryKey, lastActionsQueryKey, difficultModulesQueryKey]

export * from "./folder.queries"
export * from "./module.queries"
