import { TermType } from "~/app/models"
import { SwiperData } from "~/features"
import { useLocalStorage } from "react-use"

export function useStoredSwiperState(id: string) {
	return useLocalStorage<SwiperData<TermType> | null>(id, null, {
		raw: false,
		serializer: (v) => {
			return JSON.stringify(v)
		},
		deserializer: (v) => JSON.parse(v),
	})
}
