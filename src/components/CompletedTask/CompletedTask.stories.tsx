import type { Meta, StoryObj } from "@storybook/react";
import CompletedTask from "./CompletedTask";

const meta = {
  title: "Components/CompletedTask",
  tags: ["autodocs"],
  component: CompletedTask,
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** The CompletedTask component has 5 props: taskHeading(string), category(string), points(number), description(string) and image(url as a string). */

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
