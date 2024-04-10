import type { Meta, StoryObj } from "@storybook/react";
import ActiveTaskTile from "./ActiveTaskTile";

const meta: Meta = {
  title: "Components/ActiveTaskTile",
  component: ActiveTaskTile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:`
          A customizable component containing information about a task including; 
          - The task requirement
          - The task cateory
          - The points earned for task completion
          - A checkbox showing complete / incomplete tasks
          `,
      },
    },
  },
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
