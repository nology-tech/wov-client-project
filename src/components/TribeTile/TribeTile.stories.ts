import type { Meta, StoryObj } from "@storybook/react";
import TribeTile from "./TribeTile";


const meta: Meta = {
  title: "Components/TribeTile",
  component: TribeTile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
          A customizable component containing information about a tribe including; 
          -Tribe's name
          -Number of members
          -Total points
          -Date tribe started
          `,
      },
    },
  },
} satisfies Meta<typeof TribeTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tribe: Story = {
  args: {
   tribeName: "Yuma",
    numberOfMembers: 10,
    totalPoints: 90,
    dateTribeStarted: "02/05/2024",
}
};
