import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

const DropdownMenuDemo = () => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger />

			<DropdownMenu.Portal>
				<DropdownMenu.Content>
					<DropdownMenu.Label />
					<DropdownMenu.Item />

					<DropdownMenu.Group>
						<DropdownMenu.Item />
					</DropdownMenu.Group>

					<DropdownMenu.CheckboxItem>
						<DropdownMenu.ItemIndicator />
					</DropdownMenu.CheckboxItem>

					<DropdownMenu.RadioGroup>
						<DropdownMenu.RadioItem value={""}>
							<DropdownMenu.ItemIndicator />
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>

					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger />
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent />
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>

					<DropdownMenu.Separator />
					<DropdownMenu.Arrow />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}

export default DropdownMenuDemo
