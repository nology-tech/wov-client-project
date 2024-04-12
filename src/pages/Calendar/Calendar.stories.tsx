import type { Meta, StoryObj } from "@storybook/react";
import Calendar from "./Calendar";

const meta = {
  title: "Pages/Calendar",
  tags: ["autodocs"],
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          "The calender page displays a calender and the completed tasks for the current date. By clicking on a previous date, the completed tasks for that date can be viewed.",
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CalendarDemo: Story = {};
