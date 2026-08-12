# Nitx UI Components

Reusable React components for Nitx products, including Product Switcher and User Account menu. Designed for use in Next.js and Storybook environments.

---

## Installation

```bash
npm install nitxui
# or
yarn add nitxui
```

Import the packaged stylesheet once in your app root so consumer apps do not need to scan `node_modules/nitxui` in their Tailwind config:

```tsx
import "nitxui/styles.css";
```

---

## Usage

### 1. ProductSwitcher

```tsx
import { ProductSwitcher } from "nitxui";

export default function Example() {
  return <ProductSwitcher />;
}
```

**Features:**

- Profile/account section at the top
- Grouped product links (Media Owner, Advertiser)
- Uses SVG icons and modern UI

---

### 2. UserAccount

```tsx
import UserAccount from "nitxui";

const accounts = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    imageUrl: "/avatar1.png",
    active: true,
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    imageUrl: "/avatar2.png",
    active: false,
  },
];

export default function Example() {
  return <UserAccount accounts={accounts} isExpanded={true} />;
}
```

#### Props

- `accounts`: Array of user objects `{ id, name, email, imageUrl?, active }`
- `isExpanded`: `boolean` — Show full details or just avatar
- `router?`: Optional. Pass a Next.js router or a mock for Storybook/testing

---

## Next.js & Storybook Notes

- For Next.js, the components use `next/navigation`'s `useRouter` by default.
- For Storybook or other environments, pass a mock `router` prop to avoid navigation errors.
- With `npm link` or other local package links, prefer importing `nitxui/styles.css` instead of adding the linked package to Tailwind's `content` array. This avoids slow rebuilds from scanning the whole linked repo.

---










# SpaceSelector Integration Guide

This guide demonstrates how to integrate the `SpaceSelector` component from the `nitx-ui` package into your application.

## 1. Create the API Adapter

The `SpaceSelector` (or `NitxSpaceSelector`) requires an API adapter to communicate with your backend. Use the provided factory function `createSpaceSelectorApi` from the package and pass your configured `axios` instance.

**`lib/space-selector-api.ts`**

```typescript
import axios from "@/lib/axios"; // Import your configured axios instance
// Import the factory from the package
import { createSpaceSelectorApi } from "nitx-ui";

// Create and export the adapter
export const spaceApiAdapter = createSpaceSelectorApi(axios);
```

## 2. Implement the Component

Here is an example of how to use the component within your project. The component can be imported as `SpaceSelector` and renamed if desired (e.g., `NitxSpaceSelector`).

**`components/Sidebar/MySpaceSelector.tsx`**

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpaceSelector as NitxSpaceSelector } from "nitx-ui"; // Import from the package
import { ProxySpace } from "nitx-ui"; // Import types
import { spaceApiAdapter } from "@/lib/space-selector-api"; // Import your local adapter

interface SidebarProps {
  initialSpaces: ProxySpace[];
  currentSpace: ProxySpace;
  userId: number;
}

