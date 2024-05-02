import type { Meta, StoryObj } from "@storybook/react";
import GroupTile from "./GroupTile";


const meta: Meta = {
  title: "Components/GroupTile",
  component: GroupTile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
          A customizable component containing information about a group including; 
          -Tribe's name
          -Number of memebers
          -Total points
          -Date group started
          
          `,
      },
    },
  },
} satisfies Meta<typeof GroupTile>;



export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  args: {
   tribeName: "Yuma",
    numberOfMembers: 10,
    totalPoints: 90,
    dateGroupStarted: "02/05/2024",
}
  
};
