"use client"
import { cn } from "~/shared/lib"
import Link from "next/link"
import { PropsWithClassName } from "~/app/types"
import { Button, Logo, useProfile, UserIcon } from "~/shared"

type HeaderProps = { style?: React.CSSProperties } & PropsWithClassName

export function Header(props: HeaderProps) {
	const { data: profile } = useProfile({ staleTime: 0 })

	return (
		<header
			style={props?.style}
			className={cn("flex items-center justify-between bg-transparent px-8 py-4", props?.className)}
		>
			<Logo className={"text-primary inset-0 static"} />
			{profile ? (
				<div className={"flex gap-x-4"}>
					<Link href={"/profile"}>
						<Button variant={"secondary"}>
							<UserIcon className={""} />
							<span className={"hidden 428:block ml-2"}>Личный кабинет</span>
						</Button>
					</Link>
				</div>
			) : (
				<Link href={"/auth"}>
					<Button className={"w-min"} variant={"secondary"}>
						Войти
					</Button>
				</Link>
			)}
		</header>
	)
}
