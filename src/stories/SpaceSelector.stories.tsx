import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SpaceSelector } from "../components/space-selector/SpaceSelector";
import type { ProxySpace } from "../components/space-selector/types";

const mockSpaces: ProxySpace[] = [
  {
    space_uuid: "space-alpha",
    proxyId: "space-alpha",
    name: "Main Headquarters",
    total_members: 12,
    role: "owner",
  },
  {
    space_uuid: "space-beta",
    proxyId: "space-beta",
    name: "Dubai Media City Display",
    total_members: 8,
    role: "editor",
  },
  {
    space_uuid: "space-gamma",
    proxyId: "space-gamma",
    name: "Riyadh Digital Boulevard",
    total_members: 24,
    role: "viewer",
  },
  {
    space_uuid: "space-delta",
    proxyId: "space-delta",
    name: "Cairo Mall Kiosks",
    total_members: 5,
    role: "owner",
  },
  {
    space_uuid: "space-epsilon",
    proxyId: "space-epsilon",
    name: "London Flagship Store",
    total_members: 19,
    role: "manager",
  },
];

const meta: Meta<typeof SpaceSelector> = {
  title: "Components/SpaceSelector",
  component: SpaceSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpaceSelector>;

export const Default: Story = {
  render: () => {
    const [spaces] = useState<ProxySpace[]>(mockSpaces);
    const [activeSpace, setActiveSpace] = useState<ProxySpace | undefined>(mockSpaces[0]);

    return (
      <div className="w-[320px] p-6 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-xs uppercase font-bold text-zinc-500 tracking-wider">
            Active Space:
          </p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {activeSpace?.name || "None"}
          </p>
        </div>
        <SpaceSelector
          spaces={spaces}
          activeSpace={activeSpace}
          onSpaceSelect={(space) => {
            setActiveSpace(space);
          }}
          authUser="demo-user-123"
          isExpanded={true}
        />
      </div>
    );
  },
};

export const BrowserMode: Story = {
  render: () => {
    const [spaces] = useState<ProxySpace[]>(mockSpaces);
    const [activeSpace, setActiveSpace] = useState<ProxySpace | undefined>(mockSpaces[1]);

    return (
      <div className="w-[720px] max-w-full p-6 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <SpaceSelector
          showtype="Browser"
          spaces={spaces}
          activeSpace={activeSpace}
          onSpaceSelect={(space) => {
            setActiveSpace(space);
          }}
          authUser="demo-user-123"
        />
      </div>
    );
  },
};

export const CollapsedRail: Story = {
  render: () => {
    const [spaces] = useState<ProxySpace[]>(mockSpaces);
    const [activeSpace, setActiveSpace] = useState<ProxySpace | undefined>(mockSpaces[0]);

    return (
      <div className="w-[72px] p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-center">
        <SpaceSelector
          spaces={spaces}
          activeSpace={activeSpace}
          onSpaceSelect={(space) => {
            setActiveSpace(space);
          }}
          authUser="demo-user-123"
          isExpanded={false}
        />
      </div>
    );
  },
};
