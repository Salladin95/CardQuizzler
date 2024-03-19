import { cn, useSwitchLocale } from "~/shared"
import { Locale, useLocale } from "~/app/i18n"
import { PropsWithClassName } from "~/app/types"

export function SwitchLocale(props: PropsWithClassName) {
	const locale = useLocale()
	const switchLocale = useSwitchLocale()
	const nextLocale = locale === Locale.EN ? Locale.RU : Locale.EN
	return (
		<div
			className={cn(
				"cursor-pointer text-primary w-4 h-4 p-4 transition-colors",
				"border-[1.5px] border-primary rounded-full flex-center",
				"hover:ring-primary",
				props.className,
			)}
			onClick={() => switchLocale(nextLocale)}
		>
			{locale}
		</div>
	)
}
