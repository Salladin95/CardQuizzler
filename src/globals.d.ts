// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Yup from "yup"
import { AccessType } from "~/app/types"

declare module "yup" {
	interface StringSchema {
		password(): this
	}
	interface NumberSchema {
		codeLength(): this
	}
	interface StringSchema {
		protectedByPassword(isEditMode: boolean, access?: AccessType): this
	}
	interface MessageParams {
		path: string
		value: any
		originalValue: any
		label: string
		type: string
		spec: SchemaSpec<any> & Record<string, unknown>
	}
}
