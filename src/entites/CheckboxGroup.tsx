import { SelectOption } from "~/app/types"
import { Checkbox, CheckboxProps } from "~/shared"

export type CheckboxGroupProps = CheckboxProps & {
	options: SelectOption<string | number>[]
}
export const CheckboxGroup = (props: CheckboxGroupProps) => {
	const { name, className, options, error, ...rest } = props
	return (
		<div className={className}>
			{options.map((option, index) => {
				return <Checkbox error={error} key={index} name={name} {...option} {...rest} />
			})}
		</div>
	)
}
