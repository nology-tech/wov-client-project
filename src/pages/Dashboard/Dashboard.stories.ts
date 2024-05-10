import type { Meta, StoryObj } from "@storybook/react";
import Dashboard from "./Dashboard";

const meta: Meta<typeof Dashboard> = {
    title: "Components/Dashboard",
    component: Dashboard,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component: "Dashboard containing buttons categorising tribes, users and tasks.",
        },
      },
    },
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

export const Primary: Story = {
  args: {

  },
};