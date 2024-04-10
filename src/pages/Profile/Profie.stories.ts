import type { Meta, StoryObj } from "@storybook/react";
import Profile from "./Profile.tsx";
import { randomUserProfiles } from "./mockData.ts";

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
        component:
          "A Navigation component that adjusts based on current page selected.",
      },
    },
  },
  component: Profile,
} as Meta;

export default meta;

type Story = StoryObj<typeof Profile>;

export const Athish: Story = {
  args: {
    user: randomUserProfiles[0],
  },
};

export const Todd: Story = {
  args: {
    user: randomUserProfiles[1],
  },
};

/**
 * Parameters
 * @returns parameters with the description of the story
 */

Athish.parameters = {
  docs: {
    description: {
      story:
        "An instance of the profile component filled with the user profile corresponding to Athish",
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
