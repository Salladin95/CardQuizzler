import Link from "next/link"

export function Header() {
	return (
		<header className={"flex justify-between bg-[#E8FFCE] px-8 py-4"}>
			<div>
				<Link href={"/"}>CardQuizzler</Link>
			</div>
			<div>Личный кабинет</div>
		</header>
	)
}
