# Nitx UI Components

Reusable React components for Nitx products, including Product Switcher and User Account menu. Designed for use in Next.js and Storybook environments.

---

## Installation

```bash
npm install nitxui
# or
yarn add nitxui
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
- **Imports**: All main components, types, and logic helpers are exported from the root `"nitx-ui"` package.



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


