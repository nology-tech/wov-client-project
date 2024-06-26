import type { Meta, StoryObj } from "@storybook/react";
import HeaderHome from "./HeaderHome";

const meta: Meta<typeof HeaderHome> = {
    title: "Components/HeaderHome",
    component: HeaderHome,
    tags: ["autodocs"],
  };

  export default meta;

  type Story = StoryObj<typeof HeaderHome>;

export const WithAllComponents: Story = {
    args: {
      date: "29 April 2024",
      location: "Malvern Hills",
      image: "https://s3-alpha-sig.figma.com/img/9003/31aa/6dd32f49cc5bf6f29932b0481a2af856?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrjVJj2XFAnoifxYaGoHI0CfbBKprDFMJqDeV1ur21HRwi~j1ZYNRCW-3LPZchYU-brnUydqEOyJ8eUfwA9nB6ATjPomas0~pIPizR9gu2Je79kN9EP1pmgZjI3K6aKUXz7IoMgEErOcHxjXyt42pBlu1Ym8~HfjFPcrLW1igtrvA6JO9y997SJDeldC1ENK0Y8myy9wViW54XoUX1ripSdMlgX9NG2pa--C1P1eafFfIzyQyWrB-Uz8e9eWq0va0JvsDInxsaRT1wOvxHVAxGc~nyK5VJwcSVlplUeTEEL~fMMPrn31K8dbJHlxd0bGEGobas-1vWFzvzv~01QwUw__"
    },
  };
