import React from "react"
import { useWindowSize } from "react-use"
import ConfettiComp from "react-confetti"

type ConfettiProps = React.ComponentPropsWithoutRef<typeof ConfettiComp> & {
	duration?: number
}

export function Confetti(props: ConfettiProps) {
	const { duration = 6000, ...rest } = props
	const [run, setRun] = React.useState(true)
	const { width, height } = useWindowSize()

	React.useEffect(() => {
		setTimeout(() => setRun(false), duration)
	}, [duration])

	return <ConfettiComp width={width} height={height} recycle={run} run={true} numberOfPieces={500} {...rest} />
}
