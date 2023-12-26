import { HomePage } from "~/widgets/HomePage"
import { mockFolders, mockModules } from "~/lib/mock/mock"

export default function Home() {
	return <HomePage recentModules={mockModules()} difficultModules={mockModules()} folders={mockFolders()} />
}
