"use client"
import React from "react"
import { Button, Input, Loader } from "~/shared"
import { useSignInMutation } from "~/api"
import { useRouter } from "next/navigation"

export default function SignIn() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	const router = useRouter()
	const signIn = useSignInMutation({ onSuccess: () => router.push("/") })

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault()
		signIn.mutate({ email, password })
	}

	return (
		<section className={"container pt-20 text-white"}>
			<h1 className={"h1 text-center mb-4"}>Войти</h1>
			<form className={"768:w-640 640:w-428 mx-auto"} onSubmit={handleSubmit}>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="email">
						Почта
					</label>
					<Input
						placeholder={"Введите почту..."}
						className={"mt-2 mb-4"}
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						id={"email"}
						autoComplete={"username"}
						required
					/>
				</fieldset>
				<fieldset>
					<label className={"cursor-pointer"} htmlFor="password">
						Пароль
					</label>
					<Input
						className={"mt-2 mb-8"}
						placeholder={"Введите пароль..."}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						id={"password"}
						autoComplete={"current-password"}
						required
					/>
				</fieldset>
				<Button
					loading={signIn.isLoading}
					disabled={!email || !password}
					type={"submit"}
					className={"max-w-[20rem] mx-auto"}
				>
					{signIn.isLoading && <Loader className={"absolute-center"} variant={"secondary"} />}
					Войти
				</Button>
			</form>
		</section>
	)
}
