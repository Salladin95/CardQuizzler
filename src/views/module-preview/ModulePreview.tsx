"use client"
import { WithId } from "~/app/types"
import { ModuleType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { Header, ModulePreviewCarousel } from "~/widgets"
import { DisplayEditorContent } from "~/features/quizCard/DisplayEditorContent"
import { Button, LoadingDataRenderer, Separator, UpdateTermCtxProvider, useFetchModule } from "~/shared"
import Link from "next/link"
import { ModuleContextMenu } from "~/features"
import React from "react"
import { useProtectedModuleCtx } from "~/shared/context/ProtectedModuleCtxProvider"

type ModulePreviewProps = ModuleType

function ModulePreview(module: ModulePreviewProps) {
	const t = useTranslations()
	const editorOptions = {
		editorProps: {
			attributes: {
				class: "text-primary",
			},
		},
	}
	return (
		<>
			<Header className={"container"} renderContextMenu={() => <ModuleContextMenu {...module} />} />
			<main className={"container"}>
				<div>
					<ModulePreviewCarousel module={module} />
					<div className={"text-primary flex items-center justify-between my-4"}>
						<div className={"flex gap-x-4 "}>
							<p>{module.title}</p>
							<Separator variant={"vertical"} className={"h-6"} />
							<p>{t("Module.numberOfTerms", { number: module.terms.length })}</p>
						</div>
						<div className={""}>
							<div className={"text-center"}>{t("Labels.term")}</div>
							<Separator />
							<div>{t("Labels.definition")}</div>
						</div>
					</div>
					<div className={"flex flex-col gap-y-4"}>
						<UpdateTermCtxProvider>
							{module.terms.map((term) => (
								<div key={term.id} className={"bg-gray-800 text-primary border p-4 rounded"}>
									<DisplayEditorContent
										className={"justify-start"}
										options={editorOptions}
										content={term.title}
										term={term}
									/>
									<Separator className={"my-4"} />
									<DisplayEditorContent
										className={"justify-start"}
										options={editorOptions}
										content={term.description}
										term={term}
									/>
								</div>
							))}
						</UpdateTermCtxProvider>
						<Button>
							<Link href={`/module/${module.id}`}>{t("Features.studyModule")}</Link>
						</Button>
					</div>
				</div>
			</main>
		</>
	)
}

export function ModulePreviewPage(props: WithId) {
	const protectedModuleCtx = useProtectedModuleCtx()
	const { data, isLoading, error } = useFetchModule({ id: props.id, password: protectedModuleCtx?.password })
	React.useEffect(() => {
		if (!protectedModuleCtx) return
		if (error?.status === 403) {
			protectedModuleCtx?.updatePassword("")
		}
	}, [error, isLoading, protectedModuleCtx])
	return LoadingDataRenderer<ModulePreviewProps>({ Comp: ModulePreview, data, isLoading })
}
