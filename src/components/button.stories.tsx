import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button"; // Import the component

// Metadata for the component story
const meta: Meta<typeof Button> = {
  title: "Components/Button", // Title in the Storybook sidebar
  component: Button,
  tags: ["autodocs"], // Enables automatic documentation generation
  argTypes: {
    // Define controls for props
    children: { control: "text", description: "Button contents" },
    variant: { control: "radio", options: ["primary", "secondary"] },
    onClick: { action: "clicked", description: "Optional click handler" },
  },
};

export default meta;

// Define a "story" type
type Story = StoryObj<typeof Button>;

// Create the primary story using args
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

// Create the secondary story
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};
