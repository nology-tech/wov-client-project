import type { Meta, StoryObj } from '@storybook/react';
import {fn} from '@storybook/test';
import ActiveTask from "./ActiveTask";

const meta: Meta = {

    title: 'Example/ActiveTask',
    component: ActiveTask,
    parameters: {layout: 'centered', }, //centre searchbox in the storybook
    argTypes: {handleTaskCompletion: {action: 'input'},}, //log input event using addon-actions
    args: {handleTaskCompletion: fn() }, //default handleinput action
    tags: ['autodocs'], //add tags for documentation

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