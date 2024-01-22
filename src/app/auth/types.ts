export type TabContentProps = {
	tabName: string
} & {
	onSubmit: () => void
}

export enum AuthTabsNames {
	SIGN_IN = "sign-in",
	SIGN_UP = "sign-up",
}
