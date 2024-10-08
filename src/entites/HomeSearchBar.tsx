"use client"
import React from "react"
import { AccessType } from "~/app/types"
import { useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { FolderType, isFolder, ModuleType } from "~/app/models"
import {
	Autocomplete,
	AutocompleteProps,
	ClosedBookIcon,
	cn,
	debounce,
	FolderIcon,
	generateLink,
	Loader,
	SearchIcon,
	Separator,
	useInfiniteFoldersByTitle,
	useInfiniteModulesByTitle,
	useProfile,
} from "~/shared"

type Hint = FolderType | ModuleType

type RenderHintsProps = {
	uid?: string
	title: string
	onLoadingChange: (isLoading: boolean) => void
}

function RenderHints(props: RenderHintsProps) {
	const { uid, onLoadingChange, title } = props
	const router = useRouter()

	const enabled = Boolean(title)

	const ref = React.useRef(null)
	const isInView = useInView(ref)

	const {
		data: infiniteFoldersData,
		isPending: isFoldersLoading,
		hasNextPage: hasFoldersNextPage,
		fetchNextPage: fetchFoldersNextPage,
		isFetchingNextPage: isLoadingFoldersNextPage,
	} = useInfiniteFoldersByTitle(title, { enabled })

	const {
		data: infiniteModulesData,
		isPending: isModulesLoading,
		hasNextPage: hasModulesNextPage,
		fetchNextPage: fetchModulesNextPage,
		isFetchingNextPage: isLoadingModulesNextPage,
	} = useInfiniteModulesByTitle(title, { enabled })

	function filterHints(h: { access: AccessType; userID: string }) {
		return uid === h.userID || h.access !== AccessType.ONLY_ME
	}

	const moduleHintsMap = new Map<string, ModuleType>()
	infiniteModulesData?.pages.forEach((pageData) =>
		pageData.filter(filterHints).forEach((hint) => moduleHintsMap.set(hint.id, hint)),
	)

	const foldersHintsMap = new Map<string, FolderType>()
	infiniteFoldersData?.pages.forEach((pageData) =>
		pageData.filter(filterHints).forEach((hint) => foldersHintsMap.set(hint.id, hint)),
	)

	const folderHints: FolderType[] = Array.from(foldersHintsMap, ([_, value]) => value)
	const moduleHints: ModuleType[] = Array.from(moduleHintsMap, ([_, value]) => value)

	const hints = title ? [...moduleHints, ...folderHints] : []

	function handleClick(hint: Hint) {
		const link = generateLink<Hint>(hint, uid)
		link && router.push(link)
	}

	React.useEffect(() => {
		const isLoading =
			enabled && (isModulesLoading || isFoldersLoading || isLoadingFoldersNextPage || isLoadingModulesNextPage)
		onLoadingChange(isLoading)
	}, [isFoldersLoading, onLoadingChange, enabled, isModulesLoading, isLoadingFoldersNextPage, isLoadingModulesNextPage])

	React.useEffect(() => {
		if (isInView && title) {
			hasModulesNextPage && fetchModulesNextPage()
			hasFoldersNextPage && fetchFoldersNextPage()
		}
	}, [fetchFoldersNextPage, fetchModulesNextPage, hasFoldersNextPage, hasModulesNextPage, isInView, title])

	return (
		<ul>
			{hints.map((hint, i) => {
				return (
					<li
						className={"p-1 cursor-pointer text-primary hover:text-sub-primary transition-colors"}
						key={hint.id}
						onClick={() => handleClick(hint)}
						tabIndex={0}
					>
						<div className={"flex justify-between items-center mb-2"}>
							<span className={""}>{hint.title}</span>
							<span>
								{isFolder(hint) ? <FolderIcon className={"text-white"} /> : <ClosedBookIcon className={"text-white"} />}
							</span>
						</div>
						<Separator className={cn("", { hidden: hints.length - 1 === i })} />
					</li>
				)
			})}
			<div ref={ref} />
		</ul>
	)
}

type HomeSearchBarProps = Omit<AutocompleteProps, "renderHints">

export function HomeSearchBar(props: HomeSearchBarProps) {
	const { data: profile } = useProfile()

	const [isLoading, setIsLoading] = React.useState(false)

	const [title, setTitle] = React.useState("")

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedTitle = e.target.value
		setTitle(updatedTitle)
	}

	const handleChange = debounce(onChange, 300)

	return (
		<Autocomplete
			suffix={isLoading ? <Loader size={"sm"} className={"fill-primary"} /> : <SearchIcon />}
			onChange={handleChange}
			{...props}
			renderHints={() => (
				<RenderHints title={title} uid={profile?.id} onLoadingChange={(isPending) => setIsLoading(isPending)} />
			)}
		/>
	)
}
