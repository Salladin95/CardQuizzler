import { Translator } from "~/app/i18n"
import { AccessType } from "~/app/types"
import { createOption, SelectOption } from "~/shared"

export function getAccessTypeSelectOptions(t: Translator): SelectOption[] {
	return [
		[AccessType.OPEN, t("Labels.open")],
		[AccessType.PASSWORD, t("Labels.password")],
		[AccessType.ONLY_ME, t("Labels.onlyMe")],
	].map((option) => createOption(...option))
}

export const ACCESS_TYPE_KEYS = [AccessType.ONLY_ME, AccessType.PASSWORD, AccessType.OPEN]
