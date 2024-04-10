// Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import Navigation from "./Navigation.tsx";

const meta: Meta<typeof Navigation> = {
<<<<<<< HEAD
  title: "Component/Navigation",
  tags: ["autodocs"],
=======
  title: "Components/Navigation",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A Material UI Navigation Component",
      },
    },
  },
  component: Navigation,
>>>>>>> 2a50ae0510688dc4c30808b26f4360200ffe19ef
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

/**
 * Stories
 * @returns button with label and variant
 */

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

/**
 * Parameters
 * @returns parameters with the description of the story
 */

Home.parameters = {
  docs: {
    description: {
      story: "The Navigation with Home highlighted",
    },
  },
};

Tasks.parameters = {
  docs: {
    description: {
      story: "The Navigation with Tasks is highlighted",
    },
  },
};

Calendar.parameters = {
  docs: {
    description: {
      story: "The Navigation with Calendar is highlighted",
    },
  },
};

Leaderboard.parameters = {
  docs: {
    description: {
      story: "The Navigation with Leaderboard is highlighted",
    },
  },
};
