import type { Meta, StoryObj } from "@storybook/react";
import ButtonContainer from "./ButtonContainer";

const meta: Meta<typeof ButtonContainer> = {
    title: "Components/Button Container",
    component: ButtonContainer,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component: "Buttons categorising groups, users and tasks.",
        },
      },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonContainer>;

export const Primary: Story = {
  args: {

  },
};