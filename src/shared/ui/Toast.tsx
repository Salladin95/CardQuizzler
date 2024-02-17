"use client"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import * as RadixToast from "@radix-ui/react-toast"
import * as Framer from "framer-motion"
import { atom, useAtom } from "jotai"
import { cn } from "~/shared/lib"
import Motions from "../lib/animations"

const toastVariants = cva("toast", {
	variants: {
		variant: {
			primary: ["toast-primary"],
			error: ["toast-error"],
			info: ["toast-info"],
		},
		size: {
			default: ["toast-size-default"],
		},
	},
	defaultVariants: {
		variant: "error",
		size: "default",
	},
})

type ToastVariant = VariantProps<typeof toastVariants>

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
	className?: string
	variant?: ToastVariant["variant"]
	size?: ToastVariant["size"]
	/**
	 * Toast title
	 * */
	title: React.ReactNode
	/**
	 * Toast description
	 * */
	description: React.ReactNode
	/**
	 * How long toast will stay
	 * */
	duration?: number
}

export const Toast = (props: ToastProps) => {
	const {
		className,
		variant,
		size,
		title,
		description,
		duration,
		...rest
		//
	} = props

	const [open, setOpen] = React.useState(true)

	return (
		<Framer.AnimatePresence>
			{open && (
				<RadixToast.Root asChild duration={duration} onOpenChange={setOpen} open={open}>
					<Framer.motion.div
						className={toastVariants({ variant, size, className })}
						// We don't use motions is UI, but Toast won't have any other views
						{...Motions.fade.right}
						{...(rest as unknown as Framer.MotionProps)}
					>
						<RadixToast.Title className="toast-title">{title}</RadixToast.Title>
						<RadixToast.Description className={"toast-description"}>{description}</RadixToast.Description>
						{/* TODO: Нужна ли нам ScrollArea тут? */}
						{/*<ScrollArea className={cls("toast-content", scrollAreaClassName)} {...restScrollArea}>
						</ScrollArea>*/}
					</Framer.motion.div>
				</RadixToast.Root>
			)}
		</Framer.AnimatePresence>
	)
}

type ToastContextType = [ToastProps[], (toasts: ToastProps[]) => void]
const ToastContext = React.createContext<ToastContextType>([] as unknown as ToastContextType)

const toastsAtom = atom<ToastProps[]>([])

export type ToastProviderProps = RadixToast.ToastProviderProps & {
	/**
	 * Toast.Viewport props
	 * */
	viewport?: RadixToast.ToastViewportProps
}
export const ToastProvider = (props: ToastProviderProps) => {
	const { children, viewport, ...rest } = props
	const { className, ...restViewport } = viewport || {}
	const toastContext = useAtom(toastsAtom)
	const [toasts, setToasts] = toastContext
	/*
	 * Clear state on mount/unmount
	 * */
	React.useEffect(() => {
		setToasts([])
	}, [setToasts])

	return (
		<ToastContext.Provider value={toastContext}>
			<RadixToast.ToastProvider {...rest}>
				{children}
				<RadixToast.Viewport className={cn("toast-viewport", className)} {...restViewport}>
					{toasts.map((toast, index) => {
						return <Toast key={index} {...toast} />
					})}
				</RadixToast.Viewport>
			</RadixToast.ToastProvider>
		</ToastContext.Provider>
	)
}

/**
 * @function useToast
 *
 * Helper to add toast to the atom
 * */
export function useToast() {
	const [toasts, setToasts] = React.useContext(ToastContext)
	return (toast: ToastProps) => {
		setToasts([...toasts, toast])
	}
}

/**
 * Wraps component with toasts context
 * */
export function withToasts<T extends Record<string, unknown>>(
	Component: React.ComponentType<T>,
	toastProps?: ToastProviderProps,
) {
	const displayName = Component.displayName || Component.name || "Component"
	const ComponentWithToasts = (props: T) => {
		return (
			<ToastProvider {...toastProps}>
				<Component {...(props as T)} />
			</ToastProvider>
		)
	}

	ComponentWithToasts.displayName = `withToasts(${displayName})`

	return ComponentWithToasts
}
