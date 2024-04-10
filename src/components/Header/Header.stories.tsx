import type { Meta, StoryObj } from '@storybook/react';

import Header from "./Header";

const meta: Meta = {
  title: "Component/Header",
  component: Header,
} as Meta;

export default meta;

type Story = StoryObj<typeof Header>

export const Title: Story = {
 render: () => <Header 
 title="WAY OF THE VIKINGS"
 subtitle="home"
 profileImage=""/>
}