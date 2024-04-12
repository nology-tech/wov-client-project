import type { Meta, StoryObj } from "@storybook/react";
import CompletedTask from "./CompletedTask";

const meta = {
  title: "Components/CompletedTask",
  tags: ["autodocs"],
  component: CompletedTask,
  parameters: {
    docs: {
      description: {
        component:
          "The CompletedTask component has 5 props: taskHeading(string), category(string), points(number), description(string) and image(url as a string). The image prop is optional.",
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const CompletedTaskWithoutMedia: Story = {
  args: {
    taskHeading: "Run 5k",
    category: "Fitness",
    points: 10,
    description: "Run as fast as you can",
  },
};

CompletedTaskWithMedia.parameters = {
  docs: {
    description: {
      story:
        "This is a story where the component has an image prop i.e the user has uploaded an image.",
    },
  },
};

CompletedTaskWithoutMedia.parameters = {
  docs: {
    description: {
      story:
        "This is a story where the component doesn't have an image prop i.e the user hasn't uploaded an image.",
    },
  },
};
