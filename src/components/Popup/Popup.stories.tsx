import { Meta, StoryObj } from "@storybook/react";
import Popup from "./Popup";

const meta = {
  title: "Components/Popup",
  component: Popup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A customizable popup component",
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof Popup>;

export const TaskCompleted: Story = () => {
  return (
    <Popup
      heading="Task Completed"
      labelButtonOne="ADD MEDIA"
      labelButtonTwo="VIEW LEADERBOARD"
      onButtonOne={() => alert("Button to add media was clicked.")}
      onButtonTwo={() => alert("Button to view leaderboard was clicked.")}
      descriptionShown={false}
    />
  );
};

export const AddMedia: Story = () => {
  return (
    <Popup
      heading="ADD MEDIA"
      labelButtonOne="ADD PHOTOS"
      labelButtonTwo="UPDATE TASKS"
      onButtonOne={() => alert("Button to add photos was clicked.")}
      onButtonTwo={() => alert("Button to update tasks was clicked.")}
      descriptionShown={true}
    />
  );
};

TaskCompleted.parameters = {
  docs: {
    description: {
      story:
        "A popup displayed when a task is completed, providing options to add media or view the leaderboard.",
    },
  },
};

AddMedia.parameters = {
  docs: {
    description: {
      story:
        "A popup displayed when a add media button is clicked, providing options to add a description, photos and update task.",
    },
  },
};
