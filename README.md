# Nitx UI Components

Reusable React components for Nitx products, including Product Switcher and User Account menu. Designed for use in Next.js and Storybook environments.

---

## Installation

```bash
npm install nitx-ui
# or
yarn add nitx-ui
```

---

## Usage

### 1. ProductSwitcher

```tsx
import { ProductSwitcher } from "nitx-ui";

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
import UserAccount from "nitx-ui/user-account";

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
