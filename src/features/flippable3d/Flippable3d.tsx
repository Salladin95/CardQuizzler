import React from "react"
import { motion } from "framer-motion"
import { cn } from "~/lib"
import { PropsWithChildren, PropsWithClassName } from "~/app/types"

export function Flippable3d() {
	const [flipped, setFlipped] = React.useState(false)
	return (
		<div className={"w-[400px] perspective-1000"} onClick={() => setFlipped(!flipped)}>
			<motion.div
				animate={{
					rotateY: flipped ? 180 : 0,
					transition: { duration: 1 },
				}}
				className={"relative px-[5rem] py-[15rem] transform-style-3d"}
			>
				<Flippable3dContent
					style={{
						backgroundColor: "rgba(255, 163, 42, 0.2)",
						backgroundImage: "url(https://i.pinimg.com/564x/15/dc/30/15dc30af29194fa3b91e9de015eb646b.jpg)",
					}}
					className={
						"text-white before:absolute before:content-[''] before:inset-[1rem] before:border-3px before:transform before:translate-z-[2rem]"
					}
				>
					<p className="transform translate-z-[3rem] text-14px">DC Universe</p>
					<h1 className="transform translate-z-[4.4rem] text-20px">Flash</h1>
					<p className="transform translate-z-[3rem] text-14px">2023</p>
				</Flippable3dContent>
				<Flippable3dContent
					className={
						"text-yellow-200 text-center transform rotate-y-180 bg-[url('https://media.discordapp.net/attachments/1008571088919343124/1075699957471924316/CG_Kakashi_The_Flash_Portrait_red_and_yellow_lightning_costume__b186f92b-8566-47d3-9eef-6f82b437b15d.png?width=598&height=598')]"
					}
				>
					<div className="transform translate-z-[4rem] rotate-y-0 text-[2rem] font-bold">The Flash</div>
					<div className="text-12px">
						<span>Synopsis: </span>The Flash travels through time to prevent the murder of his mother, but unwittingly
						causes changes that result in the creation of a multiverse.
					</div>
					<div className="text-14px">
						<span>Genre: </span>Action, Adventure, Sci-Fi
					</div>
					<div className="text-14px">
						<span>Release Date: </span>16 June, 2023
					</div>
				</Flippable3dContent>
			</motion.div>
		</div>
	)
}

type Flippable3dContentProps = {
	style?: React.CSSProperties
} & PropsWithClassName &
	PropsWithChildren

export function Flippable3dContent(props: Flippable3dContentProps) {
	const { className, children, style } = props
	return (
		<div
			className={cn(
				"absolute inset-0 transform-style-3d backface-hidden bg-cover bg-blend-overlay bg-no-repeat flex-center flex-col",
				className,
			)}
			style={style}
		>
			{children}
		</div>
	)
}
