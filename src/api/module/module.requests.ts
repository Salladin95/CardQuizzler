import { ModuleType } from "~/app/models"
import { mockModule } from "~/lib/mock"

export type CreateModulePayload = Omit<ModuleType, "id">

export function createModule(module: CreateModulePayload): Promise<ModuleType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModule())
}

export type UpdateModulePayload = ModuleType

export function updateModule(payload: UpdateModulePayload): Promise<ModuleType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModule())
}

export type DeleteModuleResult = string

export function deleteModule(id: string): Promise<DeleteModuleResult> {
	console.log("DELETING ....")
	return Promise.resolve("SUCCESS")
}
