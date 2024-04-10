import type { Meta, StoryObj } from '@storybook/react';
import ActiveTask from "./ActiveTask";

const meta: Meta = {

    title: 'Example/ActiveTask',
    component: ActiveTask,
    tags: ['autodocs'], 

} satisfies Meta<typeof ActiveTask>; 

export default meta;
type Story = StoryObj<typeof meta>; 

export const Primary: Story = {
    args: {
        requirement: "Get up early",
        category: "Routine",
        points: 5,
    }
}