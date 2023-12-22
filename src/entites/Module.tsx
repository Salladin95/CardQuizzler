type ModuleProps = {
	title: string
	amountOfTerms: number
}

export function Module(props: ModuleProps) {
	const { title, amountOfTerms } = props
	return (
		<div className={"panel rounded"}>
			<p className={"mb-1 text-body-2"}>
				Всего терминов: <span className={"italic"}>{amountOfTerms}</span>
			</p>
			<h1 className={"h3"}>{title}</h1>
		</div>
	)
}
