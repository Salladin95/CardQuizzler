"use client"
import { cn } from "~/shared/lib"
import Link from "next/link"
import { signOut } from "./api"
import { PropsWithClassName } from "~/app/types"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Logo, profileQueryKey, useProfile } from "~/shared"

type HeaderProps = { style?: React.CSSProperties } & PropsWithClassName

export function Header(props: HeaderProps) {
	const queryClient = useQueryClient()
	const { data: profile } = useProfile({ staleTime: 0 })

	async function handleSignOut() {
		await signOut()
		queryClient.resetQueries({ queryKey: [profileQueryKey], exact: true })
	}

	return (
		<header
			style={props?.style}
			className={cn("flex items-center justify-between bg-transparent px-8 py-4", props?.className)}
		>
			<Logo className={"text-primary inset-0 static"} />
			{profile ? (
				<div className={"flex gap-x-4"}>
					<Link href={"/profile"}>
						<Button variant={"secondary"}>Личный кабинет</Button>
					</Link>
					<Button className={"w-min"} onClick={handleSignOut} variant={"secondary"}>
						Выйти
					</Button>
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
