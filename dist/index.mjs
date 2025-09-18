// src/components/ui/dropdown-menu.tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// src/lib/utils.ts
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
  image,
  title,
  url,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs2(
    Link,
    {
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
  const mediaOwner = [
    {
      title: "Nitx Signage",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/signage-icon.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#"
    },
    {
      title: "Nitx Publisher",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/publisher-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#"
    }
    // {
    //   title: "Nitx Nexus",
    //   image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/nexus-logo.svg",
    //   url: `${process.env.NEXT_PUBLIC_NEXUS_URL}/${auth_user}` || "#",
    // },
  ];
  const advertiser = [
    {
      title: "Nitx Ads",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/ads-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#"
    },
    {
      title: "Nitx Studio",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/studio-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#"
    }
  ];
  return /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
    /* @__PURE__ */ jsx5(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx5(Button, { size: "icon", variant: "outline", className: "shadow-none", children: /* @__PURE__ */ jsx5(Grip, { className: "w-6 h-6" }) }) }),
    /* @__PURE__ */ jsxs3(DropdownMenuContent, { align: "end", className: "w-80 p-4 rounded-2xl", children: [
      /* @__PURE__ */ jsxs3(
        "a",
        {
          href: profile.url,
          target: "_blank",
          className: "flex items-center w-full p-3 gap-2 rounded-xl border dark:border-zinc-700/50 mb-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:hover:text-white transition",
          children: [
            /* @__PURE__ */ jsxs3(Avatar, { className: "rounded-[4px] size-8", children: [
              /* @__PURE__ */ jsx5(
                AvatarImage,
                {
                  className: "rounded-[4px] size-8 overflow-clip",
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
      /* @__PURE__ */ jsx5("div", { className: "mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-400", children: "Media Owner" }),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-2 gap-3 mb-4", children: mediaOwner.map((product) => /* @__PURE__ */ jsx5(product_icon_default, { ...product }, product.title)) }),
      /* @__PURE__ */ jsx5("div", { className: "mb-2 mt-10 text-sm font-semibold text-zinc-700 dark:text-zinc-200", children: "Advertiser" }),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-2 gap-3", children: advertiser.map((product) => /* @__PURE__ */ jsx5(product_icon_default, { ...product }, product.title)) })
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
  const router = useRouter();
  useEffect2(() => {
    setIsMounted(true);
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
  return /* @__PURE__ */ jsx6("div", { className: "relative w-full", children: /* @__PURE__ */ jsxs4(DropdownMenu, { onOpenChange: () => setOnOpen(!onOpen), children: [
    /* @__PURE__ */ jsx6(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs4(
      "div",
      {
        className: cn(
          "w-10 h-10 lg:w-full lg:h-auto border border-zinc-100 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-700/50 lg:p-3 rounded-[16px] flex items-center gap-2 overflow-hidden cursor-pointer transitio-all duration-300 hover:border-primary ",
          !isExpanded && "p-0 bg-transparent size-[40px] mx-auto",
          onOpen && "border-primary"
        ),
        children: [
          /* @__PURE__ */ jsxs4(
            Avatar,
            {
              className: cn(
                "rounded-[10px] size-10 lg:size-12 overflow-clip",
                !isExpanded && "lg:size-[40px] mx-auto"
              ),
              children: [
                /* @__PURE__ */ jsx6(AvatarImage, { src: `${activeAccount?.imageUrl}` }),
                /* @__PURE__ */ jsx6(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${activeAccount.name.split(" ").map((n) => n[0].toUpperCase()).join("")}` })
              ]
            }
          ),
          isExpanded && /* @__PURE__ */ jsxs4("div", { className: "w-full hidden lg:flex items-center gap-2", children: [
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
        (account, idx) => account.active ? /* @__PURE__ */ jsxs4(
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
export {
  ProductSwitcher,
  UserAccount
};
