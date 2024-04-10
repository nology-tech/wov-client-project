// Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import Profile from "./Profile.tsx";

const meta: Meta<typeof Profile> = {
  title: "Component/Profile",
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
    id: 1,
    img: "https://picsum.photos/200/300",
    score: 300,
    name: "Athish Thayalan",
    bio: "Passionate about technology and innovation.",
    email: "athish.thayalan@example.com",
    password: "password1",
  },
};

export const Todd: Story = {
  args: {
    id: 2,
    img: "https://picsum.photos/200/300",
    score: 450,
    name: "Todd Griffin",
    bio: "Adventure seeker with a love for coding.",
    email: "todd.griffin@example.com",
    password: "password2",
  },
};

export const EditProfile: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/editprofile" },
    }),
  },
  args: {
    navActionIndex: 3,
  },
};
