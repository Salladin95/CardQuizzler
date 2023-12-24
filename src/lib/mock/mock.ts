import { faker, fakerEN } from "@faker-js/faker"
import { createArray } from "~/lib/creators"
import { FolderType, ModuleType } from "~/entites"

export function mockFolder(): FolderType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		amountOfModules: faker.number.int(50),
	}
}

export function mockModule(): ModuleType {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		amountOfTerms: faker.number.int(50),
	}
}

export function mockFolders(length = 10) {
	return createArray<FolderType>(length, mockFolder)
}

export function mockModules(length = 10) {
	return createArray<ModuleType>(length, mockModule)
}
