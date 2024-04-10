// Button.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
//import HomeIcon from "@mui/icons-material/Home";
// import MapIcon from "@mui/icons-material/Map";
// import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
//import Link from "react-router-dom";

import Navigation from "./Navigation.tsx";

const meta: Meta<typeof Navigation> = {
  title: "Example/Navigation",
  component: Navigation,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Navigation>;

// export const Primary: Story = {
//   args: {
//     primary: true,
//     label: "Click",
//     backgroundColor: "red",
//   },
// };

export const Home: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "./home",
      },
    }),
  },
};

export const Tasks: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "./Tasks",
      },
    }),
  },
};

export const Calendar: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "./Tasks",
      },
    }),
  },
};

// export const Leaderboard: Story {

// }
