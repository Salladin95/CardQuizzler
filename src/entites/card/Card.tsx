import { cn } from "~/utils"
import { CardType } from "~/features/quizCard/model"
import { WithOptionalClassName } from "~/app/types"

export type CardProps = Pick<CardType, "title"> & WithOptionalClassName

export function Card(props: CardProps) {
	const { className, title } = props
	return <div className={cn("card", className)}>{title}</div>
}
