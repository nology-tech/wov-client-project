import type { Meta, StoryObj } from "@storybook/react";
  
import TaskTile from "./TaskTile";

const meta: Meta<typeof TaskTile> = {
    title: "Components/Task Tile",
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
            component:`
            A customisable component containing information about a task including; 
            - The task name
            - The task requirement
            - The task category
            - The points earned for task completion
            - The edit button to edit information
            `,
        },
      },
    },
    component: TaskTile,
  } as Meta;

  export default meta;

  type Story = StoryObj<typeof TaskTile>;

  
  export const Primary: Story = {
    args: {
      name: "5am wake up",
      requirement: "Daily",
      category: "Routine",
      points: 5,
    },
  };
