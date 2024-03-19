"use client"
import Link from "next/link"
import { cn } from "~/shared/lib"
import { SwitchLocale } from "~/features"
import { PropsWithClassName } from "~/app/types"
import { useTranslations } from "~/app/i18n"
import { Button, Logo, useProfile, UserIcon } from "~/shared"

type HeaderProps = { style?: React.CSSProperties } & PropsWithClassName

export function Header(props: HeaderProps) {
	const { data: profile } = useProfile({ staleTime: 0 })
	const t = useTranslations()

	return (
		<header
			style={props?.style}
			className={cn("flex items-center justify-between bg-transparent px-8 py-4", props?.className)}
		>
			<Logo className={"text-primary inset-0 static"} />
			<div className={"flex items-center gap-x-8"}>
				{profile ? (
					<div className={"flex gap-x-4"}>
						<Link href={"/profile"}>
							<Button variant={"secondary"}>
								<UserIcon />
								<span className={"hidden 428:block ml-2"}>{t("Pages.profile")}</span>
							</Button>
						</Link>
					</div>
				) : (
					<Link href={"/auth"}>
						<Button className={"max-w-[10rem]"} variant={"secondary"}>
							{t("Pages.signIn")}
						</Button>
					</Link>
				)}
				<SwitchLocale />
				{/*<div className={"h-[2px] bg-primary"} />*/}
			</div>
		</header>
	)
}
