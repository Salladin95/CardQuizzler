import cls from "classnames"
import { CardType } from "~/features/quizCard/model"
import { WithOptionalClassName } from "~/app/types"

export type CardProps = Pick<CardType, "title"> & WithOptionalClassName

export function Card(props: CardProps) {
	const { className, title } = props
	return <div className={cls("card", className)}>{title}</div>
}
