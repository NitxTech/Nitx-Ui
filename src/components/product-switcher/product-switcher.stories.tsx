import type { Meta, StoryObj } from "@storybook/react";

import { ProductSwitcher } from "./product-switcher";

const meta: Meta<typeof ProductSwitcher> = {
  title: "Components/Product Switcher",
  component: ProductSwitcher,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onLinkClick: { action: "Link Clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
