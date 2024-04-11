import type { Meta, StoryObj } from "@storybook/react";
import LeaderboardCard from "./LeaderboardCard";

const meta: Meta<typeof LeaderboardCard> = {
  title: "Components/LeaderboardCard",
  component: LeaderboardCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LeaderboardCard>;


export const WithAllComponents: Story = {
  args: {
    name: "Sam Joyce",
    profileImage: "https://www.path.cam.ac.uk/sites/www.path.cam.ac.uk/files/media/profile_image_placeholder_41.png" ,
    totalScore: 200
  },
};
