/**
 * Calculates the move distance and target rotation based on the current window width.
 * @returns {Object} An object containing moveDistance and targetRotation.
 * @property {number} moveDistance - The calculated move distance based on window width.
 * @property {number} targetRotation - The target rotation angle based on the move distance.
 */
export function calculateMoveParameters(): { moveDistance: number; targetRotation: number } {
	const moveDistance = window.innerWidth + 100
	const targetRotation = moveDistance > 820 ? 90 : 60
	return { moveDistance, targetRotation }
}
