import { SelectOption } from "~/app/types"
import { Radio, RadioProps } from "~/shared"

export type RadioGroupProps = RadioProps & {
	className?: string
	radioClassName?: string
	options: SelectOption<string | number>[]
}
export const RadioGroup = (props: RadioGroupProps) => {
	const { className, radioClassName, options, ...rest } = props
	return (
		<fieldset className={className}>
			{options.map((option) => {
				return <Radio className={radioClassName} key={option.value} {...option} {...rest} />
			})}
		</fieldset>
	)
}
