import {Meta, StoryObj} from "@storybook/react"
import DropdownMenu from "./DropdownMenu"

const meta = {
	title: "Components/DropdownMenu",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A customisable dropdown menu.",
			},
		},
	},
	component: DropdownMenu,
} as Meta

export default meta;

// type Story = StoryObj<typeof DropdownMenu>;
