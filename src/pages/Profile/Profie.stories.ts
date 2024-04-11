import type { Meta, StoryObj } from "@storybook/react";
import Profile from "./Profile.tsx";
import { randomUserProfiles } from "./mockData.ts";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

/**
 * Stories
 * @returns button with label and variant
 */

const meta: Meta<typeof Profile> = {
  title: "Components/Profile",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
        A profile component that display profile information related to the signed in user; 
        - Image 
        - Score
        - Name
        - Bio
        - Starred out password
        
        `,
      },
    },
  },
  component: Profile,
  decorators: [withRouter],
} as Meta;

export default meta;

type Story = StoryObj<typeof Profile>;

export const JohnDoe: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
  args: {
    user: randomUserProfiles[0],
  },
};

export const Todd: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
  args: {
    user: randomUserProfiles[1],
  },
};

/**
 * Parameters
 * @returns parameters with the description of the story
 */

JohnDoe.parameters = {
  docs: {
    description: {
      story:
        "An instance of the profile component filled with the user profile corresponding to John Doe",
    },
  },
};

Todd.parameters = {
  docs: {
    description: {
      story:
        "An instance of the profile component filled with the user profile corresponding to Todd",
    },
  },
};
