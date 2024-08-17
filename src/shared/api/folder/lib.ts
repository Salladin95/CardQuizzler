import { getUserByID } from "~/shared"
import { Profile, SharedValues } from "~/app/models"

export async function addUserInfo<T extends SharedValues>(initialValues: T[]): Promise<T[]> {
	const usersMap = new Map<string, Profile | null>()
	const userIDsSet = new Set<string>()

	initialValues.forEach((i) => {
		userIDsSet.add(i.userID)
		userIDsSet.add(i.authorID)
	})

	const userPromises = Array.from(userIDsSet).map((id) => getUserByID(id))

	await Promise.all(userPromises).then((users) =>
		users.forEach((user) => {
			usersMap.set(user.id, user)
		}),
	)

	return initialValues.map((f) => ({
		...f,
		ownerName: usersMap.get(f.userID)?.name,
		authorName: usersMap.get(f.authorID)?.name,
	}))
}
