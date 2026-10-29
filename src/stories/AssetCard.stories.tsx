import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AssetCard, { AssetCardSkeleton } from "../components/assets/components/AssetCard";
import { AssetsProvider } from "../components/assets/context";
import type { Asset } from "../components/assets/types";
import { assetCardIconButtonClass } from "../components/assets/lib/card-styles";

const mockImageAsset: Asset = {
  id: 1,
  uuid: "asset-image-1",
  name: "BRAUN NEW",
  type: "image",
  is_ready: true,
  image: {
    thumbnail_path:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80",
    size: "2.4 MB",
  },
} as unknown as Asset;

const mockVideoAsset: Asset = {
  id: 2,
  uuid: "asset-video-1",
  name: "BRAUN NEW 2026 Real",
  type: "video",
  is_ready: true,
  video: {
    thumbnail_path:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    size: "18.6 MB",
  },
} as unknown as Asset;

const mockDocAsset: Asset = {
  id: 3,
  uuid: "asset-doc-1",
  name: "BRAUN NEW 2026 Real",
  type: "document",
  is_ready: true,
  document: {
    mime_type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: "540 KB",
  },
} as unknown as Asset;

const mockPdfAsset: Asset = {
  id: 4,
  uuid: "asset-pdf-1",
  name: "Specification Sheet 2026",
  type: "document",
  is_ready: true,
  document: {
    mime_type: "application/pdf",
    size: "1.2 MB",
  },
} as unknown as Asset;

const mockProcessingAsset: Asset = {
  id: 5,
  uuid: "asset-proc-1",
  name: "Rendering Campaign Video",
  type: "video",
  is_ready: false,
} as unknown as Asset;

const SendToScreenDemoButton = () => (
  <button
    type="button"
    className={assetCardIconButtonClass}
    title="Send to screen"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="m12 17-3 3h6l-3-3" />
      <path d="m12 7 3 3" />
      <path d="M12 7 9 10" />
      <path d="M12 7v7" />
    </svg>
  </button>
);

const meta: Meta<typeof AssetCard> = {
  title: "Assets/AssetCard",
  component: AssetCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AssetsProvider spaceUuid="storybook-space">
        <div className="w-[240px] p-4 bg-background">
          <Story />
        </div>
      </AssetsProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

export const ImageAsset: Story = {
  args: {
    data: mockImageAsset,
    viewType: "grid",
    allowSelect: false,
    selected: false,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const VideoAsset: Story = {
  args: {
    data: mockVideoAsset,
    viewType: "grid",
    allowSelect: false,
    selected: false,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const DocumentAsset: Story = {
  args: {
    data: mockDocAsset,
    viewType: "grid",
    allowSelect: false,
    selected: false,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const PdfAsset: Story = {
  args: {
    data: mockPdfAsset,
    viewType: "grid",
    allowSelect: false,
    selected: false,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const SelectedState: Story = {
  args: {
    data: mockImageAsset,
    viewType: "grid",
    allowSelect: true,
    selected: true,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const ProcessingState: Story = {
  args: {
    data: mockProcessingAsset,
    viewType: "grid",
    allowSelect: false,
    selected: false,
    onMove: () => {},
    renderActions: () => <SendToScreenDemoButton />,
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[240px]">
      <AssetCardSkeleton viewType="grid" />
    </div>
  ),
};

export const ResponsiveGridDemo: Story = {
  render: () => (
    <div className="w-full max-w-4xl p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <AssetCard
          data={mockImageAsset}
          viewType="grid"
          allowSelect={false}
          selected={false}
          onMove={() => {}}
          renderActions={() => <SendToScreenDemoButton />}
        />
        <AssetCard
          data={mockVideoAsset}
          viewType="grid"
          allowSelect={false}
          selected={false}
          onMove={() => {}}
          renderActions={() => <SendToScreenDemoButton />}
        />
        <AssetCard
          data={mockDocAsset}
          viewType="grid"
          allowSelect={false}
          selected={false}
          onMove={() => {}}
          renderActions={() => <SendToScreenDemoButton />}
        />
        <AssetCard
          data={mockPdfAsset}
          viewType="grid"
          allowSelect={true}
          selected={true}
          onMove={() => {}}
          renderActions={() => <SendToScreenDemoButton />}
        />
      </div>
    </div>
  ),
};
