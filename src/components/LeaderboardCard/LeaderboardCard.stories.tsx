import type { Meta, StoryObj } from "@storybook/react";
import LeaderboardCard from "./LeaderboardCard";

const meta: Meta<typeof LeaderboardCard> = {
  title: "Components/LeaderboardCard",
  component: LeaderboardCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A customisable and reusable leaderboard card component.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LeaderboardCard>;


export const WithAllComponents: Story = {
  args: {
    name: "Sam Joyce",
    profileImage: "https://www.path.cam.ac.uk/sites/www.path.cam.ac.uk/files/media/profile_image_placeholder_41.png" ,
    totalScore: 200
  },


parameters: {
  docs: {
    description: {
      story: "Contains the profile picture, name and total score that can be reused to display and render for each user.",
      }
    },
  },
};
