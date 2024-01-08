"use client"
import React from "react"
import { WithId } from "~/app/types"
import { MouseSensor, TouchSensor } from "./lib/smartMouseSensor"
import { closestCenter, DndContext, DragEndEvent, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

export type SortableGroupData<DataT> = { items: DataT[] }

type SortableGroupProps<DataT> = {
	dndProps?: React.ComponentPropsWithoutRef<typeof DndContext>
	onReorder: (data: DataT[]) => void
} & SortableGroupData<DataT>

export function withSortableGroup<ItemsData extends WithId, Extra>(
	Component: React.ComponentType<SortableGroupData<ItemsData> & Extra>,
) {
	function SortableGroup(props: SortableGroupProps<ItemsData> & Extra) {
		const { items, onReorder, dndProps, ...rest } = props
		const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

		function handleDragEnd(event: DragEndEvent) {
			const { active, over } = event

			if (over && active.id !== over.id) {
				const oldIndex = items.findIndex((item) => item.id === active.id)
				const newIndex = items.findIndex((item) => item.id === over.id)
				onReorder(arrayMove(items, oldIndex, newIndex))
			}
		}

		return (
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} {...dndProps}>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					<Component items={items} {...(rest as Extra)} />
				</SortableContext>
			</DndContext>
		)
	}

	return SortableGroup
}
