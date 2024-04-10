// Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Navigation from "./Navigation.tsx";

const meta: Meta<typeof Navigation> = {
  title: "Example/Navigation",
  component: Navigation,
  decorators: [withRouter],
};

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