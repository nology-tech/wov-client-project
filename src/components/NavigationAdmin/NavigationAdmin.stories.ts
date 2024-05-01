import type {Meta, StoryObj} from "@storybook/react"
import {reactRouterParameters, withRouter} from "storybook-addon-remix-react-router"
import NavigationAdmin from "./NavigationAdmin"

const meta: Meta<typeof NavigationAdmin> = {
    title: "Components/NavigationAdmin",
    tags: ["autodocs"],
    parameters: {
        docs:{
            description: {
                component: "A Material UI Navigation Admin Component"
            }
        }
    },
    component: NavigationAdmin,
    decorators: [withRouter]
} as Meta;

export default meta;

type Story = StoryObj<typeof NavigationAdmin>

export const Home: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {path: "/" }
        })
    }
}

export const Create: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {path: "/create"}
        })
    },
    args:{
        navActionIndex: 1,
    }
}

export const Reporting: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {path: "/reporting"}
        })
    },
    args:{
        navActionIndex: 2,
    }
}
export const Calender: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {path: "/calender"}
        })
    },
    args:{
        navActionIndex: 3,
    }
}
export const Leaderboard: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {path: "/leaderboard"}
        })
    },
    args:{
        navActionIndex: 4,
    }
}

Home.parameters = {
    docs:{
        description:{
            story: "The Navigation Admin with Home highlighted"
        }
    }
}

Create.parameters = {
    docs:{
        description:{
            story: "The Navigation Admin with Home highlighted"
        }
    }
}

Reporting.parameters = {
    docs:{
        description:{
            story: "The Navigation Admin with Reporting highlighted"
        }
    }
}

Calender.parameters = {
    docs:{
        description:{
            story: "The Navigation Admin with Calender highlighted"
        }
    }
}

Leaderboard.parameters = {
    docs:{
        description:{
            story: "The Navigation Admin with Leaderboard highlighted"
        }
    }
}




