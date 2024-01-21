import { cn } from "~/lib"
import Link from "next/link"
import { Profile } from "~/api"
import { PropsWithClassName } from "~/app/types"

type HeaderProps = { style?: React.CSSProperties; profile?: Profile | null | undefined } & PropsWithClassName

export function Header(props: HeaderProps) {
	return (
		<header style={props?.style} className={cn("flex justify-between bg-transparent px-8 py-4", props?.className)}>
			<Link href={"/"}>CardQuizzler</Link>
			<Link href={"/auth"}> {props.profile ? "Личный кабинет" : "Войти"}</Link>
		</header>
	)
}
