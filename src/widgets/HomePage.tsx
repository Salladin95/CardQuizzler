"use client"
import { FolderCarousel, ModuleCarousel } from "~/widgets/index"
import { Button } from "~/shared"
import { useRouter } from "next/navigation"
import { FolderType, ModuleType } from "~/entites"

type HomeProps = {
	folders: FolderType[]
	recentModules: ModuleType[]
	difficultModules: ModuleType[]
}
export function HomePage(props: HomeProps) {
	const { folders, difficultModules, recentModules } = props
	const router = useRouter()
	return (
		<main className={"container"}>
			<section className="mb-4">
				<h1>Последние действия</h1>
				<ModuleCarousel
					data={recentModules}
					className={"h-[13rem]"}
					onClick={(id: string) => router.push(`/module/${id}`)}
				/>
			</section>

			<section className="">
				<h3>Сложные модули</h3>
				<ModuleCarousel
					data={difficultModules}
					className={"h-[13rem]"}
					onClick={(id: string) => router.push(`/module/${id}`)}
				/>
			</section>

			<section className="mb-4">
				<h2>Мои папки</h2>
				<FolderCarousel data={folders} className={"h-[13rem]"} onClick={(id: string) => router.push(`/folder/${id}`)} />
			</section>

			<Button className={"mb-4"}>Открыть рандомный модуль</Button>
			<Button>Создать</Button>
		</main>
	)
}
