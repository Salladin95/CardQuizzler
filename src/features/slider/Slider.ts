import { withSlider } from "~/features/slider/withSlider"
import { CardType } from "~/features/quizCard/model"
import { Card } from "~/entites/card"

const Slider = withSlider<CardType>(Card)
export { Slider }
