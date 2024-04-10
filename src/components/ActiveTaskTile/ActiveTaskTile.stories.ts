import type { Meta, StoryObj } from "@storybook/react";
import ActiveTaskTile from "./ActiveTaskTile";

const meta: Meta = {
  title: "Example/ActiveTaskTile",
  component: ActiveTaskTile,
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveTaskTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    requirement: "Get up early",
    category: "Routine",
    points: 5,
  },
};
