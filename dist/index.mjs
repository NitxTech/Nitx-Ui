// src/components/ui/dropdown-menu.tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/dropdown-menu.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover dark:border-zinc-700/50 p-1 text-popover-foreground shadow-lg dark:shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-zinc-800 p-1 text-popover-foreground shadow-lg shadow-zinc-200/50 dark:shadow-none border-zinc-300/50 dark:border-zinc-700/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted dark:bg-zinc-700", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// src/components/ui/button.tsx
import * as React2 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-zinc-100 text-secondary-foreground hover:bg-zinc-100/80 border border-zinc-200/50",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-[10px] px-8",
        icon: "h-10 w-10 rounded-[10px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx2(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/product-switcher/product-switcher.tsx
import { ChevronRight as ChevronRight2, Grip } from "lucide-react";

// src/components/product-switcher/product-icon.tsx
import Image from "next/image";
import Link from "next/link";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductIcon = ({
  id,
  image,
  title,
  url,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs2(
    Link,
    {
      id,
      "data-testid": `product-${id}`,
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `flex items-center w-full p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:border-zinc-700/50 transition ${className}`,
      children: [
        /* @__PURE__ */ jsx3(Image, { width: 28, height: 28, src: image, alt: title, className: "mr-3" }),
        /* @__PURE__ */ jsx3("span", { className: "font-medium text-sm", children: title })
      ]
    }
  );
};
var product_icon_default = ProductIcon;

// src/components/product-switcher/product-switcher.tsx
import { useEffect, useState } from "react";

// src/components/ui/avatar.tsx
import * as React3 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx4 } from "react/jsx-runtime";
var Avatar = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// src/components/product-switcher/product-switcher.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var profileIcon = "https://ui-avatars.com/api/?name=SALT&background=000&color=fff&rounded=true";
var ProductSwitcher = ({
  auth_user,
  profileImage,
  profileName
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const profile = {
    name: "Manage My Account",
    icon: profileIcon,
    url: `${process.env.NEXT_PUBLIC_MY_NITX_URL}/${auth_user}` || "#"
  };
  const products = [
    {
      id: "nitx-signage",
      title: "Nitx Signage",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/signage-icon.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-publisher",
      title: "Nitx Publisher",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/publisher-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-ads",
      title: "Nitx Ads",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/ads-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-studio",
      title: "Nitx Studio",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/studio-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-reach",
      title: "Nitx Reach",
      image: "https://res.cloudinary.com/dj3rzny5p/image/upload/v1765777010/Nitx_Reach_Group_1_h6bsbj.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_REACH_URL}/${auth_user}` || "#"
    }
  ];
  return /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
    /* @__PURE__ */ jsx5(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx5(Button, { size: "icon", variant: "outline", className: "shadow-none", children: /* @__PURE__ */ jsx5(Grip, { className: "w-6 h-6" }) }) }),
    /* @__PURE__ */ jsxs3(DropdownMenuContent, { align: "end", className: "w-80 p-4 rounded-2xl", children: [
      /* @__PURE__ */ jsxs3(
        "a",
        {
          id: "manage-my-account",
          "data-testid": "product-manage-my-account",
          href: profile.url,
          target: "_blank",
          className: "flex items-center w-full p-3 gap-2 rounded-xl border dark:border-zinc-700/50 mb-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:hover:text-white transition",
          children: [
            /* @__PURE__ */ jsxs3(Avatar, { className: "rounded-[6px] size-8", children: [
              /* @__PURE__ */ jsx5(
                AvatarImage,
                {
                  className: "rounded-[6px] size-8 overflow-clip",
                  src: `${profileImage}`
                }
              ),
              /* @__PURE__ */ jsx5(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${(profileName || "User").split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")}` })
            ] }),
            /* @__PURE__ */ jsx5("span", { className: "flex-1 text-left font-medium", children: profile.name }),
            /* @__PURE__ */ jsx5(ChevronRight2, { className: "size-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-2 gap-3 mb-4", children: products.map((product) => /* @__PURE__ */ jsx5(product_icon_default, { ...product }, product.id)) })
    ] })
  ] });
};

// src/components/user-account/account.tsx
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronDown, LogOut, PlusSquare } from "lucide-react";
import { useEffect as useEffect2, useState as useState2 } from "react";
import Link2 from "next/link";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var UserAccount = ({
  accounts,
  isExpanded,
  auth_user
}) => {
  const [onOpen, setOnOpen] = useState2(false);
  const [isMounted, setIsMounted] = useState2(false);
  const [isMobile, setIsMobile] = useState2(false);
  const router = useRouter();
  useEffect2(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  if (!isMounted) return null;
  const sortedAccounts = [...accounts].sort(
    (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)
  );
  const activeAccount = sortedAccounts?.find((account) => account.active) || sortedAccounts[0];
  const handleSignOut = async () => {
    router.replace(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/signout?session=${auth_user}`
    );
  };
  if (!activeAccount) return null;
  const shouldShowCompact = !isExpanded || isMobile;
  return /* @__PURE__ */ jsx6("div", { className: "relative w-full", children: /* @__PURE__ */ jsxs4(DropdownMenu, { onOpenChange: () => setOnOpen(!onOpen), children: [
    /* @__PURE__ */ jsx6(DropdownMenuTrigger, { asChild: true, children: shouldShowCompact ? /* @__PURE__ */ jsxs4(
      Avatar,
      {
        className: cn(
          "rounded-[10px] size-10 lg:size-[40px] overflow-clip cursor-pointer mx-auto"
        ),
        children: [
          /* @__PURE__ */ jsx6(AvatarImage, { src: `${activeAccount?.imageUrl}` }),
          /* @__PURE__ */ jsx6(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${activeAccount.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")}` })
        ]
      }
    ) : /* @__PURE__ */ jsxs4(
      "div",
      {
        className: cn(
          "w-10 h-10 lg:w-full lg:h-auto border border-zinc-100 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-700/50 lg:p-3 rounded-[16px] flex items-center gap-2 overflow-hidden cursor-pointer transitio-all duration-300 hover:border-primary ",
          onOpen && "border-primary"
        ),
        children: [
          /* @__PURE__ */ jsxs4(
            Avatar,
            {
              className: cn(
                "rounded-[10px] size-10 lg:size-12 overflow-clip"
              ),
              children: [
                /* @__PURE__ */ jsx6(AvatarImage, { src: `${activeAccount?.imageUrl}` }),
                /* @__PURE__ */ jsx6(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${activeAccount.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")}` })
              ]
            }
          ),
          /* @__PURE__ */ jsxs4("div", { className: "w-full hidden lg:flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs4("div", { className: "w-full flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsx6("span", { className: "text-sm max-w-[80%] truncate ", children: activeAccount.name }),
              /* @__PURE__ */ jsx6("p", { className: "text-xs max-w-[80%] truncate", children: activeAccount.email })
            ] }),
            /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6(
              ChevronDown,
              {
                className: cn(
                  "size-4 transition ease-linear duration-300",
                  onOpen && "-scale-y-100"
                )
              }
            ) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs4(DropdownMenuContent, { className: "xl:min-w-[260px] w-full bg-white dark:bg-zinc-800 rounded-[20px] p-1 shadow-sm dark:shadow-none border dark:border-zinc-700/50 mb-1 flex-col gap-1", children: [
      sortedAccounts.map(
        (account) => account.active ? /* @__PURE__ */ jsxs4(
          DropdownMenuItem,
          {
            className: "w-full h-auto p-3 rounded-[16px] flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300",
            children: [
              /* @__PURE__ */ jsxs4(Avatar, { className: "rounded-sm size-12", children: [
                /* @__PURE__ */ jsx6(
                  AvatarImage,
                  {
                    className: "rounded-[10px] size-12 overflow-clip",
                    src: `${account.imageUrl}`
                  }
                ),
                /* @__PURE__ */ jsx6(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${account.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")}` })
              ] }),
              /* @__PURE__ */ jsxs4("div", { className: "w-full flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsx6("span", { className: "text-sm truncate", children: account.name }),
                /* @__PURE__ */ jsx6("p", { className: "text-xs truncate", children: account.email })
              ] }),
              /* @__PURE__ */ jsx6(BadgeCheck, { className: "w-4 h-4 mr-1 text-white fill-primary" })
            ]
          },
          account.id
        ) : /* @__PURE__ */ jsx6(
          DropdownMenuItem,
          {
            className: "w-full h-auto p-3 rounded-[16px] flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300",
            asChild: true,
            children: /* @__PURE__ */ jsxs4(
              "a",
              {
                href: `${window.location.origin}/${accounts.indexOf(
                  account
                )}/1`,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  display: "flex",
                  alignItems: "center",
                  width: "100%"
                },
                children: [
                  /* @__PURE__ */ jsxs4(Avatar, { className: "rounded-sm size-12", children: [
                    /* @__PURE__ */ jsx6(
                      AvatarImage,
                      {
                        className: "rounded-[10px] size-12 overflow-clip",
                        src: `${account.imageUrl}`
                      }
                    ),
                    /* @__PURE__ */ jsx6(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${account.name.split(" ").map((n) => n[0].toUpperCase()).join("")}` })
                  ] }),
                  /* @__PURE__ */ jsxs4("div", { className: "w-full flex flex-col gap-0.5", children: [
                    /* @__PURE__ */ jsx6("span", { className: "text-sm truncate", children: account.name }),
                    /* @__PURE__ */ jsx6("p", { className: "text-xs truncate", children: account.email })
                  ] })
                ]
              }
            )
          },
          account.id
        )
      ),
      /* @__PURE__ */ jsx6(
        DropdownMenuItem,
        {
          asChild: true,
          className: "xl:min-w-[260px] w-full dark:hover:bg-zinc-700/60 hover:bg-zinc-100 rounded-lg py-3 px-4 mb-1 gap-1",
          children: /* @__PURE__ */ jsxs4(
            Link2,
            {
              target: "_blank",
              href: `${process.env.NEXT_PUBLIC_AUTH_URL}?new_session=1`,
              children: [
                /* @__PURE__ */ jsx6(PlusSquare, { className: "w-4 h-4 stroke-[1.5]" }),
                "Add another account"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx6(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs4(
        DropdownMenuItem,
        {
          onClick: handleSignOut,
          className: "w-full flex justify-start p-4 gap-3 items-center transition ease-in-out text-sm rounded-[16px] text-red-500 hover:bg-zinc-100/60 dark:hover:bg-zinc-700/60",
          children: [
            /* @__PURE__ */ jsx6(LogOut, { className: "w-4 h-4 stroke-[1.5]" }),
            "Sign Out"
          ]
        }
      )
    ] })
  ] }) });
};

// src/components/space-selector/SpaceSelector.tsx
import { useMemo, useState as useState10 } from "react";
import {
  Building2,
  CheckCircle,
  ChevronDown as ChevronDown4,
  SquareArrowOutUpRight,
  SquarePlus,
  Users2 as Users22
} from "lucide-react";

// src/components/space-selector/lib/utils.ts
import { clsx as clsx2 } from "clsx";
import { twMerge as twMerge2 } from "tailwind-merge";
function cn2(...inputs) {
  return twMerge2(clsx2(inputs));
}

// src/components/space-selector/ui/dropdown-menu.tsx
import * as React4 from "react";
import * as DropdownMenuPrimitive2 from "@radix-ui/react-dropdown-menu";
import { Check as Check2, ChevronRight as ChevronRight3, Circle as Circle2 } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var DropdownMenu2 = DropdownMenuPrimitive2.Root;
var DropdownMenuTrigger2 = React4.forwardRef(({ onClick, onMouseDown, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.Trigger,
  {
    ref,
    onMouseDown: (e) => {
      e.stopPropagation();
      e.preventDefault();
      onMouseDown?.(e);
    },
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    },
    ...props
  }
));
DropdownMenuTrigger2.displayName = DropdownMenuPrimitive2.Trigger.displayName;
var DropdownMenuSubTrigger2 = React4.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs5(
  DropdownMenuPrimitive2.SubTrigger,
  {
    ref,
    className: cn2(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "ps-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx7(ChevronRight3, { className: "ms-auto" })
    ]
  }
));
DropdownMenuSubTrigger2.displayName = DropdownMenuPrimitive2.SubTrigger.displayName;
var DropdownMenuSubContent2 = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.SubContent,
  {
    ref,
    className: cn2(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=start]:slide-in-from-end-2 data-[side=end]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent2.displayName = DropdownMenuPrimitive2.SubContent.displayName;
var DropdownMenuContent2 = React4.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx7(DropdownMenuPrimitive2.Portal, { children: /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.Content,
  {
    ref,
    sideOffset,
    className: cn2(
      "z-[10002] w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg shadow-zinc-200/50 border-zinc-300/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=start]:slide-in-from-end-2 data-[side=end]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent2.displayName = DropdownMenuPrimitive2.Content.displayName;
var DropdownMenuItem2 = React4.forwardRef(({ className, inset, onClick, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.Item,
  {
    ref,
    className: cn2(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "ps-8",
      className
    ),
    onClick: (e) => {
      e.stopPropagation();
      onClick?.(e);
    },
    ...props
  }
));
DropdownMenuItem2.displayName = DropdownMenuPrimitive2.Item.displayName;
var DropdownMenuCheckboxItem2 = React4.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs5(
  DropdownMenuPrimitive2.CheckboxItem,
  {
    ref,
    className: cn2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx7("span", { className: "absolute start-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx7(Check2, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem2.displayName = DropdownMenuPrimitive2.CheckboxItem.displayName;
var DropdownMenuRadioItem2 = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs5(
  DropdownMenuPrimitive2.RadioItem,
  {
    ref,
    className: cn2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx7("span", { className: "absolute start-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx7(Circle2, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem2.displayName = DropdownMenuPrimitive2.RadioItem.displayName;
var DropdownMenuLabel2 = React4.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.Label,
  {
    ref,
    className: cn2(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "ps-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel2.displayName = DropdownMenuPrimitive2.Label.displayName;
var DropdownMenuSeparator2 = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive2.Separator,
  {
    ref,
    className: cn2("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator2.displayName = DropdownMenuPrimitive2.Separator.displayName;
var DropdownMenuShortcut2 = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx7(
    "span",
    {
      className: cn2("ms-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut2.displayName = "DropdownMenuShortcut";

// src/components/space-selector/ui/skeleton.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    "div",
    {
      className: cn2(
        "animate-shimmer rounded-md bg-gray-300/50 dark:bg-gray-700/50",
        className
      ),
      ...props
    }
  );
}

// src/components/space-selector/SpaceSelector.tsx
import { useTranslation as useTranslation10 } from "react-i18next";

// src/components/space-selector/context.tsx
import { createContext, useContext, useState as useState3 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var SpaceSelectorContext = createContext(void 0);
var useSpaceSelector = () => {
  const context = useContext(SpaceSelectorContext);
  if (!context) {
    throw new Error(
      "useSpaceSelector must be used within a SpaceSelectorProvider"
    );
  }
  return context;
};
var SpaceSelectorProvider = ({
  children,
  activeSpace,
  spaces,
  onSpaceSelect,
  onRefreshSpaces,
  authUser,
  api,
  isExpanded = true
}) => {
  const [activeModal, setActiveModal] = useState3(null);
  const [modalProps, setModalProps] = useState3({});
  const setModal = (modal) => {
    setActiveModal(modal);
    if (modal === null) setModalProps({});
  };
  return /* @__PURE__ */ jsx9(
    SpaceSelectorContext.Provider,
    {
      value: {
        activeSpace,
        spaces,
        isExpanded,
        setActiveSpace: onSpaceSelect,
        refreshSpaces: onRefreshSpaces || (() => {
        }),
        activeModal,
        setModal,
        modalProps,
        setModalProps,
        api,
        authUser
      },
      children
    }
  );
};

// src/components/space-selector/components/modals/BrowseSpaceModal.tsx
import { useEffect as useEffect4, useState as useState6 } from "react";
import { useTranslation as useTranslation5 } from "react-i18next";

// src/components/space-selector/ui/drawer-dialog.tsx
import * as React8 from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useMediaQuery } from "usehooks-ts";

// src/components/space-selector/ui/dialog.tsx
import * as React6 from "react";
import { useTranslation } from "react-i18next";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn2(
      "fixed inset-0 z-[9999] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    style: { pointerEvents: "auto" },
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React6.forwardRef(({ className, children, overlayClassName, ...props }, ref) => {
  const { t } = useTranslation("components");
  return /* @__PURE__ */ jsxs6(DialogPortal, { children: [
    /* @__PURE__ */ jsx10(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxs6(
      DialogPrimitive.Content,
      {
        ref,
        className: cn2(
          "fixed left-[50%] top-[50%] z-[10000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        ),
        style: { pointerEvents: "auto" },
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs6(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-[10001]", children: [
            /* @__PURE__ */ jsx10(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx10("span", { className: "sr-only", children: t("dialog.close") })
          ] })
        ]
      }
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx10(
  "div",
  {
    className: cn2("flex flex-col text-center sm:text-left", className),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx10(
  "div",
  {
    className: cn2(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  DialogPrimitive.Title,
  {
    ref,
    className: cn2(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  DialogPrimitive.Description,
  {
    ref,
    className: cn2("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/space-selector/ui/drawer.tsx
import * as React7 from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ jsx11(
  DrawerPrimitive.Root,
  {
    shouldScaleBackground,
    ...props
  }
);
Drawer.displayName = "Drawer";
var DrawerTrigger = DrawerPrimitive.Trigger;
var DrawerPortal = DrawerPrimitive.Portal;
var DrawerClose = DrawerPrimitive.Close;
var DrawerOverlay = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx11(
  DrawerPrimitive.Overlay,
  {
    ref,
    className: cn2("fixed inset-0 z-[9999] bg-black/80", className),
    style: { pointerEvents: "auto" },
    ...props
  }
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
var DrawerContent = React7.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs7(DrawerPortal, { children: [
  /* @__PURE__ */ jsx11(DrawerOverlay, {}),
  /* @__PURE__ */ jsxs7(
    DrawerPrimitive.Content,
    {
      ref,
      className: cn2(
        "fixed inset-x-0 bottom-0 z-[10000] mt-24 flex h-auto flex-col rounded-t-[10px] border-0 bg-background px-2",
        className
      ),
      style: { pointerEvents: "auto" },
      ...props,
      children: [
        /* @__PURE__ */ jsx11("div", { className: "mx-auto mt-4 h-3 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx11(
  "div",
  {
    className: cn2("grid gap-1.5 p-4 text-center sm:text-left", className),
    ...props
  }
);
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx11(
  "div",
  {
    className: cn2("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  }
);
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx11(
  DrawerPrimitive.Title,
  {
    ref,
    className: cn2(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
var DrawerDescription = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx11(
  DrawerPrimitive.Description,
  {
    ref,
    className: cn2("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

// src/components/space-selector/ui/drawer-dialog.tsx
import { ChevronLeft } from "lucide-react";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var sizeVariants = {
  default: "sm:max-w-[500px]",
  sm: "sm:max-w-[320px]",
  md: "sm:max-w-[640px]",
  lg: "sm:max-w-[768px]",
  xl: "sm:max-w-[900px]",
  "2xl": "sm:max-w-[1024px]"
};
function DrawerDialog({
  title,
  description,
  children,
  className,
  size = "default",
  back,
  onClose,
  open = true,
  overlayClassName
}) {
  const { t } = useTranslation2("components");
  const [isMounted, setIsMounted] = React8.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1140px)");
  const handleChange = (isOpen) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };
  React8.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  if (isDesktop) {
    return /* @__PURE__ */ jsx12(Dialog, { open, onOpenChange: handleChange, children: /* @__PURE__ */ jsxs8(
      DialogContent,
      {
        overlayClassName,
        className: cn2(
          "flex flex-col gap-4 max-h-[96vh] pt-0 border-none overflow-hidden",
          sizeVariants[size],
          className
        ),
        children: [
          back && /* @__PURE__ */ jsxs8(
            "button",
            {
              className: "flex items-center hover:scale-95 hover:opacity-80 transition-all duration-300 w-fit p-5 pb-0",
              onClick: back,
              children: [
                /* @__PURE__ */ jsx12(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                t("drawerDialog.back")
              ]
            }
          ),
          title || description || back ? /* @__PURE__ */ jsxs8(DialogHeader, { className: "p-5 h-auto flex-shrink-0", children: [
            /* @__PURE__ */ jsx12(
              DialogTitle,
              {
                className: cn2(!title && " sr-only", !!back && "text-lg"),
                children: title
              }
            ),
            /* @__PURE__ */ jsx12(VisuallyHidden.Root, { children: title || t("drawerDialog.modalTitle") }),
            /* @__PURE__ */ jsx12(DialogDescription, { className: "text-sm", children: description })
          ] }) : /* @__PURE__ */ jsx12(VisuallyHidden.Root, { children: /* @__PURE__ */ jsx12(DialogTitle, { children: t("drawerDialog.modalTitle") }) }),
          /* @__PURE__ */ jsx12("div", { className: "flex-grow flex flex-col min-h-0 w-full overflow-y-auto", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsx12(Drawer, { open, onOpenChange: handleChange, children: /* @__PURE__ */ jsxs8(DrawerContent, { className: " max-h-[calc(100vh-3rem)]", children: [
    /* @__PURE__ */ jsxs8(DrawerHeader, { className: "text-left px-0 pb-0", children: [
      /* @__PURE__ */ jsx12(DialogTrigger, { className: "sr-only", children: title }),
      title,
      /* @__PURE__ */ jsx12(DrawerDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx12("div", { className: "flex flex-col h-auto overflow-y-auto", children })
  ] }) });
}

// src/components/space-selector/ui/button.tsx
import * as React9 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx13 } from "react/jsx-runtime";
var buttonVariants2 = cva2(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        smlg: "h-11 rounded-[12px] px-4",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button2 = React9.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot2 : "button";
    return /* @__PURE__ */ jsx13(
      Comp,
      {
        className: cn2(buttonVariants2({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button2.displayName = "Button";

// src/components/space-selector/ui/search-input.tsx
import { SearchIcon } from "lucide-react";

// src/components/space-selector/ui/input.tsx
import * as React10 from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var Input = React10.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx14(
      "input",
      {
        type,
        className: cn2(
          "flex h-12 w-full text-zinc-800 dark:text-zinc-300 rounded-[10px] border border-input bg-background px-3 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/space-selector/ui/search-input.tsx
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
var SearchInput = (props) => {
  return /* @__PURE__ */ jsxs9("div", { className: "relative flex-grow", children: [
    /* @__PURE__ */ jsx15(
      Input,
      {
        type: "search",
        placeholder: "Search...",
        className: "w-full p-6 border-gray-300 rounded-lg shadow-none",
        ...props
      }
    ),
    /* @__PURE__ */ jsx15(SearchIcon, { className: "w-4 h-4 absolute top-1/2 end-4 -translate-y-1/2 text-gray-400" })
  ] });
};
var search_input_default = SearchInput;

// src/components/space-selector/components/modals/BrowseSpaceModal.tsx
import { SquarePlusIcon } from "lucide-react";

// src/components/space-selector/ui/card.tsx
import * as React11 from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var Card = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "div",
  {
    ref,
    className: cn2(
      "rounded-lg border bg-card text-card-foreground  ",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "div",
  {
    ref,
    className: cn2("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "div",
  {
    ref,
    className: cn2(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "div",
  {
    ref,
    className: cn2("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16("div", { ref, className: cn2("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "div",
  {
    ref,
    className: cn2("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/space-selector/components/SpaceCard.tsx
import { MoreHorizontal, Pen, Trash2, Users2 } from "lucide-react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { useState as useState5 } from "react";
import { toast } from "sonner";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
var SpaceCard = ({ id, name, members, className }) => {
  const { t } = useTranslation3("components");
  const [isLoading, setIsLoading] = useState5(false);
  const {
    setModal,
    setModalProps: setProps,
    api,
    refreshSpaces
  } = useSpaceSelector();
  const handleDeleteSpace = async () => {
    if (!api?.deleteSpace) return;
    setIsLoading(true);
    try {
      await api.deleteSpace(id);
      toast.success(t("spaceCard.spaceDeletedSuccessfully", { name }));
      refreshSpaces();
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error(t("spaceCard.errorDeletingSpace"));
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs10(
    Card,
    {
      className: cn2(
        "shadow-none bg-white border-[.5px] p-3 w-full lg:w-auto min-w-72 flex gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs10("div", { className: "w-full flex-1 flex gap-4 items-center", children: [
          /* @__PURE__ */ jsx17("div", { children: /* @__PURE__ */ jsx17("div", { className: "w-10 h-10 lg:w-[50px] lg:h-[50px] bg-[#007AFF1A] rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs10(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "55",
              height: "55",
              viewBox: "0 0 55 55",
              fill: "none",
              children: [
                /* @__PURE__ */ jsx17(
                  "rect",
                  {
                    width: "55",
                    height: "55",
                    rx: "13",
                    fill: "#007AFF",
                    fillOpacity: "0.1"
                  }
                ),
                /* @__PURE__ */ jsx17(
                  "path",
                  {
                    d: "M32.6371 26.7579L32.7808 26.279L32.7808 26.279L32.6371 26.7579ZM23.3335 24.7502C23.0574 24.7502 22.8335 24.974 22.8335 25.2502C22.8335 25.5263 23.0574 25.7502 23.3335 25.7502V24.7502ZM26.0835 25.7502C26.3596 25.7502 26.5835 25.5263 26.5835 25.2502C26.5835 24.974 26.3596 24.7502 26.0835 24.7502V25.7502ZM23.3335 28.4168C23.0574 28.4168 22.8335 28.6407 22.8335 28.9168C22.8335 29.193 23.0574 29.4168 23.3335 29.4168V28.4168ZM26.0835 29.4168C26.3596 29.4168 26.5835 29.193 26.5835 28.9168C26.5835 28.6407 26.3596 28.4168 26.0835 28.4168V29.4168ZM22.6853 32.852L22.3318 32.4984L22.3318 32.4984L22.6853 32.852ZM17.8335 36.6668C17.5574 36.6668 17.3335 36.8907 17.3335 37.1668C17.3335 37.443 17.5574 37.6668 17.8335 37.6668V36.6668ZM36.1668 37.6668C36.443 37.6668 36.6668 37.443 36.6668 37.1668C36.6668 36.8907 36.443 36.6668 36.1668 36.6668V37.6668ZM18.2502 37.1668C18.2502 37.443 18.474 37.6668 18.7502 37.6668C19.0263 37.6668 19.2502 37.443 19.2502 37.1668H18.2502ZM19.4754 19.1344L19.1661 18.7415L19.1661 18.7415L19.4754 19.1344ZM23.4046 19.4934L23.2652 19.9736L23.2652 19.9736L23.4046 19.4934ZM27.9879 20.8238L28.1273 20.3436L28.1273 20.3436L27.9879 20.8238ZM30.294 21.8948L29.8904 22.1899L29.8904 22.19L30.294 21.8948ZM30.1668 37.1668C30.1668 37.443 30.3907 37.6668 30.6668 37.6668C30.943 37.6668 31.1668 37.443 31.1668 37.1668H30.1668ZM30.6668 26.1668L30.5232 26.6457L32.4934 27.2368L32.6371 26.7579L32.7808 26.279L30.8105 25.6879L30.6668 26.1668ZM32.6371 26.7579L32.4934 27.2368C33.1341 27.429 33.5733 27.5616 33.9005 27.7028C34.2156 27.8387 34.3769 27.9626 34.4866 28.11L34.8877 27.8115L35.2889 27.513C35.036 27.1733 34.7015 26.9592 34.2966 26.7846C33.9037 26.6151 33.3989 26.4644 32.7808 26.279L32.6371 26.7579ZM34.8877 27.8115L34.4866 28.11C34.5962 28.2573 34.6685 28.4475 34.7082 28.7884C34.7494 29.1423 34.7502 29.6011 34.7502 30.2699H35.2502H35.7502C35.7502 29.6246 35.7509 29.0978 35.7015 28.6728C35.6506 28.2348 35.5417 27.8528 35.2889 27.513L34.8877 27.8115ZM35.2502 30.2699H34.7502V37.1668H35.2502H35.7502V30.2699H35.2502ZM23.3335 25.2502V25.7502H26.0835V25.2502V24.7502H23.3335V25.2502ZM23.3335 28.9168V29.4168H26.0835V28.9168V28.4168H23.3335V28.9168ZM27.0002 37.1668H27.5002V34.4168H27.0002H26.5002V37.1668H27.0002ZM27.0002 34.4168H27.5002C27.5002 33.9989 27.5012 33.6351 27.4621 33.3444C27.4211 33.0393 27.3279 32.7411 27.0852 32.4984L26.7317 32.852L26.3781 33.2055C26.404 33.2314 26.445 33.2835 26.4711 33.4776C26.4991 33.6862 26.5002 33.9706 26.5002 34.4168H27.0002ZM26.7317 32.852L27.0852 32.4984C26.8426 32.2558 26.5443 32.1625 26.2393 32.1215C25.9486 32.0824 25.5848 32.0835 25.1668 32.0835V32.5835V33.0835C25.6131 33.0835 25.8975 33.0846 26.106 33.1126C26.3002 33.1387 26.3523 33.1797 26.3781 33.2055L26.7317 32.852ZM25.1668 32.5835V32.0835H24.2502V32.5835V33.0835H25.1668V32.5835ZM24.2502 32.5835V32.0835C23.8322 32.0835 23.4684 32.0824 23.1777 32.1215C22.8726 32.1625 22.5744 32.2558 22.3318 32.4984L22.6853 32.852L23.0389 33.2055C23.0647 33.1797 23.1168 33.1387 23.311 33.1126C23.5195 33.0846 23.8039 33.0835 24.2502 33.0835V32.5835ZM22.6853 32.852L22.3318 32.4984C22.0891 32.7411 21.9959 33.0393 21.9548 33.3444C21.9158 33.6351 21.9168 33.9989 21.9168 34.4168H22.4168H22.9168C22.9168 33.9706 22.9179 33.6862 22.9459 33.4776C22.972 33.2835 23.013 33.2314 23.0389 33.2055L22.6853 32.852ZM22.4168 34.4168H21.9168V37.1668H22.4168H22.9168V34.4168H22.4168ZM17.8335 37.1668V37.6668H36.1668V37.1668V36.6668H17.8335V37.1668ZM18.7502 37.1668H19.2502V23.1576H18.7502H18.2502V37.1668H18.7502ZM18.7502 23.1576H19.2502C19.2502 21.9915 19.2513 21.1703 19.336 20.5665C19.4192 19.9724 19.5705 19.6959 19.7847 19.5272L19.4754 19.1344L19.1661 18.7415C18.6551 19.1438 18.4437 19.7282 18.3457 20.4276C18.249 21.1173 18.2502 22.0222 18.2502 23.1576H18.7502ZM19.4754 19.1344L19.7847 19.5272C19.9944 19.3621 20.2806 19.2874 20.8446 19.3629C21.4232 19.4403 22.1813 19.659 23.2652 19.9736L23.4046 19.4934L23.5439 19.0132C22.4918 18.7078 21.6481 18.4615 20.9773 18.3717C20.2921 18.28 19.6816 18.3357 19.1661 18.7415L19.4754 19.1344ZM23.4046 19.4934L23.2652 19.9736L27.8485 21.304L27.9879 20.8238L28.1273 20.3436L23.5439 19.0132L23.4046 19.4934ZM27.9879 20.8238L27.8485 21.304C28.5047 21.4944 28.9538 21.6257 29.2884 21.7684C29.6096 21.9053 29.7758 22.0332 29.8904 22.1899L30.294 21.8948L30.6977 21.5998C30.4395 21.2466 30.0971 21.0261 29.6806 20.8485C29.2775 20.6766 28.76 20.5273 28.1273 20.3436L27.9879 20.8238ZM30.294 21.8948L29.8904 22.19C30.0062 22.3483 30.0821 22.5538 30.1234 22.9181C30.1661 23.2944 30.1668 23.7821 30.1668 24.488H30.6668H31.1668C31.1668 23.8051 31.1676 23.2511 31.117 22.8055C31.0652 22.3479 30.9546 21.9512 30.6976 21.5997L30.294 21.8948ZM30.6668 24.488H30.1668V37.1668H30.6668H31.1668V24.488H30.6668Z",
                    fill: "#007AFF"
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs10("div", { className: "flex flex-col w-full", children: [
            /* @__PURE__ */ jsx17("p", { className: "text-sm max-w-[10rem] truncate", children: name }),
            /* @__PURE__ */ jsxs10("h2", { className: cn2("text-[12.42px] text-zinc-500"), children: [
              members,
              " ",
              t("spaceCard.members")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs10(DropdownMenu2, { children: [
          /* @__PURE__ */ jsx17(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx17(
            "button",
            {
              className: "size-10 hover:bg-gray-300/20 flex items-center justify-center rounded-sm",
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
              },
              children: /* @__PURE__ */ jsx17(MoreHorizontal, { className: "size-4" })
            }
          ) }),
          /* @__PURE__ */ jsxs10(DropdownMenuContent2, { children: [
            /* @__PURE__ */ jsxs10(
              DropdownMenuItem2,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setModal("renameSpace");
                  setProps({
                    renameSpaceModalProps: {
                      spaceId: id,
                      initialName: name
                    },
                    initialTab: "settings"
                  });
                },
                className: "flex items-center",
                children: [
                  /* @__PURE__ */ jsx17(Pen, { className: "w-4 h-4 mr-1" }),
                  t("spaceCard.rename")
                ]
              }
            ),
            /* @__PURE__ */ jsxs10(
              DropdownMenuItem2,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setModal("membersAndNumbers");
                  setProps({
                    manageSpaceMembers: {
                      spaceId: id,
                      spaceName: name
                    }
                  });
                },
                className: "flex items-center",
                children: [
                  /* @__PURE__ */ jsx17(Users2, { className: "w-4 h-4 mr-1" }),
                  t("spaceCard.manageMembers")
                ]
              }
            ),
            /* @__PURE__ */ jsx17(DropdownMenuSeparator2, {}),
            /* @__PURE__ */ jsxs10(
              DropdownMenuItem2,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setModal("deleteConfirmation");
                  setProps({
                    deleteModalInfo: {
                      title: t("spaceCard.deleteSpaceConfirmation", { name }),
                      description: t("spaceCard.actionCannotBeUndone"),
                      onDelete: handleDeleteSpace
                    }
                  });
                },
                disabled: isLoading,
                className: "flex items-center text-red-500",
                children: [
                  /* @__PURE__ */ jsx17(Trash2, { className: "w-4 h-4 mr-1" }),
                  t("spaceCard.remove")
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
};
var SpaceCard_default = SpaceCard;

// src/components/space-selector/components/EmptyList.tsx
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var EmptyList = ({
  title,
  description,
  image = "/empty-list.png"
  // Asset handling in package might be tricky
}) => {
  const { t } = useTranslation4("components");
  const defaultTitle = title || t("emptyList.noItemsFound");
  const defaultDescription = description || t("emptyList.defaultDescription");
  return /* @__PURE__ */ jsxs11("div", { className: "w-full h-full flex flex-col items-center justify-center gap-5", children: [
    /* @__PURE__ */ jsx18("div", { className: "relative w-[214px] h-[170px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx18("span", { children: "No Image" }) }),
    /* @__PURE__ */ jsx18("p", { className: "text-lg font-semibold text-center", children: defaultTitle }),
    /* @__PURE__ */ jsx18("p", { className: "text-zinc-600 text-sm max-w-[499px] text-center", children: defaultDescription })
  ] });
};
var EmptyList_default = EmptyList;

// src/components/space-selector/components/modals/BrowseSpaceModal.tsx
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
var BrowseSpaceModal = () => {
  const { t } = useTranslation5("modals");
  const { spaces, activeModal, setModal, setActiveSpace } = useSpaceSelector();
  const [filteredSpaces, setFilteredSpaces] = useState6(spaces);
  useEffect4(() => {
    setFilteredSpaces(spaces);
  }, [spaces]);
  if (activeModal !== "browseSpace") return null;
  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = spaces.filter(
      (space) => space.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSpaces(filtered);
  };
  const handleSelectSpace = (space) => {
    setActiveSpace(space);
    setModal(null);
  };
  return /* @__PURE__ */ jsx19(
    DrawerDialog,
    {
      size: "2xl",
      open: true,
      onClose: () => setModal(null),
      title: t("browseSpacesModal.title"),
      children: /* @__PURE__ */ jsx19("div", { className: "w-full h-full flex flex-col gap-5 relative pb-8 mt-5 overflow-hidden", children: /* @__PURE__ */ jsxs12("div", { className: "px-3 lg:px-7 flex flex-col gap-3 lg:gap-9", children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ jsx19(
            search_input_default,
            {
              onChange: (e) => handleSearch(e.target.value),
              placeholder: t("browseSpacesModal.searchSpacePlaceholder")
            }
          ),
          /* @__PURE__ */ jsxs12(Button2, { onClick: () => setModal("newSpace"), size: "lg", children: [
            /* @__PURE__ */ jsx19(SquarePlusIcon, { className: "stroke-[1.8] mr-2" }),
            t("browseSpacesModal.newSpace")
          ] })
        ] }),
        filteredSpaces.length === 0 ? /* @__PURE__ */ jsx19("div", { className: "py-10 px-3", children: /* @__PURE__ */ jsx19(
          EmptyList_default,
          {
            title: t("browseSpacesModal.emptyTitle"),
            description: t("browseSpacesModal.emptyDescription")
          }
        ) }) : /* @__PURE__ */ jsx19("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto", children: filteredSpaces.map((space) => /* @__PURE__ */ jsx19(
          "div",
          {
            onClick: () => handleSelectSpace(space),
            className: "cursor-pointer",
            children: /* @__PURE__ */ jsx19(
              SpaceCard_default,
              {
                id: space.space_uuid,
                name: space.name,
                members: space?.total_members || 0
              }
            )
          },
          space.space_uuid
        )) })
      ] }) })
    }
  );
};
var BrowseSpaceModal_default = BrowseSpaceModal;

// src/components/space-selector/components/modals/NewSpaceModal.tsx
import { useEffect as useEffect5, useState as useState7 } from "react";
import { useTranslation as useTranslation6 } from "react-i18next";

// src/components/space-selector/ui/label.tsx
import * as React13 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx20 } from "react/jsx-runtime";
var labelVariants = cva3(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label3 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx20(
  LabelPrimitive.Root,
  {
    ref,
    className: cn2(labelVariants(), className),
    ...props
  }
));
Label3.displayName = LabelPrimitive.Root.displayName;

// src/components/space-selector/components/modals/NewSpaceModal.tsx
import { toast as toast2 } from "sonner";
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var NewSpaceModal = () => {
  const { t } = useTranslation6("modals");
  const {
    activeModal,
    setModal,
    api,
    setActiveSpace,
    authUser,
    refreshSpaces
  } = useSpaceSelector();
  const [name, setName] = useState7("");
  const [isLoading, setIsLoading] = useState7(false);
  const isModalOpen = activeModal === "newSpace";
  useEffect5(() => {
    if (!isModalOpen) {
      setName("");
      setIsLoading(false);
    }
  }, [isModalOpen]);
  if (!isModalOpen) return null;
  const handleCreateSpace = async (e) => {
    e.preventDefault();
    if (!name.length) return;
    if (authUser === void 0) return;
    setIsLoading(true);
    try {
      if (!api?.createSpace) throw new Error("API not configured");
      const spaceData = await api.createSpace(name);
      if (!spaceData.space_uuid && spaceData.uuid) {
        spaceData.space_uuid = spaceData.uuid;
      }
      refreshSpaces();
      setActiveSpace(spaceData);
      toast2.success(t("newSpaceModal.spaceCreatedSuccessfully"));
      setName("");
      setModal(null);
    } catch (error) {
      console.error("Error creating space:", error);
      toast2.error(t("newSpaceModal.failedToCreateSpace"));
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx21(
    DrawerDialog,
    {
      open: isModalOpen,
      onClose: () => setModal(null),
      title: t("newSpaceModal.title"),
      children: /* @__PURE__ */ jsx21("div", { className: "w-full flex flex-col gap-5 mt-5 relative min-h-[23rem]", children: /* @__PURE__ */ jsxs13(
        "form",
        {
          className: "flex-1 px-2 flex flex-col justify-between gap-3 lg:gap-9",
          onSubmit: handleCreateSpace,
          children: [
            /* @__PURE__ */ jsx21("div", { className: "flex flex-col gap-5", children: /* @__PURE__ */ jsxs13("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx21(Label3, { htmlFor: "name", children: t("newSpaceModal.typeName") }),
              /* @__PURE__ */ jsx21(
                Input,
                {
                  id: "name",
                  placeholder: t("newSpaceModal.spaceNamePlaceholder"),
                  value: name,
                  onChange: (e) => setName(e.target.value)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs13("div", { className: "flex justify-end gap-3 pb-7", children: [
              /* @__PURE__ */ jsx21(
                Button2,
                {
                  type: "button",
                  onClick: () => setModal(null),
                  variant: "outline",
                  children: t("newSpaceModal.cancel")
                }
              ),
              /* @__PURE__ */ jsx21(
                Button2,
                {
                  type: "submit",
                  disabled: !name || isLoading,
                  className: "min-w-20",
                  children: isLoading ? t("newSpaceModal.creating") : t("newSpaceModal.create")
                }
              )
            ] })
          ]
        }
      ) })
    }
  );
};
var NewSpaceModal_default = NewSpaceModal;

// src/components/space-selector/components/modals/MembersAndNumbersModal.tsx
import { useEffect as useEffect7, useState as useState9 } from "react";
import { useTranslation as useTranslation8 } from "react-i18next";
import {
  UserPlus,
  MoreVertical,
  Search,
  Loader2 as Loader22,
  ChevronDown as ChevronDown3
} from "lucide-react";

// src/components/space-selector/ui/avatar.tsx
import * as React15 from "react";
import * as AvatarPrimitive2 from "@radix-ui/react-avatar";
import { jsx as jsx22 } from "react/jsx-runtime";
var Avatar2 = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
  AvatarPrimitive2.Root,
  {
    ref,
    className: cn2(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-md",
      className
    ),
    ...props
  }
));
Avatar2.displayName = AvatarPrimitive2.Root.displayName;
var AvatarImage2 = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
  AvatarPrimitive2.Image,
  {
    ref,
    className: cn2("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage2.displayName = AvatarPrimitive2.Image.displayName;
var AvatarFallback2 = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
  AvatarPrimitive2.Fallback,
  {
    ref,
    className: cn2(
      "flex h-full w-full items-center justify-center rounded-sm bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback2.displayName = AvatarPrimitive2.Fallback.displayName;

// src/components/space-selector/components/modals/MembersAndNumbersModal.tsx
import { toast as toast4 } from "sonner";

// src/components/space-selector/components/modals/ManageMembersModal.tsx
import { useEffect as useEffect6, useState as useState8 } from "react";
import { useTranslation as useTranslation7 } from "react-i18next";
import { Loader2, X as X2 } from "lucide-react";

// node_modules/uuid/dist/esm-node/rng.js
import crypto from "crypto";
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
import crypto2 from "crypto";
var native_default = {
  randomUUID: crypto2.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/components/space-selector/ui/select.tsx
import * as React16 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check3, ChevronDown as ChevronDown2, ChevronUp } from "lucide-react";
import { jsx as jsx23, jsxs as jsxs14 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectTrigger = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs14(
  SelectPrimitive.Trigger,
  {
    ref,
    type: "button",
    className: cn2(
      "flex h-12 w-full items-center justify-between rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx23(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx23(ChevronDown2, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn2(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx23(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn2(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx23(ChevronDown2, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React16.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx23(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs14(
  SelectPrimitive.Content,
  {
    ref,
    className: cn2(
      "relative z-[100001] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx23(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx23(
        SelectPrimitive.Viewport,
        {
          className: cn2(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx23(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  SelectPrimitive.Label,
  {
    ref,
    className: cn2("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs14(
  SelectPrimitive.Item,
  {
    ref,
    className: cn2(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx23("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx23(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx23(Check3, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx23(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn2("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/space-selector/components/modals/ManageMembersModal.tsx
import { toast as toast3 } from "sonner";
import { jsx as jsx24, jsxs as jsxs15 } from "react/jsx-runtime";
var ManageMembersModal = ({
  isOpen,
  onClose,
  initialEmail,
  initialRole
}) => {
  const { t } = useTranslation7("modals");
  const [email, setEmail] = useState8("");
  const [pendingEmails, setPendingEmails] = useState8([]);
  const [pendingRole, setPendingRole] = useState8("viewer");
  const [isLoading, setIsLoading] = useState8(false);
  const [isSuccess, setIsSuccess] = useState8(false);
  const { activeModal, modalProps, setModal, api } = useSpaceSelector();
  const editEmail = initialEmail || modalProps?.manageMembersProps?.initialEmail;
  const editRole = initialRole || modalProps?.manageMembersProps?.initialRole;
  const spaceId = modalProps?.manageSpaceMembers?.spaceId;
  const effectiveOpen = isOpen || activeModal === "manageMembers";
  useEffect6(() => {
    if (effectiveOpen) {
      if (editEmail) {
        setEmail(editEmail);
        setPendingEmails([{ id: v4_default(), email: editEmail }]);
      }
      if (editRole) {
        setPendingRole(editRole);
      }
    } else {
      setPendingEmails([]);
      setEmail("");
      setPendingRole("viewer");
      setIsSuccess(false);
    }
  }, [effectiveOpen, editEmail, editRole]);
  if (!modalProps?.manageSpaceMembers && !isOpen) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addEmailToList = (emailToAdd) => {
    const cleanEmail = emailToAdd.trim().replace(/,$/, "");
    if (cleanEmail && emailRegex.test(cleanEmail)) {
      setPendingEmails((prev) => {
        if (prev.some((p) => p.email === cleanEmail)) return prev;
        return [...prev, { id: v4_default(), email: cleanEmail }];
      });
      setEmail("");
      return true;
    }
    return false;
  };
  const handleEmailSubmit = (e) => {
    if ((e.key === "Enter" || e.key === "Tab" || e.key === ",") && email.trim()) {
      e.preventDefault();
      addEmailToList(email);
    }
  };
  const handleEmailBlur = () => {
    addEmailToList(email);
  };
  const removeEmail = (idToRemove) => {
    setPendingEmails((prev) => prev.filter((item) => item.id !== idToRemove));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      addEmailToList(email);
    }
    const currentEmailValue = email.trim();
    let emailsToSubmit = pendingEmails.map((p) => p.email);
    if (currentEmailValue && emailRegex.test(currentEmailValue) && !emailsToSubmit.includes(currentEmailValue)) {
      emailsToSubmit.push(currentEmailValue);
    }
    if (emailsToSubmit.length === 0) return;
    setIsLoading(true);
    try {
      if (!spaceId || !api?.inviteMembers)
        throw new Error("API not configured");
      await api.inviteMembers(spaceId, emailsToSubmit, pendingRole);
      setIsSuccess(true);
    } catch (e2) {
      console.error("INVITATION_ERROR:", e2);
      toast3.error(t("manageMembersModal.wrong"));
    } finally {
      setIsLoading(false);
    }
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsx24(
      DrawerDialog,
      {
        open: effectiveOpen,
        onClose: onClose || (() => setModal(null)),
        className: "sm:max-w-[425px] p-6 z-[10011]",
        overlayClassName: "z-[10010]",
        children: /* @__PURE__ */ jsxs15("div", { className: "flex flex-col items-center justify-center py-6 gap-4 text-center", children: [
          /* @__PURE__ */ jsx24("div", { className: "w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-sm animate-in zoom-in-50 duration-300", children: /* @__PURE__ */ jsx24(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "3",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx24("polyline", { points: "20 6 9 17 4 12" })
            }
          ) }),
          /* @__PURE__ */ jsx24("h2", { className: "text-xl font-bold text-gray-900", children: "Invitations sent successfully" }),
          /* @__PURE__ */ jsx24("p", { className: "text-sm text-gray-500 max-w-[250px]", children: "Invited users will receive an email to join your Space" }),
          /* @__PURE__ */ jsx24(
            Button2,
            {
              variant: "default",
              className: "bg-primary hover:bg-primary/90 text-white min-w-[200px] mt-6 rounded-lg h-11",
              onClick: () => {
                setIsSuccess(false);
                if (onClose) {
                  onClose();
                } else {
                  setModal("membersAndNumbers");
                }
              },
              children: "Done"
            }
          )
        ] })
      }
    );
  }
  const isInputValidEmail = email.trim() && emailRegex.test(email.trim());
  const isButtonDisabled = isLoading || pendingEmails.length === 0 && !isInputValidEmail;
  return /* @__PURE__ */ jsx24(
    DrawerDialog,
    {
      open: effectiveOpen,
      onClose: onClose || (() => setModal(null)),
      className: "sm:max-w-[500px] p-0 overflow-hidden z-[10011]",
      overlayClassName: "z-[10010]",
      children: /* @__PURE__ */ jsxs15("div", { className: "w-full flex flex-col", children: [
        /* @__PURE__ */ jsxs15("div", { className: "flex flex-col items-center gap-3 pt-8 pb-4 px-6 md:px-10", children: [
          /* @__PURE__ */ jsxs15(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "40",
              height: "40",
              viewBox: "0 0 40 40",
              fill: "none",
              children: [
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    opacity: "0.4",
                    d: "M19.9997 12.5001C19.9997 15.7217 17.388 18.3334 14.1663 18.3334C10.9447 18.3334 8.33301 15.7217 8.33301 12.5001C8.33301 9.27841 10.9447 6.66675 14.1663 6.66675C17.388 6.66675 19.9997 9.27841 19.9997 12.5001Z",
                    fill: "#0000FF"
                  }
                ),
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    opacity: "0.4",
                    d: "M3.33301 30.4761C3.33301 32.0541 4.71879 33.3333 6.42824 33.3333H21.9048C23.6143 33.3333 25.0002 32.0541 25.0002 30.4761C25.0002 26.5313 21.5357 23.3333 17.262 23.3333H11.0711C6.79747 23.3333 3.33301 26.5313 3.33301 30.4761Z",
                    fill: "#0000FF"
                  }
                ),
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    d: "M19.9997 12.5001C19.9997 15.7217 17.388 18.3334 14.1663 18.3334C10.9447 18.3334 8.33301 15.7217 8.33301 12.5001C8.33301 9.27841 10.9447 6.66675 14.1663 6.66675C17.388 6.66675 19.9997 9.27841 19.9997 12.5001Z",
                    stroke: "#0000FF",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    d: "M22.5 18.3334C25.7217 18.3334 28.3333 15.7217 28.3333 12.5001C28.3333 9.27841 25.7217 6.66675 22.5 6.66675",
                    stroke: "#0000FF",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    d: "M21.9045 33.3333H6.42824C4.71879 33.3333 3.33301 32.0541 3.33301 30.4761C3.33301 26.5313 6.79747 23.3333 11.0711 23.3333H17.2615C19.0035 23.3333 20.6112 23.8646 21.9045 24.7613",
                    stroke: "#0000FF",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ jsx24(
                  "path",
                  {
                    d: "M31.667 23.3333V33.3333M36.667 28.3333H26.667",
                    stroke: "#0000FF",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx24("h2", { className: "text-2xl font-medium text-gray-900", children: "Add Members" }),
          /* @__PURE__ */ jsx24("p", { className: "text-center text-sm text-gray-600 max-w-sm leading-relaxed", children: "Type or paste in emails below, separated by commas. Your workspace will be billed by members." })
        ] }),
        /* @__PURE__ */ jsxs15(
          "form",
          {
            onSubmit: handleFormSubmit,
            className: "flex flex-col gap-6 px-6 md:px-10 pb-10",
            children: [
              /* @__PURE__ */ jsxs15("div", { className: "flex flex-wrap items-center gap-2 min-h-[50px] p-2.5 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white sticky top-0", children: [
                pendingEmails.map((item) => /* @__PURE__ */ jsxs15(
                  "div",
                  {
                    className: "bg-primary text-white text-sm pl-3 pr-1 py-1 rounded-full flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200",
                    children: [
                      /* @__PURE__ */ jsx24("span", { children: item.email }),
                      /* @__PURE__ */ jsx24(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeEmail(item.id),
                          className: "p-1 hover:bg-white/20 rounded-full transition-colors",
                          children: /* @__PURE__ */ jsx24(X2, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  item.id
                )),
                /* @__PURE__ */ jsx24(
                  "input",
                  {
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onKeyDown: handleEmailSubmit,
                    onBlur: handleEmailBlur,
                    placeholder: pendingEmails.length === 0 ? "Search names or emails" : "",
                    className: "flex-1 border-0 focus:ring-0 outline-none text-sm min-w-[150px] bg-transparent placeholder:text-gray-400 h-8"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx24(Label3, { className: "text-sm font-medium text-gray-600", children: "Select Role" }),
                /* @__PURE__ */ jsx24("div", { className: "relative", children: /* @__PURE__ */ jsxs15(
                  Select,
                  {
                    value: pendingRole,
                    onValueChange: (v) => setPendingRole(v),
                    children: [
                      /* @__PURE__ */ jsx24(
                        SelectTrigger,
                        {
                          type: "button",
                          className: "w-full h-auto p-4 flex items-start text-left bg-gray-50 border-gray-200 rounded-xl hover:border-primary/50 hover:bg-white data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-primary/10 transition-all [&>span]:w-full",
                          children: /* @__PURE__ */ jsxs15("div", { className: "flex gap-4 items-center w-full", children: [
                            /* @__PURE__ */ jsx24("div", { className: "flex items-start justify-start", children: /* @__PURE__ */ jsx24("div", { className: "w-5 h-5 text-gray-600", children: pendingRole === "viewer" ? /* @__PURE__ */ jsxs15(
                              "svg",
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "18",
                                height: "18",
                                viewBox: "0 0 18 18",
                                fill: "none",
                                children: [
                                  /* @__PURE__ */ jsx24(
                                    "path",
                                    {
                                      d: "M12.75 6.375C12.75 4.30393 11.071 2.625 9 2.625C6.92893 2.625 5.25 4.30393 5.25 6.375C5.25 8.44605 6.92893 10.125 9 10.125C11.071 10.125 12.75 8.44605 12.75 6.375Z",
                                      stroke: "#212121",
                                      strokeWidth: "1.2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round"
                                    }
                                  ),
                                  /* @__PURE__ */ jsx24(
                                    "path",
                                    {
                                      d: "M14.25 15.375C14.25 12.4755 11.8995 10.125 9 10.125C6.10051 10.125 3.75 12.4755 3.75 15.375",
                                      stroke: "#212121",
                                      strokeWidth: "1.2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round"
                                    }
                                  )
                                ]
                              }
                            ) : pendingRole === "editor" ? /* @__PURE__ */ jsx24(
                              "svg",
                              {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                className: "w-full h-full",
                                children: /* @__PURE__ */ jsx24("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" })
                              }
                            ) : /* @__PURE__ */ jsx24(
                              "svg",
                              {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                className: "w-full h-full",
                                children: /* @__PURE__ */ jsx24("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
                              }
                            ) }) }),
                            /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-0.5 flex-1", children: [
                              /* @__PURE__ */ jsx24("span", { className: "font-medium capitalize text-sm text-gray-700", children: pendingRole }),
                              /* @__PURE__ */ jsxs15("span", { className: "text-xs text-gray-500 font-medium line-clamp-1", children: [
                                pendingRole === "viewer" && "Can view content and data only, without making any changes.",
                                pendingRole === "editor" && "Can edit and update content, but cannot manage settings or users.",
                                pendingRole === "manager" && "Full control to manage content, settings, and user permissions."
                              ] })
                            ] })
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsxs15(SelectContent, { className: "p-1", children: [
                        /* @__PURE__ */ jsx24(
                          SelectItem,
                          {
                            value: "viewer",
                            className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary",
                            children: /* @__PURE__ */ jsxs15("div", { className: "flex gap-3 items-center", children: [
                              /* @__PURE__ */ jsx24("div", { className: "w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxs15(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  className: "w-4 h-4 text-gray-600",
                                  children: [
                                    /* @__PURE__ */ jsx24("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
                                    /* @__PURE__ */ jsx24("circle", { cx: "12", cy: "12", r: "3" })
                                  ]
                                }
                              ) }),
                              /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-0.5 text-left", children: [
                                /* @__PURE__ */ jsx24("span", { className: "font-semibold text-sm", children: "Viewer" }),
                                /* @__PURE__ */ jsx24("span", { className: "text-xs text-gray-500", children: "Can view content only" })
                              ] })
                            ] })
                          }
                        ),
                        /* @__PURE__ */ jsx24(
                          SelectItem,
                          {
                            value: "editor",
                            className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary",
                            children: /* @__PURE__ */ jsxs15("div", { className: "flex gap-3 items-center", children: [
                              /* @__PURE__ */ jsx24("div", { className: "w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx24(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  className: "w-4 h-4 text-gray-600",
                                  children: /* @__PURE__ */ jsx24("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" })
                                }
                              ) }),
                              /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-0.5 text-left", children: [
                                /* @__PURE__ */ jsx24("span", { className: "font-semibold text-sm", children: "Editor" }),
                                /* @__PURE__ */ jsx24("span", { className: "text-xs text-gray-500", children: "Can edit content" })
                              ] })
                            ] })
                          }
                        ),
                        /* @__PURE__ */ jsx24(
                          SelectItem,
                          {
                            value: "manager",
                            className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary",
                            children: /* @__PURE__ */ jsxs15("div", { className: "flex gap-3 items-center", children: [
                              /* @__PURE__ */ jsx24("div", { className: "w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx24(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  className: "w-4 h-4 text-gray-600",
                                  children: /* @__PURE__ */ jsx24("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
                                }
                              ) }),
                              /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-0.5 text-left", children: [
                                /* @__PURE__ */ jsx24("span", { className: "font-semibold text-sm", children: "Manager" }),
                                /* @__PURE__ */ jsx24("span", { className: "text-xs text-gray-500", children: "Full control" })
                              ] })
                            ] })
                          }
                        )
                      ] })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-3 mt-4", children: [
                /* @__PURE__ */ jsxs15(
                  Button2,
                  {
                    type: "submit",
                    disabled: isButtonDisabled,
                    className: "w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base rounded-xl transition-all shadow-sm shadow-primary/20 disabled:opacity-50",
                    children: [
                      isLoading ? /* @__PURE__ */ jsx24(Loader2, { className: "w-5 h-5 animate-spin mr-2" }) : null,
                      isLoading ? "Sending invites..." : "Send invite"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx24(
                  Button2,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: () => onClose ? onClose() : setModal(null),
                    className: "w-full text-gray-500 font-normal hover:bg-gray-50 hover:text-gray-900 rounded-xl h-11",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
};
var ManageMembersModal_default = ManageMembersModal;

// src/components/space-selector/components/modals/MembersAndNumbersModal.tsx
import { Fragment, jsx as jsx25, jsxs as jsxs16 } from "react/jsx-runtime";
var MembersAndNumbersModal = () => {
  const { t } = useTranslation8("modals");
  const {
    activeModal: modal,
    modalProps: props,
    setModal,
    setModalProps: setProps,
    refreshSpaces,
    api
  } = useSpaceSelector();
  const [activeTab, setActiveTab] = useState9("members");
  const [licenseCount, setLicenseCount] = useState9(0);
  const [screensCount, setScreensCount] = useState9(0);
  const [members, setMembers] = useState9([]);
  const [invitations, setInvitations] = useState9([]);
  const [loading, setLoading] = useState9(false);
  const [searchQuery, setSearchQuery] = useState9("");
  const [memberToRemove, setMemberToRemove] = useState9(null);
  const [memberToEdit, setMemberToEdit] = useState9(null);
  const [currentPage, setCurrentPage] = useState9(1);
  const [rowsPerPage, setRowsPerPage] = useState9(5);
  const [invitesCurrentPage, setInvitesCurrentPage] = useState9(1);
  const [invitesRowsPerPage, setInvitesRowsPerPage] = useState9(5);
  const [settingsSpaceName, setSettingsSpaceName] = useState9("");
  const [savingSettings, setSavingSettings] = useState9(false);
  const [showInviteModal, setShowInviteModal] = useState9(false);
  const spaceId = props?.manageSpaceMembers?.spaceId;
  useEffect7(() => {
    if (props?.manageSpaceMembers?.spaceName) {
      setSettingsSpaceName(props.manageSpaceMembers.spaceName);
    }
  }, [props?.manageSpaceMembers]);
  const handleUpdateSpace = async () => {
    if (!spaceId || !settingsSpaceName.trim() || !api) return;
    setSavingSettings(true);
    try {
      await api.renameSpace(spaceId, settingsSpaceName);
      refreshSpaces();
      if (props?.manageSpaceMembers) {
        setProps({
          ...props,
          manageSpaceMembers: {
            ...props.manageSpaceMembers,
            spaceName: settingsSpaceName
          }
        });
      }
      toast4.success(t("renameSpaceModal.spaceRenamedSuccessfully"));
    } catch (error) {
      toast4.error(t("renameSpaceModal.failedToRenameSpace"));
    } finally {
      setSavingSettings(false);
    }
  };
  const fetchData = async () => {
    if (!spaceId || !api) return;
    setLoading(true);
    try {
      const [membersData, invitationsData] = await Promise.all([
        api.fetchMembers(spaceId),
        api.fetchInvitations(spaceId)
      ]);
      setMembers(membersData || []);
      setInvitations(invitationsData || []);
      if (api.fetchStats) {
        const stats = await api.fetchStats();
        setScreensCount(stats.screens);
        setLicenseCount(stats.licenses);
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect7(() => {
    if (modal === "membersAndNumbers" && spaceId) {
      fetchData();
    }
  }, [modal, spaceId]);
  if (modal !== "membersAndNumbers") return null;
  if (!api) return null;
  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalInvitePages = Math.ceil(invitations.length / invitesRowsPerPage);
  const paginatedInvitations = invitations.slice(
    (invitesCurrentPage - 1) * invitesRowsPerPage,
    invitesCurrentPage * invitesRowsPerPage
  );
  const handleRolesUpdate = async (memberId, newRole) => {
    try {
      if (!api) return;
      const member = members.find((m) => m.id === memberId);
      if (!member) return;
      setMembers(
        (prev) => prev.map((m) => m.id === memberId ? { ...m, role: newRole } : m)
      );
      await api.updateMemberRole(spaceId, memberId, newRole, member.email);
      toast4.success(t("manageMembersModal.role_success"));
    } catch (error) {
      toast4.error(t("manageMembersModal.error"));
      fetchData();
    }
  };
  const handleRemoveMember = async (memberId) => {
    try {
      if (!spaceId || !api) return;
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      await api.removeMember(spaceId, memberId);
      toast4.success(t("manageMembersModal.removed"));
    } catch (error) {
      toast4.error(t("manageMembersModal.error_remove"));
      fetchData();
    }
  };
  const handleRevokeInvitation = async (invitationId) => {
    try {
      if (!spaceId || !api) return;
      setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
      await api.revokeInvitation(spaceId, invitationId);
      toast4.success("Invitation revoked successfully");
    } catch (error) {
      toast4.error("Failed to revoke invitation");
      fetchData();
    }
  };
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast4.success("Email copied to clipboard");
  };
  const confirmRemoveMember = async () => {
    if (!memberToRemove || !api) return;
    try {
      if (!spaceId) return;
      setMembers((prev) => prev.filter((m) => m.id !== memberToRemove.id));
      await api.removeMember(spaceId, memberToRemove.id);
      toast4.success(t("manageMembersModal.removed"));
      setMemberToRemove(null);
    } catch (error) {
      toast4.error(t("manageMembersModal.error_remove"));
      fetchData();
    }
  };
  const handleResendInvitation = async (id) => {
    try {
      if (!spaceId || !api) return;
      await api.resendInvitation(spaceId, id);
      toast4.success("Invitation resent successfully");
    } catch (error) {
      toast4.error("Failed to resend invitation");
    }
  };
  const handleCopyInviteLink = async (invite) => {
    try {
      if (!spaceId || !api) return;
      const link = await api.getInviteLink(spaceId, invite.id);
      if (link) {
        await navigator.clipboard.writeText(link);
        toast4.success("Invite link copied to clipboard");
      } else {
        toast4.error("Failed to get invite link");
      }
    } catch (error) {
      console.error(error);
      toast4.error("Failed to get invite link");
    }
  };
  return /* @__PURE__ */ jsxs16(Fragment, { children: [
    /* @__PURE__ */ jsx25(
      DrawerDialog,
      {
        size: "2xl",
        className: "p-0 overflow-hidden sm:max-w-[1280px]",
        open: modal === "membersAndNumbers",
        onClose: () => setModal(null),
        children: /* @__PURE__ */ jsxs16("div", { className: "flex flex-col sm:flex-row w-full h-[650px] sm:h-[960px]", children: [
          /* @__PURE__ */ jsxs16("div", { className: "w-full sm:w-64 bg-white border-b sm:border-b-0 sm:border-r border-gray-100 p-4 flex flex-col gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx25("h3", { className: "text-sm font-semibold px-4 py-2 hidden sm:block", children: props?.manageSpaceMembers?.spaceName || "Space Nitx" }),
            /* @__PURE__ */ jsxs16("div", { className: "flex flex-row sm:flex-col gap-2 overflow-x-auto no-scrollbar w-full", children: [
              /* @__PURE__ */ jsxs16(
                "button",
                {
                  onClick: () => setActiveTab("members"),
                  className: `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-normal transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start ${activeTab === "members" ? "bg-primary text-white " : "text-gray-600 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ jsx25("div", { className: "w-5 h-5 flex items-center justify-center", children: /* @__PURE__ */ jsx25(UserPlus, { className: "w-4 h-4" }) }),
                    t("manageMembersModal.title")
                  ]
                }
              ),
              /* @__PURE__ */ jsxs16(
                "button",
                {
                  onClick: () => setActiveTab("settings"),
                  className: `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start ${activeTab === "settings" ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ jsx25("div", { className: "w-5 h-5 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        children: [
                          /* @__PURE__ */ jsx25(
                            "path",
                            {
                              d: "M13.5013 4.52275L13.1887 3.98024C12.9523 3.56995 12.8341 3.3648 12.633 3.28299C12.4318 3.20119 12.2043 3.26574 11.7494 3.39484L10.9766 3.61252C10.6862 3.6795 10.3814 3.6415 10.1162 3.50524L9.90287 3.38214C9.67544 3.23648 9.50051 3.02171 9.40368 2.76927L9.19221 2.1376C9.05313 1.71959 8.98359 1.51058 8.81803 1.39103C8.65254 1.27148 8.43265 1.27148 7.99286 1.27148H7.28682C6.8471 1.27148 6.62721 1.27148 6.46165 1.39103C6.29613 1.51058 6.2266 1.71959 6.08754 2.1376L5.87603 2.76927C5.7792 3.02171 5.60428 3.23648 5.37686 3.38214L5.1635 3.50524C4.89829 3.6415 4.59357 3.6795 4.30311 3.61252L3.5303 3.39484C3.07535 3.26574 2.84788 3.20119 2.64675 3.28299C2.44562 3.3648 2.32741 3.56995 2.09099 3.98024L1.77839 4.52275C1.55678 4.90734 1.44597 5.09964 1.46748 5.30435C1.48898 5.50905 1.63732 5.67402 1.93399 6.00395L2.58698 6.73398C2.74658 6.93601 2.85989 7.28814 2.85989 7.60475C2.85989 7.92148 2.74662 8.27348 2.587 8.47558L1.93399 9.20562C1.63732 9.53559 1.48899 9.70051 1.46748 9.90527C1.44597 10.11 1.55678 10.3022 1.77839 10.6868L2.09098 11.2293C2.3274 11.6396 2.44562 11.8448 2.64675 11.9265C2.84788 12.0084 3.07536 11.9438 3.53031 11.8147L4.30309 11.597C4.59359 11.53 4.89838 11.5681 5.16362 11.7044L5.37694 11.8275C5.60432 11.9732 5.7792 12.1879 5.87601 12.4403L6.08754 13.0721C6.2266 13.4901 6.29613 13.6991 6.46165 13.8186C6.62721 13.9381 6.8471 13.9381 7.28682 13.9381H7.99286C8.43265 13.9381 8.65254 13.9381 8.81803 13.8186C8.98359 13.6991 9.05313 13.4901 9.19221 13.0721L9.40374 12.4403C9.50051 12.1879 9.67538 11.9732 9.90281 11.8275L10.1161 11.7044C10.3814 11.5681 10.6861 11.53 10.9766 11.597L11.7494 11.8147C12.2043 11.9438 12.4318 12.0084 12.633 11.9265C12.8341 11.8448 12.9523 11.6396 13.1887 11.2293L13.5013 10.6868C13.7229 10.3022 13.8337 10.11 13.8122 9.90527C13.7907 9.70051 13.6424 9.53559 13.3457 9.20562L12.6927 8.47558C12.5331 8.27348 12.4198 7.92148 12.4198 7.60475C12.4198 7.28814 12.5332 6.93601 12.6927 6.73398L13.3457 6.00395C13.6424 5.67402 13.7907 5.50905 13.8122 5.30435C13.8337 5.09964 13.7229 4.90734 13.5013 4.52275Z",
                              stroke: "currentColor",
                              strokeWidth: "0.96",
                              strokeLinecap: "round"
                            }
                          ),
                          /* @__PURE__ */ jsx25(
                            "path",
                            {
                              d: "M9.82882 7.59948C9.82882 8.82371 8.83639 9.81615 7.61216 9.81615C6.38792 9.81615 5.39551 8.82371 5.39551 7.59948C5.39551 6.37525 6.38792 5.38281 7.61216 5.38281C8.83639 5.38281 9.82882 6.37525 9.82882 7.59948Z",
                              stroke: "currentColor",
                              strokeWidth: "0.96",
                              strokeLinecap: "round"
                            }
                          )
                        ]
                      }
                    ) }),
                    t("manageMembersModal.settings")
                  ]
                }
              )
            ] })
          ] }),
          activeTab === "members" && /* @__PURE__ */ jsxs16("div", { className: "flex-1 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto pb-20", children: [
            /* @__PURE__ */ jsx25("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx25("h2", { className: "text-xl font-semibold capitalize", children: t("manageMembersModal.title") }) }),
            loading ? /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-6", children: [
              /* @__PURE__ */ jsx25("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx25(Skeleton, { className: "h-8 w-32" }) }),
              /* @__PURE__ */ jsxs16("div", { className: "border border-gray-100 rounded-lg overflow-hidden", children: [
                /* @__PURE__ */ jsx25("div", { className: "bg-gray-50/50 p-4 border-b border-gray-100 hidden sm:block", children: /* @__PURE__ */ jsxs16("div", { className: "grid grid-cols-[1fr_200px_100px] gap-4", children: [
                  /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-20" }),
                  /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-20" }),
                  /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-10 ml-auto" })
                ] }) }),
                [1].map((i) => /* @__PURE__ */ jsx25(
                  "div",
                  {
                    className: "p-4 border-b border-gray-100 last:border-0 relative",
                    children: /* @__PURE__ */ jsxs16("div", { className: "flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center", children: [
                      /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3 w-full", children: [
                        /* @__PURE__ */ jsx25(Skeleton, { className: "w-8 h-8 rounded-md" }),
                        /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1 flex-1", children: [
                          /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-32" }),
                          /* @__PURE__ */ jsx25(Skeleton, { className: "h-3 w-48" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx25(Skeleton, { className: "h-8 w-20 ml-11 sm:ml-0" }),
                      /* @__PURE__ */ jsx25(Skeleton, { className: "h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" })
                    ] })
                  },
                  i
                ))
              ] }),
              /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-4 mt-4", children: [
                /* @__PURE__ */ jsxs16("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx25(Skeleton, { className: "h-10 w-64" }),
                  " ",
                  /* @__PURE__ */ jsx25(Skeleton, { className: "h-10 w-32" }),
                  " "
                ] }),
                /* @__PURE__ */ jsxs16("div", { className: "border border-gray-100 rounded-lg overflow-hidden", children: [
                  /* @__PURE__ */ jsx25("div", { className: "bg-gray-50/50 p-4 border-b border-gray-100 hidden sm:block", children: /* @__PURE__ */ jsxs16("div", { className: "grid grid-cols-[1fr_200px_100px] gap-4", children: [
                    /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-20" }),
                    /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-20" }),
                    /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-10 ml-auto" })
                  ] }) }),
                  [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx25(
                    "div",
                    {
                      className: "p-4 border-b border-gray-100 last:border-0 relative",
                      children: /* @__PURE__ */ jsxs16("div", { className: "flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center", children: [
                        /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3 w-full", children: [
                          /* @__PURE__ */ jsx25(Skeleton, { className: "w-8 h-8 rounded-md" }),
                          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1 flex-1", children: [
                            /* @__PURE__ */ jsx25(Skeleton, { className: "h-4 w-32" }),
                            /* @__PURE__ */ jsx25(Skeleton, { className: "h-3 w-48" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx25(Skeleton, { className: "h-8 w-20 ml-11 sm:ml-0" }),
                        /* @__PURE__ */ jsx25(Skeleton, { className: "h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" })
                      ] })
                    },
                    i
                  ))
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs16(Fragment, { children: [
              invitations.length > 0 && /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsx25("h3", { className: "text-base font-semibold", children: "Pending Invite" }),
                /* @__PURE__ */ jsx25("p", { className: "text-xs text-gray-500 -mt-3", children: "Invite teammates to start collaborating" }),
                /* @__PURE__ */ jsxs16("div", { className: "hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-primary/5 rounded-t-lg text-xs font-semibold text-gray-700", children: [
                  /* @__PURE__ */ jsx25("div", { children: "Person" }),
                  /* @__PURE__ */ jsx25("div", { children: "Roles" }),
                  /* @__PURE__ */ jsx25("div", { className: "text-right", children: "Action" })
                ] }),
                /* @__PURE__ */ jsx25("div", { className: "w-full bg-white border border-gray-100 rounded-b-lg overflow-hidden sm:-mt-4", children: paginatedInvitations.map((invite) => /* @__PURE__ */ jsxs16(
                  "div",
                  {
                    className: "relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx25("div", { className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium", children: invite.email.substring(0, 2).toUpperCase() }),
                        /* @__PURE__ */ jsxs16("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsx25("span", { className: "text-sm font-medium text-gray-900", children: "Member" }),
                          /* @__PURE__ */ jsx25("span", { className: "text-xs text-gray-500", children: invite.email })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx25("div", { className: "text-sm text-gray-600 capitalize ml-11 sm:ml-0", children: invite.role }),
                      /* @__PURE__ */ jsx25("div", { className: "absolute right-2 top-2 sm:static flex justify-end", children: /* @__PURE__ */ jsxs16(DropdownMenu2, { children: [
                        /* @__PURE__ */ jsx25(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx25(
                          Button2,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8 hover:bg-gray-100",
                            children: /* @__PURE__ */ jsx25(MoreVertical, { className: "w-4 h-4 text-gray-500" })
                          }
                        ) }),
                        /* @__PURE__ */ jsxs16(
                          DropdownMenuContent2,
                          {
                            align: "end",
                            className: "w-[200px] p-2",
                            children: [
                              /* @__PURE__ */ jsxs16(
                                DropdownMenuItem2,
                                {
                                  className: "gap-2 cursor-pointer py-2.5",
                                  onClick: () => handleResendInvitation(invite.id),
                                  children: [
                                    /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                                      "svg",
                                      {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                          /* @__PURE__ */ jsx25("path", { d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" }),
                                          /* @__PURE__ */ jsx25("path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" })
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsx25("span", { children: "Resend Invitation" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxs16(
                                DropdownMenuItem2,
                                {
                                  className: "gap-2 cursor-pointer py-2.5",
                                  onClick: () => handleCopyEmail(invite.email),
                                  children: [
                                    /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                                      "svg",
                                      {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                          /* @__PURE__ */ jsx25(
                                            "rect",
                                            {
                                              width: "14",
                                              height: "14",
                                              x: "8",
                                              y: "8",
                                              rx: "2",
                                              ry: "2"
                                            }
                                          ),
                                          /* @__PURE__ */ jsx25("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsx25("span", { children: "Copy Email" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxs16(
                                DropdownMenuItem2,
                                {
                                  className: "gap-2 cursor-pointer py-2.5",
                                  onClick: () => handleCopyInviteLink(invite),
                                  children: [
                                    /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                                      "svg",
                                      {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                          /* @__PURE__ */ jsx25("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                                          /* @__PURE__ */ jsx25("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsx25("span", { children: "Copy Invite Link" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxs16(
                                DropdownMenuItem2,
                                {
                                  className: "gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50",
                                  onClick: () => handleRevokeInvitation(invite.id),
                                  children: [
                                    /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                                      "svg",
                                      {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                          /* @__PURE__ */ jsx25("circle", { cx: "12", cy: "12", r: "10" }),
                                          /* @__PURE__ */ jsx25("path", { d: "m15 9-6 6" }),
                                          /* @__PURE__ */ jsx25("path", { d: "m9 9 6 6" })
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsx25("span", { children: "Cancel Invitation" })
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ] }) })
                    ]
                  },
                  invite.id
                )) }),
                invitations.length > 0 && /* @__PURE__ */ jsxs16("div", { className: "flex items-center justify-between px-2 text-xs text-gray-500 mt-2", children: [
                  /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxs16(
                      "select",
                      {
                        className: "border border-gray-200 rounded p-1 bg-white focus:outline-none focus:border-primary",
                        value: invitesRowsPerPage,
                        onChange: (e) => {
                          setInvitesRowsPerPage(Number(e.target.value));
                          setInvitesCurrentPage(1);
                        },
                        children: [
                          /* @__PURE__ */ jsx25("option", { value: 5, children: "5" }),
                          /* @__PURE__ */ jsx25("option", { value: 10, children: "10" }),
                          /* @__PURE__ */ jsx25("option", { value: 20, children: "20" }),
                          /* @__PURE__ */ jsx25("option", { value: 50, children: "50" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx25("span", { children: "Rows per page" })
                  ] }),
                  /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxs16("span", { children: [
                      (invitesCurrentPage - 1) * invitesRowsPerPage + 1,
                      "-",
                      Math.min(
                        invitesCurrentPage * invitesRowsPerPage,
                        invitations.length
                      ),
                      " ",
                      "of ",
                      invitations.length
                    ] }),
                    /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxs16(
                        Button2,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-6 w-6",
                          disabled: invitesCurrentPage === 1,
                          onClick: () => setInvitesCurrentPage(
                            (p) => Math.max(1, p - 1)
                          ),
                          children: [
                            /* @__PURE__ */ jsx25("span", { className: "sr-only", children: "Previous" }),
                            "\u2039"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs16("span", { className: "text-gray-900 font-medium", children: [
                        invitesCurrentPage,
                        " / ",
                        totalInvitePages || 1,
                        " ",
                        "pages"
                      ] }),
                      /* @__PURE__ */ jsxs16(
                        Button2,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-6 w-6",
                          disabled: invitesCurrentPage === totalInvitePages,
                          onClick: () => setInvitesCurrentPage(
                            (p) => Math.min(totalInvitePages, p + 1)
                          ),
                          children: [
                            /* @__PURE__ */ jsx25("span", { className: "sr-only", children: "Next" }),
                            "\u203A"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              members.length === 0 && invitations.length === 0 ? /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center justify-center py-10 min-h-[300px]", children: [
                /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center gap-2 mb-4 opacity-50", children: [
                  /* @__PURE__ */ jsx25("div", { className: "w-16 h-8 bg-primary/10 rounded-md mb-[-10px] z-0 mx-auto" }),
                  /* @__PURE__ */ jsx25("div", { className: "w-20 h-10 bg-primary/10 rounded-md mb-[-15px] z-10 mx-auto border-2 border-white" }),
                  /* @__PURE__ */ jsxs16("div", { className: "w-24 h-12 bg-white border border-gray-200 shadow-sm rounded-md z-20 flex items-center gap-2 px-2", children: [
                    /* @__PURE__ */ jsx25("div", { className: "w-6 h-6 bg-gray-200 rounded-full" }),
                    /* @__PURE__ */ jsx25("div", { className: "h-2 w-10 bg-gray-200 rounded-full" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx25("h3", { className: "text-lg font-semibold mt-4", children: t("manageMembersModal.noMembersYet") }),
                /* @__PURE__ */ jsx25("p", { className: "text-sm text-gray-500 text-center max-w-sm mt-2", children: t("manageMembersModal.inviteTeammatesDescription") }),
                /* @__PURE__ */ jsxs16(
                  Button2,
                  {
                    className: "mt-6 bg-primary hover:bg-primary/90 text-white rounded-md px-8 h-10",
                    onClick: () => setShowInviteModal(true),
                    children: [
                      /* @__PURE__ */ jsx25(UserPlus, { className: "w-4 h-4 mr-2" }),
                      t("manageMembersModal.invite")
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-4 mt-2", children: [
                /* @__PURE__ */ jsx25("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs16("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxs16("h3", { className: "text-base font-semibold", children: [
                    "Members ",
                    members.length
                  ] }),
                  /* @__PURE__ */ jsx25("p", { className: "text-xs text-gray-500", children: "Invite teammates to start collaborating" })
                ] }) }),
                /* @__PURE__ */ jsxs16("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxs16("div", { className: "relative flex-1", children: [
                    /* @__PURE__ */ jsx25(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                    /* @__PURE__ */ jsx25(
                      Input,
                      {
                        placeholder: "Search",
                        className: "pl-9 h-10 bg-white border-gray-200 rounded-sm text-sm",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs16(
                    Button2,
                    {
                      className: "bg-primary hover:bg-primary/90 text-white h-10 px-6 rounded-sm font-normal",
                      onClick: () => setShowInviteModal(true),
                      children: [
                        /* @__PURE__ */ jsx25(UserPlus, { className: "w-4 h-4 mr-2" }),
                        t("manageMembersModal.invite")
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs16("div", { className: "w-full bg-white border border-gray-100 rounded-lg overflow-hidden", children: [
                  /* @__PURE__ */ jsxs16("div", { className: "hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500", children: [
                    /* @__PURE__ */ jsx25("div", { children: "Person" }),
                    /* @__PURE__ */ jsx25("div", { children: "Roles" }),
                    /* @__PURE__ */ jsx25("div", { className: "text-right", children: "Action" })
                  ] }),
                  paginatedMembers.map((member) => /* @__PURE__ */ jsxs16(
                    "div",
                    {
                      className: "relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxs16(Avatar2, { className: "size-10 ", children: [
                            /* @__PURE__ */ jsx25(AvatarImage2, { src: member.imageURL }),
                            /* @__PURE__ */ jsx25(AvatarFallback2, { className: "bg-primary/10 text-primary text-xs ", children: member.name.slice(0, 2).toUpperCase() })
                          ] }),
                          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsx25("span", { className: "text-sm font-medium text-gray-900", children: member.name }),
                            /* @__PURE__ */ jsx25("span", { className: "text-xs text-gray-500", children: member.email })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx25("div", { className: "ml-14 sm:ml-0", children: /* @__PURE__ */ jsxs16(DropdownMenu2, { children: [
                          /* @__PURE__ */ jsx25(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsxs16(
                            Button2,
                            {
                              variant: "ghost",
                              className: "h-8 px-2 text-sm font-normal text-gray-700 hover:bg-gray-100 capitalize justify-start w-24",
                              children: [
                                member.role,
                                /* @__PURE__ */ jsx25(ChevronDown3, { className: "w-4 h-4 ml-2" })
                              ]
                            }
                          ) }),
                          /* @__PURE__ */ jsxs16(DropdownMenuContent2, { children: [
                            /* @__PURE__ */ jsx25(
                              DropdownMenuItem2,
                              {
                                onClick: () => handleRolesUpdate(member.id, "viewer"),
                                children: "Viewer"
                              }
                            ),
                            /* @__PURE__ */ jsx25(
                              DropdownMenuItem2,
                              {
                                onClick: () => handleRolesUpdate(member.id, "editor"),
                                children: "Editor"
                              }
                            ),
                            /* @__PURE__ */ jsx25(
                              DropdownMenuItem2,
                              {
                                onClick: () => handleRolesUpdate(member.id, "manager"),
                                children: "Manager"
                              }
                            )
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx25("div", { className: "absolute right-2 top-2 sm:static flex justify-end", children: /* @__PURE__ */ jsxs16(DropdownMenu2, { children: [
                          /* @__PURE__ */ jsx25(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx25(
                            Button2,
                            {
                              variant: "ghost",
                              size: "icon",
                              className: "h-8 w-8 hover:bg-gray-100",
                              children: /* @__PURE__ */ jsx25(MoreVertical, { className: "w-4 h-4 text-gray-500" })
                            }
                          ) }),
                          /* @__PURE__ */ jsxs16(
                            DropdownMenuContent2,
                            {
                              align: "end",
                              className: "w-[200px] p-2",
                              children: [
                                /* @__PURE__ */ jsxs16(
                                  DropdownMenuItem2,
                                  {
                                    className: "gap-2 cursor-pointer py-2.5",
                                    onClick: () => handleCopyEmail(member.email),
                                    children: [
                                      /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsxs16(
                                        "svg",
                                        {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          width: "14",
                                          height: "14",
                                          viewBox: "0 0 14 14",
                                          fill: "none",
                                          children: [
                                            /* @__PURE__ */ jsxs16("g", { clipPath: "url(#clip0_7149_14050)", children: [
                                              /* @__PURE__ */ jsx25(
                                                "path",
                                                {
                                                  d: "M9.89553 5.23975C9.89413 3.51883 9.86811 2.62744 9.36708 2.01709C9.27037 1.89922 9.16228 1.79114 9.04444 1.69441C8.4005 1.16602 7.44389 1.16602 5.53054 1.16602C3.61722 1.16602 2.66056 1.16602 2.01666 1.69441C1.89878 1.79114 1.7907 1.89922 1.69396 2.01709C1.16553 2.66095 1.16553 3.61754 1.16553 5.53073C1.16553 7.44394 1.16553 8.40049 1.69396 9.04438C1.79069 9.16221 1.89878 9.2703 2.01666 9.36702C2.62705 9.86798 3.51851 9.894 5.23954 9.8954",
                                                  stroke: "#212121",
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round"
                                                }
                                              ),
                                              /* @__PURE__ */ jsx25(
                                                "path",
                                                {
                                                  d: "M8.18321 5.26412L9.9132 5.23926M8.17504 12.8339L9.90498 12.809M12.8168 8.17936L12.8005 9.90585M5.25606 8.18729L5.23975 9.91372M6.70096 5.26412C6.21516 5.35113 5.43543 5.44062 5.25606 6.44493M11.3719 12.809C11.859 12.7295 12.64 12.6519 12.8348 11.6505M11.3719 5.26412C11.8577 5.35113 12.6374 5.44062 12.8168 6.44493M6.70837 12.8082C6.22257 12.7215 5.44276 12.6324 5.26285 11.6282",
                                                  stroke: "#212121",
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round"
                                                }
                                              )
                                            ] }),
                                            /* @__PURE__ */ jsx25("defs", { children: /* @__PURE__ */ jsx25("clipPath", { id: "clip0_7149_14050", children: /* @__PURE__ */ jsx25(
                                              "rect",
                                              {
                                                width: "14",
                                                height: "14",
                                                fill: "white"
                                              }
                                            ) }) })
                                          ]
                                        }
                                      ) }),
                                      /* @__PURE__ */ jsx25("span", { children: "Copy Email" })
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxs16(
                                  DropdownMenuItem2,
                                  {
                                    className: "gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50",
                                    onClick: () => setMemberToRemove(member),
                                    children: [
                                      /* @__PURE__ */ jsx25("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx25(
                                        "svg",
                                        {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          width: "13",
                                          height: "14",
                                          viewBox: "0 0 13 14",
                                          fill: "none",
                                          children: /* @__PURE__ */ jsx25(
                                            "path",
                                            {
                                              d: "M0.879331 6.34768L1.91868 9.13184C2.40271 10.4285 2.64476 11.0768 3.03998 11.5211C3.64442 12.2004 4.51484 12.5977 5.43492 12.6144C6.03661 12.6252 6.69948 12.39 8.02521 11.9195C8.72048 11.6728 9.06812 11.5494 9.36568 11.3651C9.81966 11.0838 10.1948 10.6965 10.4573 10.2381C10.6294 9.93764 10.7365 9.59162 10.9505 8.89957L11.8938 5.85011C12.0388 5.38158 11.8408 4.87587 11.4125 4.62071C10.8528 4.28722 10.1217 4.5027 9.84555 5.08255L9.21565 6.40503L7.44206 1.65401C7.25756 1.15976 6.69705 0.904925 6.19011 1.08482C5.68317 1.26471 5.42185 1.81121 5.60635 2.30545M5.60635 2.30545L5.16087 1.11223C4.97636 0.617985 4.41585 0.363153 3.90898 0.543045C3.40204 0.722931 3.14065 1.26943 3.32515 1.76368L3.77057 2.95689M5.60635 2.30545L6.60857 4.99019M3.77057 2.95689C3.58607 2.46265 3.02556 2.20781 2.51868 2.3877C2.01174 2.56759 1.75035 3.11409 1.93485 3.60833L2.38027 4.80155M3.77057 2.95689L4.77286 5.64162M2.38027 4.80155C2.19577 4.3073 1.63526 4.05247 1.12839 4.23236C0.621447 4.41225 0.360058 4.95875 0.544559 5.453L1.10137 6.94451M2.38027 4.80155L2.93708 6.2931",
                                              stroke: "#F44336",
                                              strokeWidth: "0.97035",
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round"
                                            }
                                          )
                                        }
                                      ) }),
                                      /* @__PURE__ */ jsx25("span", { children: "Remove From Space" })
                                    ]
                                  }
                                )
                              ]
                            }
                          )
                        ] }) })
                      ]
                    },
                    member.id
                  )),
                  filteredMembers.length === 0 && /* @__PURE__ */ jsxs16("div", { className: "p-8 text-center text-gray-500 text-sm", children: [
                    'No members found matching "',
                    searchQuery,
                    '"'
                  ] })
                ] }),
                filteredMembers.length > 0 && /* @__PURE__ */ jsxs16("div", { className: "flex items-center justify-between px-2 text-xs text-gray-500 mt-2", children: [
                  /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxs16(
                      "select",
                      {
                        className: "border border-gray-200 rounded p-1 bg-white focus:outline-none focus:border-primary",
                        value: rowsPerPage,
                        onChange: (e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        },
                        children: [
                          /* @__PURE__ */ jsx25("option", { value: 10, children: "10" }),
                          /* @__PURE__ */ jsx25("option", { value: 20, children: "20" }),
                          /* @__PURE__ */ jsx25("option", { value: 50, children: "50" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx25("span", { children: "Rows per page" })
                  ] }),
                  /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxs16("span", { children: [
                      (currentPage - 1) * rowsPerPage + 1,
                      "-",
                      Math.min(
                        currentPage * rowsPerPage,
                        filteredMembers.length
                      ),
                      " ",
                      "of ",
                      filteredMembers.length
                    ] }),
                    /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxs16(
                        Button2,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-6 w-6",
                          disabled: currentPage === 1,
                          onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                          children: [
                            /* @__PURE__ */ jsx25("span", { className: "sr-only", children: "Previous" }),
                            "\u2039"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs16("span", { className: "text-gray-900 font-medium", children: [
                        currentPage,
                        " / ",
                        totalPages || 1,
                        " pages"
                      ] }),
                      /* @__PURE__ */ jsxs16(
                        Button2,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-6 w-6",
                          disabled: currentPage === totalPages,
                          onClick: () => setCurrentPage(
                            (p) => Math.min(totalPages, p + 1)
                          ),
                          children: [
                            /* @__PURE__ */ jsx25("span", { className: "sr-only", children: "Next" }),
                            "\u203A"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "settings" && /* @__PURE__ */ jsxs16("div", { className: "flex-1 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto", children: [
            /* @__PURE__ */ jsx25("h2", { className: "text-xl font-semibold capitalize", children: t("manageMembersModal.settings") }),
            /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxs16("div", { className: "grid w-full max-w-sm items-center gap-1.5", children: [
                /* @__PURE__ */ jsx25(
                  Label3,
                  {
                    htmlFor: "spaceName",
                    className: "text-sm font-medium text-gray-700",
                    children: "Space Name"
                  }
                ),
                /* @__PURE__ */ jsx25(
                  Input,
                  {
                    type: "text",
                    id: "spaceName",
                    placeholder: "Enter space name",
                    value: settingsSpaceName,
                    onChange: (e) => setSettingsSpaceName(e.target.value),
                    className: "bg-white"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx25("div", { className: "pt-4", children: /* @__PURE__ */ jsx25(
                Button2,
                {
                  onClick: handleUpdateSpace,
                  disabled: savingSettings || !settingsSpaceName.trim(),
                  className: "bg-primary hover:bg-primary/90 text-white min-w-[120px]",
                  children: savingSettings ? /* @__PURE__ */ jsx25(Loader22, { className: "w-4 h-4 animate-spin" }) : "Save Changes"
                }
              ) })
            ] })
          ] })
        ] })
      }
    ),
    memberToRemove && /* @__PURE__ */ jsx25(
      Dialog,
      {
        open: !!memberToRemove,
        onOpenChange: (open) => !open && setMemberToRemove(null),
        children: /* @__PURE__ */ jsxs16(
          DialogContent,
          {
            overlayClassName: "z-[10010]",
            className: "sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 text-black z-[10010]",
            children: [
              /* @__PURE__ */ jsx25("div", { className: "w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 font-bold text-lg", children: memberToRemove.name.substring(0, 2).toUpperCase() }),
              /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxs16("h3", { className: "text-lg font-semibold text-gray-900", children: [
                  "Remove ",
                  memberToRemove.email,
                  " from Space?"
                ] }),
                /* @__PURE__ */ jsx25("p", { className: "text-sm text-gray-500 max-w-[300px] mx-auto leading-relaxed", children: "They have been an active Nitx member. Removing them may cause loss of private pages." })
              ] }),
              /* @__PURE__ */ jsxs16("div", { className: "flex flex-col w-full gap-2 mt-2", children: [
                /* @__PURE__ */ jsx25(
                  Button2,
                  {
                    onClick: confirmRemoveMember,
                    className: "w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11",
                    children: "Remove"
                  }
                ),
                /* @__PURE__ */ jsx25(
                  Button2,
                  {
                    variant: "ghost",
                    onClick: () => setMemberToRemove(null),
                    className: "w-full text-gray-600 font-normal hover:bg-gray-50 rounded-lg h-11",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx25(
      ManageMembersModal_default,
      {
        isOpen: showInviteModal,
        onClose: () => {
          setShowInviteModal(false);
          setMemberToEdit(null);
        },
        initialEmail: memberToEdit?.email,
        initialRole: memberToEdit?.role
      }
    )
  ] });
};
var MembersAndNumbersModal_default = MembersAndNumbersModal;

// src/components/space-selector/components/modals/DeleteConfirmationModal.tsx
import { Loader2 as Loader23, Trash2 as Trash22 } from "lucide-react";
import { useTranslation as useTranslation9 } from "react-i18next";
import React19 from "react";
import { jsx as jsx26, jsxs as jsxs17 } from "react/jsx-runtime";
var DeleteConfirmationModal = () => {
  const { t } = useTranslation9("modals");
  const { activeModal, modalProps, setModal } = useSpaceSelector();
  const [isLoading, setIsLoading] = React19.useState(false);
  if (activeModal !== "deleteConfirmation" || !modalProps?.deleteModalInfo) {
    return null;
  }
  const { title, description, onDelete } = modalProps.deleteModalInfo;
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      setModal(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx26(Dialog, { open: true, onOpenChange: (open) => !open && setModal(null), children: /* @__PURE__ */ jsxs17(
    DialogContent,
    {
      overlayClassName: "z-[10010]",
      className: "sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 text-black z-[10010]",
      children: [
        /* @__PURE__ */ jsx26("div", { className: "w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1", children: /* @__PURE__ */ jsx26(Trash22, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs17("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx26("h3", { className: "text-lg font-semibold text-gray-900", children: title || t("deleteConfirmation") }),
          /* @__PURE__ */ jsx26("p", { className: "text-sm text-gray-500 max-w-[300px] mx-auto leading-relaxed", children: description })
        ] }),
        /* @__PURE__ */ jsxs17("div", { className: "flex flex-col w-full gap-2 mt-2", children: [
          /* @__PURE__ */ jsx26(
            Button2,
            {
              onClick: handleConfirm,
              className: "w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11",
              disabled: isLoading,
              children: isLoading ? /* @__PURE__ */ jsx26(Loader23, { className: "w-4 h-4 animate-spin" }) : t("remove", "Remove")
            }
          ),
          /* @__PURE__ */ jsx26(
            Button2,
            {
              variant: "ghost",
              onClick: () => setModal(null),
              className: "w-full text-gray-600 font-normal hover:bg-gray-50 rounded-lg h-11",
              disabled: isLoading,
              children: t("cancel")
            }
          )
        ] })
      ]
    }
  ) });
};
var DeleteConfirmationModal_default = DeleteConfirmationModal;

// src/components/space-selector/SpaceSelector.tsx
import { Fragment as Fragment2, jsx as jsx27, jsxs as jsxs18 } from "react/jsx-runtime";
var SpaceSelectorContent = () => {
  const { t } = useTranslation10("shared");
  const {
    spaces,
    activeSpace,
    setActiveSpace,
    isExpanded,
    setModal,
    setModalProps
  } = useSpaceSelector();
  const [showOptions, setShowOptions] = useState10(false);
  const isRTL = typeof document !== "undefined" && document.dir === "rtl";
  const sortedSpaces = useMemo(() => {
    return [...spaces].sort((a, b) => {
      if (a.proxyId === activeSpace?.proxyId) return -1;
      if (b.proxyId === activeSpace?.proxyId) return 1;
      return 0;
    });
  }, [spaces, activeSpace]);
  const handleChange = (space) => {
    setShowOptions(false);
    setActiveSpace(space);
  };
  return /* @__PURE__ */ jsxs18(Fragment2, { children: [
    /* @__PURE__ */ jsx27("div", { className: "relative w-full", children: /* @__PURE__ */ jsxs18(DropdownMenu2, { onOpenChange: setShowOptions, children: [
      /* @__PURE__ */ jsx27(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx27(
        "div",
        {
          className: cn2(
            "w-full h-auto bg-accent px-5 py-2 rounded-lg flex items-center cursor-pointer transition-all duration-300 border border-transparent hover:border-primary",
            !isExpanded && "items-center justify-center w-[40px] h-[40px] mx-auto",
            showOptions && "border-primary"
          ),
          children: isExpanded ? /* @__PURE__ */ jsxs18(Fragment2, { children: [
            /* @__PURE__ */ jsxs18("div", { className: "w-full flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx27("span", { className: "text-xs", children: t("sidebar.Space") }),
              /* @__PURE__ */ jsxs18("div", { className: "text-sm xl:text-base w-full max-w-40 capitalize truncate", children: [
                /* @__PURE__ */ jsx27("p", { children: activeSpace?.name }),
                !activeSpace?.name && /* @__PURE__ */ jsx27(Skeleton, { className: "h-4 w-3/4 bg-gray-300/80" })
              ] })
            ] }),
            /* @__PURE__ */ jsx27(
              ChevronDown4,
              {
                className: cn2(
                  "w-4 h-4 xl:w-5 xl:h-5 transition ease-linear duration-300",
                  showOptions && "-scale-y-100"
                )
              }
            )
          ] }) : /* @__PURE__ */ jsx27("div", { children: /* @__PURE__ */ jsx27(Building2, { className: "w-5 h-5" }) })
        }
      ) }),
      /* @__PURE__ */ jsxs18(DropdownMenuContent2, { className: "w-full min-w-[260px] bg-white rounded-lg p-1 border flex-col gap-1 text-sm shadow-lg z-[100]", children: [
        /* @__PURE__ */ jsx27(
          "p",
          {
            className: `text-[11px] text-zinc-600 uppercase p-3 ${isRTL ? "!text-right" : "!text-left"}`,
            children: t("sidebar.Recently Spaces")
          }
        ),
        sortedSpaces.slice(0, 3).map((option, key) => /* @__PURE__ */ jsxs18(
          DropdownMenuItem2,
          {
            onClick: () => handleChange(option),
            className: "w-full flex text-sm capitalize justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx27(Building2, { className: "w-4 h-4 stroke-[1.5]" }),
              /* @__PURE__ */ jsx27("p", { className: "max-w-[8rem] truncate", children: option.name }),
              /* @__PURE__ */ jsx27(
                CheckCircle,
                {
                  className: cn2(
                    "ms-auto w-4 h-4 stroke-zinc-400",
                    activeSpace?.proxyId === option.proxyId && "stroke-primary"
                  )
                }
              )
            ]
          },
          key
        )),
        /* @__PURE__ */ jsx27(DropdownMenuSeparator2, {}),
        /* @__PURE__ */ jsxs18("div", { className: "w-full flex flex-col", children: [
          /* @__PURE__ */ jsx27(
            DropdownMenuItem2,
            {
              onClick: () => setModal("browseSpace"),
              className: "w-full p-2 transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
              children: /* @__PURE__ */ jsxs18("div", { className: "w-full flex gap-3 justify-start items-center", children: [
                /* @__PURE__ */ jsx27(SquareArrowOutUpRight, { className: "w-4 h-4 stroke-[1.5]" }),
                t("sidebar.Browse More")
              ] })
            }
          ),
          /* @__PURE__ */ jsxs18(
            DropdownMenuItem2,
            {
              onClick: () => setModal("newSpace"),
              className: "w-full flex justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx27(SquarePlus, { className: "w-4 h-4 stroke-[1.5]" }),
                t("sidebar.New Space")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx27(DropdownMenuSeparator2, {}),
        /* @__PURE__ */ jsxs18(
          DropdownMenuItem2,
          {
            onClick: () => {
              setModal("membersAndNumbers");
              setModalProps({
                manageSpaceMembers: {
                  spaceId: activeSpace?.space_uuid || "",
                  spaceName: activeSpace?.name || ""
                }
              });
            },
            className: "w-full flex justify-start mt-1 px-2 py-4 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx27(Users22, { className: "w-4 h-4 stroke-[1.5]" }),
              t("sidebar.Manage Members")
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx27(BrowseSpaceModal_default, {}),
    /* @__PURE__ */ jsx27(NewSpaceModal_default, {}),
    /* @__PURE__ */ jsx27(MembersAndNumbersModal_default, {}),
    /* @__PURE__ */ jsx27(ManageMembersModal_default, {}),
    /* @__PURE__ */ jsx27(DeleteConfirmationModal_default, {})
  ] });
};
var SpaceSelector = (props) => {
  return /* @__PURE__ */ jsx27(SpaceSelectorProvider, { ...props, children: /* @__PURE__ */ jsx27(SpaceSelectorContent, {}) });
};

// src/components/space-selector/lib/create-api.ts
var createSpaceSelectorApi = (client) => {
  return {
    createSpace: async (name) => {
      const { data } = await client.post("/api/spaces", { name });
      return data.data;
    },
    deleteSpace: async (id) => {
      await client.delete(`/api/spaces/${id}`);
    },
    renameSpace: async (id, name) => {
      await client.put(`/api/spaces/${id}`, { name });
    },
    fetchMembers: async (spaceId) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/members`);
      return data.data;
    },
    fetchInvitations: async (spaceId) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/invitations`);
      return data.data;
    },
    inviteMembers: async (spaceId, emails, role) => {
      await client.post(`/api/my-space/${spaceId}/invitations`, {
        emails,
        role
      });
    },
    removeMember: async (spaceId, memberId) => {
      await client.delete(`/api/my-space/${spaceId}/members/${memberId}`);
    },
    updateMemberRole: async (spaceId, memberId, role, email) => {
      await client.put(`/api/my-space/${spaceId}/members/${memberId}`, {
        role,
        email
      });
    },
    revokeInvitation: async (spaceId, inviteId) => {
      await client.delete(`/api/my-space/${spaceId}/invitations/${inviteId}`);
    },
    resendInvitation: async (spaceId, inviteId) => {
      await client.post(`/api/my-space/${spaceId}/invitations/${inviteId}/resend`);
    },
    getInviteLink: async (spaceId, inviteId) => {
      const { data } = await client.get(`/api/my-space/${spaceId}/invitations/${inviteId}/link`);
      return data.data?.link;
    },
    fetchStats: async () => {
      const [screensRes, licensesRes] = await Promise.all([
        client.get("/api/screens"),
        client.get("/api/licenses/available-count")
      ]);
      return {
        screens: screensRes.data.data?.length || 0,
        licenses: licensesRes.data.data?.available_count || 0
      };
    }
  };
};
export {
  ProductSwitcher,
  SpaceSelector,
  SpaceSelectorProvider,
  UserAccount,
  createSpaceSelectorApi,
  useSpaceSelector
};
