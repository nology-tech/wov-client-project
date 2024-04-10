import type { Meta, StoryObj } from "@storybook/react";
import CompletedTask from "./CompletedTask";

/** The CompletedTask component has 5 props: taskHeading(string), category(string), points(number), description(string) and image(url as a string). The image prop is optional.*/

const meta = {
  title: "Components/CompletedTask",
  tags: ["autodocs"],
  component: CompletedTask,
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** This is a story where the component has an image prop i.e the user has uploaded an image. */

export const CompletedTaskWithMedia: Story = {
  args: {
    taskHeading: "Run 5k",
    category: "Fitness",
    points: 10,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
  },
};

/** This is a story where the component doesn't have an image prop i.e the user hasn't uploaded an image. */

export const CompletedTaskWithoutMedia: Story = {
  args: {
    taskHeading: "Run 5k",
    category: "Fitness",
    points: 10,
    description: "Run as fast as you can",
  },
};
