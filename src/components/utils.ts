import { AnimationControls } from "framer-motion"
import { Card } from "~/components/AnimatedSlide/types"
import { faker, fakerEN } from "@faker-js/faker"

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

export function mockCard(): Card {
	return {
		id: faker.string.uuid(),
		title: fakerEN.word.noun(),
		description: faker.word.words(),
	}
}

export function asyncMockCard(): Promise<Card> {
	return Promise.resolve(mockCard())
}

export function mockCards(amount = 10): Card[] {
	return Array.from({ length: amount }, mockCard)
}

export function asyncMockCards(amount = 10): Promise<Card[]> {
	const promises = Array.from({ length: amount }, asyncMockCard)
	return Promise.all(promises)
}
