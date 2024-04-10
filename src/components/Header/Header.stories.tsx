import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const WithTitle: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
  args: {
    title: "WAY OF THE VIKINGS",
  },
};

export const WithSubTitle: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
  args: {
    title: "WAY OF THE VIKINGS",
    subtitle: "Home",
  },
};

export const WithProfileImage: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
  args: {
    title: "WAY OF THE VIKINGS",
    subtitle: "Home",
    profileImage: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
  },
};