const MySpaceSelector = ({
  initialSpaces,
  currentSpace,
  userId,
}: SidebarProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  // State management (can also be handled by context/global store)
  const [spaces, setSpaces] = useState<ProxySpace[]>(initialSpaces);
  const [activeSpace, setActiveSpace] = useState<ProxySpace | undefined>(
    currentSpace
  );

  // Handle Space Selection
  const handleSpaceSelect = (space: ProxySpace) => {
    setActiveSpace(space);
    // Example: Navigate to the selected space's dashboard
    router.push(`/dashboard/${space.proxyId}`);
  };

  return (
    <div className="w-full border-b pb-4 mb-4">
      <NitxSpaceSelector
        // Data Props
        spaces={spaces}
        activeSpace={activeSpace}
        authUser={userId}
        // Event Handlers
        onSpaceSelect={handleSpaceSelect}
        // Configuration
        api={spaceApiAdapter} // Pass the API adapter
        isExpanded={isExpanded}
        className="custom-class-if-needed"
      />

      {/* Helper to toggle view for demo purposes */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-gray-400 mt-2 ml-2"
      >
        {isExpanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default MySpaceSelector;
```

## 3. Key Concepts

- **`api` Prop**: This prop injects the backend logic using your axios instance. This keeps `nitx-ui` unopinionated about your network layer.
- **Imports**: All main components, types, and logic helpers are exported from the root `"nitxui"` package.

---

# Assets Module (v2.0.0+)

The full asset browser (folders, uploads via Uppy/TUS, rename/move/delete,
previews, links, drag-and-drop) previously copy-pasted across signage, reach,
and studio now lives here. Consumers wire it up with an adapter + provider and
render `<AssetsBrowser />` from a thin page shell.

## Requirements

- `@tanstack/react-query` v5 peer with a `QueryClientProvider` mounted above
  the provider.
- The Uppy peers (`@uppy/core`, `@uppy/react`, `@uppy/tus`, `@uppy/dropbox`,
  `@uppy/google-drive`) when the upload feature is enabled (pnpm installs
  them automatically as nitxui peers).

Everything else ships inside the package: the Uppy Dashboard stylesheet is
imported by the upload modal itself, and all card/preview artwork (folder,
processing clock, document type icons, video play badge, link fallback) is
bundled — override any of it via the provider's `images` prop if a product
wants its own look.

## 1. Mount the provider (space layout level)

Mount high enough that every consumer of the hooks (page, pickers, canvas
panels, the global upload modal) sits below it. Minimal form — the provider
builds the API from your axios instance and defaults the upload endpoints
from `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_COMPANION_URL`:

```tsx
"use client";
import { AssetsProvider } from "nitxui";
import axios from "@/lib/axios"; // must carry Authorization + X-Space-Uuid

<AssetsProvider
  client={axios}
  spaceUuid={activeSpace?.space_uuid} // queries are disabled while undefined
  upload={{ getAccessToken: () => auth?.access_token }} // getter — tokens refresh
>
  {children}
</AssetsProvider>
```

Full config when a product needs more:

```tsx
<AssetsProvider
  // `api` overrides `client` — spread-and-override for custom endpoints,
  // e.g. signage's iframe embeddability proxy:
  api={{ ...createAssetsApi(axios), checkIframeAccess: async (url) => {...} }}
  spaceUuid={activeSpace?.space_uuid}
  features={{
    folders: true,   // false = flat listing (studio mode)
    links: false,    // signage's link asset type + editor flows
    canvas: false,   // canvas asset type support
    dragDrop: false, // drag assets onto folder cards
    upload: true,
  }}
  upload={{
    getAccessToken: () => auth?.access_token,
    // endpoint / companionUrl default from env; maxFileSize /
    // allowedFileTypes override the default upload policy
  }}
  navigation={{
    // required only when features.links is on — the package never builds
    // route paths itself, so [spaceId] vs [space_id] params don't matter
    toLinkNew: () => router.push(`${base}/links/new`),
    toLinkEdit: (uuid) => router.push(`${base}/links/${uuid}`),
    fromLinksBack: () => router.push(base),
  }}
  images={{ folder: "/my-folder-art.svg" }} // optional artwork overrides
>
  {children}
</AssetsProvider>
```

## 2. Render the browser from a page shell

```tsx
"use client";
import dynamic from "next/dynamic";
const AssetsBrowser = dynamic(() => import("nitxui").then(m => m.AssetsBrowser), { ssr: false });

export default function AssetsPage() {
  return <AssetsBrowser />;
}
```

Optional props: `onTitleChange` (feed your topbar), `emptyStateImages`,
`renderAssetActions` (extra per-asset buttons, e.g. signage's send-to-screen),
`renderFolderMenuItems` (extra folder menu entries, e.g. create-sequence).

Links flows are page-content components rendered by your own route shells:

```tsx
// assets/links/[id]/page.tsx
<LinkEditor mode="edit" linkUuid={uuid} onTitleChange={...} />
// assets/links/new/page.tsx
<LinkEditor mode="create" />
```

## 3. Other exports

- `AssetsUploadModal` — controlled upload modal usable outside the browser
  (e.g. reach's email-builder flow): `open`, `onClose`, `folderUuid?`,
  `onUploadComplete?`.
- `useAssetsQuery` + mutations, `assetKeys`, `useAssetsStore`, `useLazyLoading`
  — for custom surfaces like signage's canvas AssetsPanel.
- Canonical types: `Asset`, `Folder`, `Path`, `AssetType`, `AssetsApi`.
  (The content browser's looser picker types are exported as `ContentAsset` /
  `ContentFolder` since v2.)

## i18n

All strings ship in the bundled en/ar catalogs and resolve through the
consumer's `react-i18next` language (`ar` → RTL-aware layouts). Apps without
i18next initialised render English.

## Known gotcha: duplicate preact under pnpm

Uppy's Dashboard renders with preact. If your app has another dependency
that pins its own preact (e.g. `next-auth`), pnpm can resolve **two preact
instances**, which crashes the upload modal at mount with
`Cannot read properties of undefined (reading '__H')`. Fix it in the
consuming app's `package.json` (overrides are root-only by design):

```json
"pnpm": { "overrides": { "preact": "10.29.8" } }
```

then `pnpm install` and restart the dev server. Verify with
`pnpm why preact` — exactly one version should appear.

## Known gotcha: yalc + pnpm during local development

pnpm **copies** `file:` dependencies into its store at install time, so
`yalc push` alone does not reach a pnpm app. After every push, run
`pnpm install` in the consuming app and restart its dev server (webpack
never hot-reloads node_modules). npm apps get a live symlink and only need
the dev-server restart. This only matters during the yalc phase — registry
installs behave normally.

## License

MIT

---

## Screenshots

<!-- Add screenshots or GIFs here to showcase the components -->

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Author

[Nitx Team](https://nitx.io)


