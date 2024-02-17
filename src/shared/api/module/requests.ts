import { ModuleType } from "~/app/models"
import { mockGetModule, mockModule, mockModules } from "~/lib/mock"

export type GetModulePayload = string
export type GetModuleResponse = ModuleType

export function getModule(id: GetModulePayload): Promise<GetModuleResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetModule(id))
}

export type GetModulesResponse = ModuleType[]

export function getModules(): Promise<GetModulesResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModules())
}

export type GetDifficultModulesResponse = ModuleType[]

export function getDifficultModules(): Promise<GetDifficultModulesResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModules())
}

export type GetRecentOpenedModulesResponse = ModuleType[]

export function getRecentOpenedModules(): Promise<GetDifficultModulesResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModules())
}

export type CreateModulePayload = Omit<ModuleType, "id">
export type CreateModuleResponse = ModuleType

export function createModule(module: CreateModulePayload): Promise<CreateModuleResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModule())
}

export type UpdateModulePayload = ModuleType
export type UpdateModuleResponse = ModuleType

export function updateModule(payload: UpdateModulePayload): Promise<UpdateModuleResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModule())
}

export type DeleteModulePayload = string
export type DeleteModuleResponse = string

export function deleteModule(id: DeleteModulePayload): Promise<DeleteModuleResponse> {
	console.log("DELETING ....")
	return Promise.resolve("SUCCESS")
}
