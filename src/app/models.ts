export type TermType = {
	id: string
	title: string
	description: string
}

export type FolderType = {
	id: string
	title: string
	modules: ModuleType[]
}

export type ModuleType = {
	id: string
	title: string
	terms: TermType[]
}
