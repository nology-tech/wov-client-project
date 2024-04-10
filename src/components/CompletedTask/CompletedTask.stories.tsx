import type { Meta, StoryObj } from "@storybook/react";
import CompletedTask from "./CompletedTask";

const meta = {
  title: "Components/CompletedTask",
  tags: ["autodocs"],
  component: CompletedTask,
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompletedTaskComponent: Story = {
  args: {
    taskHeading: "Run 5k",
    category: "Fitness",
    points: 10,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
  },
};
