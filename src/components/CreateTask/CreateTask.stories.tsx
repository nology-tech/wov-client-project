import type {Meta, StoryObj} from "@storybook/react";
import CreateTask from "./CreateTask";

const meta = {
    title: "Components/CreateTask",
    tags: ["autodocs"],
    component: CreateTask,
    parameters: {
        docs: {
          description: {
            component:
              "The CreateTask component has 5 props: name(string), date(string), category(number), description(string) and point(number).",
          },
        },
      },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        buttonLabel: "Create"
    }
}

export const NameInput = {
    args: {
        ...Default.args,
        buttonLabel: "Creating ..."
    }
}
