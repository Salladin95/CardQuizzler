import { AnimationControls } from "framer-motion"

/**
 * Animates rotation and horizontal movement.
 * @param {number} to - The target horizontal position.
 * @param {number} rotation - The rotation angle.
 * @param {AnimationControls} controls - Animation controls from framer-motion.
 */
export function rotateAndMoveSmoothly(to: number, rotation: number, controls: AnimationControls) {
	return controls.start({
		rotate: rotation,
		translateX: to,
		transition: { duration: 0.2, ease: "easeOut" },
	})
}

/**
 * Animates an element onto the screen using the provided move distance and target rotation values.
 * @param {AnimationControls} controls - The distance to move during the animation.
 * @param {number} moveDistance - The distance to move during the animation.
 * @param {number} targetRotation - The target rotation angle for the animation.
 * @returns {Promise<void>} A promise that resolves when the animation is complete.
 */
export async function animateOntoScreen(
	controls: AnimationControls,
	moveDistance: number,
	targetRotation: number,
): Promise<void> {
	return controls.start({
		x: [moveDistance, 0], // Animate from off-screen to the left to on-screen
		rotate: [targetRotation, 0], // Animate rotation from the specified angle to 0
	})
}

export function moveCardToItsInitialPosition(controls: AnimationControls) {
	return controls.start({ rotate: 0, x: 0, y: 0 }, { duration: 0.2, ease: "easeOut" })
}
