import type { Meta, StoryObj } from "@storybook/react";
import CreateGroup from "./CreateGroup";

const meta = {
  title: "Components/CreateGroup",
  tags: ["autodocs"],
  component: CreateGroup,
  parameters: {
    docs: {
      description: {
        component: "The CreateGroup component currently doesn't take any props",
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonLabel: "Create",
  },
};
