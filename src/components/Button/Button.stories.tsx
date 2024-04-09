import { Meta, StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

const meta = {
  title: "Components/Button",
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

/**
 * Stories
 * @returns button with label and variant
 */

export const Primary: StoryFn<ButtonProps> = () => {
  return <Button label="Primary Button" variant="primary" />;
};

export const Secondary: StoryFn<ButtonProps> = () => {
  return <Button label="Secondary Button" variant="secondary" />;
};

export const LightGrey: StoryFn<ButtonProps> = () => {
  return <Button label="Light Grey Button" variant="light-grey" />;
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
