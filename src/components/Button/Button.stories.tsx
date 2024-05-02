import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button.tsx";

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A customizable button component.",
      },
    },
  },
  component: Button,
} as Meta;

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Stories
 * @returns button with label and variant
 */

export const Primary: Story = () => {
  return <Button label="Primary Button" variant="primary" />;
};

export const Secondary: Story = () => {
  return <Button label="Secondary Button" variant="secondary" />;
};

export const LightGrey: Story = () => {
  return <Button label="Light Grey Button" variant="light-grey" />;
};
export const LightGreyLighter: Story = () => {
  return <Button label="Light Grey Lighter Button" variant="light-grey-lighter" />;
};

export const WithOneClick: Story = () => {
  const handleClick = () => {
    alert("Button is clicked...");
  };

  return <Button label="Button with on click..." onClick={handleClick} />;
};

/**
 * Parameters
 * @returns parameters with the description of the story
 */

Primary.parameters = {
  docs: {
    description: {
      story: "A primary button with a defined label and variant.",
    },
  },
};

Secondary.parameters = {
  docs: {
    description: {
      story: "A secondary button with a defined label and variant.",
    },
  },
};

LightGrey.parameters = {
  docs: {
    description: {
      story: "A light-grey button with a defined label and variant.",
    },
  },
};

LightGreyLighter.parameters = {
  docs: {
    description: {
      story: "A light-grey button with a defined label, a variant and lighter font.",
    },
  },
};

WithOneClick.parameters = {
  docs: {
    description: {
      story: "A button with an onClick event handler.",
    },
  },
};
