import { AccessType } from "~/app/types"

export type Profile = {
	email: string
	name: string
	id: string
	birthday: string
	createdAt: string
	updatedAt: string
}

export type TermType = {
	id: string
	title: string
	moduleID: string
	description: string
	index: number
}

export type SharedValues = {
	id: string
	title: string
	access: AccessType
	password?: string
	authorID: string
	userID: string
	authorName?: string
	ownerName?: string
}

export type FolderType = {
	modules: ModuleType[]
} & SharedValues

export function isFolder(folder: Record<string, unknown>): folder is FolderType {
	return Object.hasOwn(folder, "modules")
}

export type ModuleType = {
	terms: TermType[]
} & SharedValues

export function isModule(module: Record<string, unknown>): module is ModuleType {
	return Object.hasOwn(module, "terms")
}

export type HomePageData = {
	folders: FolderType[]
	modules: ModuleType[]
	lastActions: ModuleType[]
	difficultModules: ModuleType[]
}
