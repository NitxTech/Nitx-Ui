import type { Meta, StoryObj } from "@storybook/react";
import UserAccount from "./account";

const meta: Meta<typeof UserAccount> = {
  title: "Components/User Account",
  component: UserAccount,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockAccounts = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    active: true,
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    active: false,
  },
];

export const Expanded: Story = {
  args: {
    accounts: mockAccounts,
    isExpanded: true,
  },
};

export const Collapsed: Story = {
  args: {
    accounts: mockAccounts,
    isExpanded: false,
  },
};
