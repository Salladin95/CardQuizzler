// TODO: REMOVE "use client"
"use client"
import React from "react"
import { AddIcon, Button, Input } from "~/shared"
import { TipTapEditor } from "~/features/tiptap"
import { TermType } from "~/app/models"
import { AnimatePresence, motion } from "framer-motion"
import { mockTerm } from "~/lib/mock"

export default function CreateModule() {
	const [terms, setTerms] = React.useState<TermType[]>([mockTerm()])

	function insertTerm(newTerm: TermType, at = terms.length) {
		const updatedTerms = [...terms]
		updatedTerms.splice(at, 0, newTerm)
		setTerms(updatedTerms)
	}

	const handleUpdate = React.useCallback((updatedTerm: TermType, index: number) => {
		setTerms((prevTerms) => {
			return prevTerms.map((t, i) => {
				if (i === index) {
					return updatedTerm
				}
				return t
			})
		})
	}, [])

	const handleDelete = React.useCallback((index: number) => {
		setTerms((prevTerms) => prevTerms.filter((_, i) => i !== index))
	}, [])

	React.useEffect(() => {
		// console.log(terms)
	}, [terms])

	return (
		<main className={"container"}>
			<section>
				<div className="flex justify-between mb-4">
					<h1 className={"h2"}>Создать новый модуль</h1>
					<Button className={"w-min"}>Создать</Button>
				</div>
				<Input placeholder={"Введите название молуя"} className={"mb-8"} />
				<section className={"flex flex-col gap-y-4 mb-12"}>
					<AnimatePresence initial={false}>
						{terms.map((term, index) => (
							<motion.div
								key={term.id}
								initial={{ height: 0, opacity: 0 }}
								animate={{
									opacity: 1,
									height: "auto",
								}}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.2 }}
								className={"relative"}
							>
								<CreateModuleEditor index={index} term={term} onUpdate={handleUpdate} onDelete={handleDelete} />
								<motion.div
									whileHover={{ opacity: 1 }}
									className={"w-full flex-center absolute z-50 -bottom-[13%]"}
									initial={{ opacity: 0 }}
									transition={{ opacity: { duration: 0.1 } }}
								>
									<Button variant={"secondary"} className={"w-min"} onClick={() => insertTerm(mockTerm(), index + 1)}>
										<AddIcon />
									</Button>
								</motion.div>
							</motion.div>
						))}
					</AnimatePresence>
				</section>
				<Button className={"w-min mx-auto"} onClick={() => insertTerm(mockTerm())}>
					Добавить
				</Button>
				<Button className={"w-min p-6 ml-auto"}>Создать</Button>
			</section>
		</main>
	)
}

type CreateModuleEditorProps = {
	term: TermType
	index: number
	onDelete: (index: number) => void
	onUpdate: (term: TermType, index: number) => void
}

function CreateModuleEditor(props: CreateModuleEditorProps) {
	const { onUpdate, onDelete, index, term } = props

	const handleUpdate = (updatedValues: Partial<TermType>) => {
		onUpdate({ ...term, ...updatedValues }, index)
	}

	return (
		<div className={"rounded bg-gray-800 px-8 py-4 text-white"}>
			<div className={"flex justify-between"}>
				<span>{index + 1}</span>
				<Button className={"w-min"} onClick={() => onDelete(index)} variant={"gray"}>
					Close
				</Button>
			</div>
			<div className={"flex gap-4 mb-8"}>
				<CreateModuleItem
					onUpdate={(title) => handleUpdate({ title })}
					id={`term-title-${index}`}
					title={"Термин"}
					initialContent={term.title}
				/>
				<CreateModuleItem
					onUpdate={(description) => handleUpdate({ description })}
					id={`term-description-${index}`}
					title={"Определение"}
					initialContent={term.description}
				/>
			</div>
		</div>
	)
}

type CreateModuleItemProps = {
	id: string
	title: string
	initialContent: string
	onUpdate: (content: string) => void
}

function CreateModuleItem(props: CreateModuleItemProps) {
	const { id, title, initialContent, onUpdate } = props
	return (
		<div className={"flex-1"}>
			<p className={"mb-2"}>{title}</p>
			<TipTapEditor
				options={{
					content: initialContent,
					onBlur({ editor }) {
						onUpdate(editor.getHTML())
					},
				}}
				id={id}
			/>
		</div>
	)
}
