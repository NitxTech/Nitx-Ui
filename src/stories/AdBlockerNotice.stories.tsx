import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdBlockerNotice, AdBlockerPage } from "../components/ad-blocker";

const meta: Meta<typeof AdBlockerNotice> = {
  title: "Components/AdBlockerNotice",
  component: AdBlockerNotice,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["page", "banner", "card", "dialog"],
    },
    forceShow: {
      control: "boolean",
    },
    showInstructions: {
      control: "boolean",
    },
    showRecheckButton: {
      control: "boolean",
    },
    showDismissButton: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdBlockerNotice>;

/**
 * Design Page (Light Mode) matching the exact brand screenshot (Image 1).
 * Features centered pink scalloped badge, title, allowlist message, and Nitx watermark.
 */
export const DesignPageLight: Story = {
  args: {
    variant: "page",
    forceShow: true,
  },
  render: (args) => (
    <div className="min-h-screen w-full bg-white text-neutral-900">
      <AdBlockerNotice {...args} />
    </div>
  ),
};

/**
 * Design Page (Dark Mode) matching the brand watermark in dark mode (Image 2).
 */
export const DesignPageDark: Story = {
  args: {
    variant: "page",
    forceShow: true,
  },
  render: (args) => (
    <div className="dark min-h-screen w-full bg-black text-white">
      <AdBlockerNotice {...args} />
    </div>
  ),
};

/**
 * Design Page (Arabic RTL) with full RTL alignment and Arabic copy.
 */
export const DesignPageArabicRTL: Story = {
  args: {
    variant: "page",
    forceShow: true,
  },
  render: (args) => (
    <div dir="rtl" className="min-h-screen w-full bg-white text-neutral-900 font-sans">
      <AdBlockerNotice {...args} />
    </div>
  ),
};

/**
 * Standalone AdBlockerPage component demonstration.
 */
export const StandalonePage: StoryObj<typeof AdBlockerPage> = {
  render: () => (
    <AdBlockerPage
      allowUrl="https://nitx.io"
      serviceName="the AppLovin Ads dashboard."
      showRecheckButton={true}
    />
  ),
};

/**
 * Banner variant for embedding inside dashboard layouts or topbars.
 */
export const BannerVariant: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    variant: "banner",
    forceShow: true,
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <AdBlockerNotice {...args} />
    </div>
  ),
};

/**
 * Card variant for embedding on ad units or publisher setup pages.
 */
export const CardVariant: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    variant: "card",
    forceShow: true,
  },
  render: (args) => (
    <div className="w-full max-w-xl mx-auto p-4">
      <AdBlockerNotice {...args} />
    </div>
  ),
};

/**
 * Modal dialog variant for critical blocking popups.
 */
export const DialogVariant: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    variant: "dialog",
    forceShow: true,
  },
  render: (args) => (
    <div className="w-full text-center py-10">
      <AdBlockerNotice {...args} />
    </div>
  ),
};
