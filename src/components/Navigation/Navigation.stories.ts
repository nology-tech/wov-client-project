// Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Navigation from "./Navigation.tsx";

const meta: Meta<typeof Navigation> = {
  title: "Component/Navigation",
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    docs: {
      description: {
        component: "A customizable button component.",
      },
    },
  },
  component: Navigation,
} as Meta;

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Home: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
};

export const Tasks: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/tasks" },
    }),
  },
  args: {
    navActionIndex: 1,
  },
};

export const Calendar: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/calendar" },
    }),
  },
  args: {
    navActionIndex: 2,
  },
};

export const Leaderboard: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/leaderboard" },
    }),
  },
  args: {
    navActionIndex: 3,
  },
};
