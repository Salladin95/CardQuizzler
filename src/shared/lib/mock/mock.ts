import { faker, fakerEN } from "@faker-js/faker"
import { FolderType, ModuleType } from "~/app/models"
import { createArray } from "~/shared/lib/creators"
import { mockTerms } from "~/shared/lib/mock/mockTerm"
import { AccessType } from "~/app/types"

export function mockFolder(): FolderType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		modules: mockModules(),
		access: AccessType.OPEN,
		userID: faker.string.uuid(),
		authorID: faker.string.uuid(),
	}
}

export function mockModule(): ModuleType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		terms: mockTerms(),
		userID: faker.string.uuid(),
		access: AccessType.OPEN,
		authorID: faker.string.uuid(),
	}
}

export function mockFolders(length = 10) {
	return createArray<FolderType>(length, mockFolder)
}

export function mockModules(length = 2) {
	return createArray<ModuleType>(length, mockModule)
}

export function mockCreateFolder(title: string): FolderType {
	return mockFolder()
}

export function mockGetFolder(_: string): FolderType {
	return mockFolder()
}

export function mockGetModule(_: string): ModuleType {
	return mockModule()
}
