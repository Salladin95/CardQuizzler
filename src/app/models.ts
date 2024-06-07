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
}

export type FolderType = {
	id: string
	title: string
	modules: ModuleType[]
	access: AccessType
	password?: string
}

export type ModuleType = {
	id: string
	title: string
	terms: TermType[]
	userID: string
	access: AccessType
}

export type HomePageData = {
	folders: FolderType[]
	modules: ModuleType[]
	lastActions: ModuleType[]
	difficultModules: ModuleType[]
}
