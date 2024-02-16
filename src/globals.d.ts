// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Yup from "yup"
declare module "yup" {
	interface StringSchema {
		password(): this
	}
	interface NumberSchema {
		codeLength(): this
	}
}
