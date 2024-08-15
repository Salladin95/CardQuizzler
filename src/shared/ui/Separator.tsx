import { cn } from "~/shared"
import * as RadixSeparator from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

const separatorVariants = cva("bg-primary", {
	variants: {
		variant: {
			vertical: "w-[1px]",
			horizontal: "h-[1px] w-[100%]",
		},
	},
	defaultVariants: {
		variant: "horizontal",
	},
})
type SeparatorVariant = VariantProps<typeof separatorVariants>
type SeparatorProps = {
	variant?: SeparatorVariant["variant"]
	className?: string
}

export function Separator(props: SeparatorProps) {
	const { variant, className } = props
	const orientation = variant || "vertical"
	return (
		<RadixSeparator.Root
			className={cn(separatorVariants({ variant }), className)}
			decorative
			orientation={orientation}
		/>
	)
}
