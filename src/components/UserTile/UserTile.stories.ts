import type { Meta, StoryObj } from "@storybook/react";
import UserTile from "./UserTile";

const meta: Meta<typeof UserTile> = {
    title: "Components/User Tile",
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
            component:`
            A customisable component containing information about a task including; 
            - The user image
            - The user name
            - The points earned for task completion
            - The tribe associated with the user 
            - The member since date associated with the user `,
        },
      },
    },
    component: UserTile,
  } as Meta;

  export default meta;

  type Story = StoryObj<typeof UserTile>;

  export const Primary: Story = {
    args: {
      image: "../../public/assets/images/default-profile-image.png",
      name: "Bob Maa",      
      points: 5,
      tribe: "vikings",
      memberSince: 2015,
    },
  };
