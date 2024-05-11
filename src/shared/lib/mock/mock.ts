import { faker, fakerEN } from "@faker-js/faker"
import { FolderType, ModuleType } from "~/app/models"
import { createArray } from "~/shared/lib/creators"
import { mockTerms } from "~/shared/lib/mock/mockTerm"

export function mockFolder(): FolderType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		modules: mockModules(),
	}
}

export function mockModule(): ModuleType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		terms: mockTerms(),
		userID: faker.string.uuid(),
	}
}

export function mockFolders(length = 10) {
	return createArray<FolderType>(length, mockFolder)
}

export function mockModules(length = 2) {
	return createArray<ModuleType>(length, mockModule)
}

export function mockCreateFolder(title: string): FolderType {
	return {
		id: faker.string.uuid(),
		title,
		modules: [],
	}
}

export function mockGetFolder(_: string): FolderType {
	return mockFolder()
}

export function mockGetModule(_: string): ModuleType {
	return mockModule()
}
