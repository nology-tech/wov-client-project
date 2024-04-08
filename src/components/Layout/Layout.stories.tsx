import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";

const meta = {
  title: "Components/Layout",
  tags: ["autodocs"],
  component: Layout,
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleChildrenLayout: Story = {
  args: {
    children: <header>This is the header</header>,
  },
};

export const MultipleChildrenLayout: Story = {
  args: {
    children: (
      <>
        <header>This is the header</header>
        <main>This is the main content</main>
        <footer>This is the footer</footer>
      </>
    ),
  },
};
