import { CardType } from "~/entites/card/model"

export type CardProps = CardType

export function Card(props: CardProps) {
	return <p>{JSON.stringify(props)}</p>
}
