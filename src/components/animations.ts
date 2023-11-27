import { AnimationControls } from "framer-motion"

/**
 * Animates rotation and horizontal movement.
 * @param {number} to - The target horizontal position.
 * @param {number} rotation - The rotation angle.
 * @param {AnimationControls} controls - Animation controls from framer-motion.
 */
export function rotateAndMoveSmoothly(to: number, rotation: number, controls: AnimationControls) {
	const duration = Math.min(Math.abs(to) * 0.001, 0.8) // Adjust the factor as needed
	return controls.start({
		rotate: rotation,
		translateX: to,
		transition: { duration, ease: "easeOut" },
	})
}
