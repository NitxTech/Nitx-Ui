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
  dark_image,
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
      className: `flex items-center ltr:flex-row rtl:flex-row-reverse w-full p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:border-zinc-700/50 transition ${className}`,
      children: [
        /* @__PURE__ */ jsx3(Image, { width: 28, height: 28, src: image, alt: title, className: "mr-3 dark:hidden" }),
        /* @__PURE__ */ jsx3(Image, { width: 28, height: 28, src: dark_image, alt: title, className: "mr-3 hidden dark:block" }),
        /* @__PURE__ */ jsx3("span", { className: "font-medium text-sm text-left", children: title })
      ]
    }
  );
};
var product_icon_default = ProductIcon;

// src/components/product-switcher/product-switcher.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("nitxuilib");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const profile = {
    name: t("productSwitcher.manageMyAccount"),
    icon: profileIcon,
    url: `${process.env.NEXT_PUBLIC_MY_NITX_URL}/${auth_user}` || "#"
  };
  const products = [
    {
      id: "nitx-signage",
      title: "Nitx Signage",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/signage-icon.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/signage-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-publisher",
      title: "Nitx Publisher",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/publisher-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/publisher-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-ads",
      title: "Nitx Ads",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/ads-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/ads-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-studio",
      title: "Nitx Studio",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/studio-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/studio-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#"
    },
    {
      id: "nitx-reach",
      title: "Nitx Reach",
      image: "https://res.cloudinary.com/dj3rzny5p/image/upload/v1765777010/Nitx_Reach_Group_1_h6bsbj.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/reach-dark.svg",
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
              /* @__PURE__ */ jsx5(AvatarFallback, { className: "rounded-none bg-primary text-white ", children: `${(profileName || t("productSwitcher.userFallback")).split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")}` })
            ] }),
            /* @__PURE__ */ jsx5("span", { className: "flex-1 text-start font-medium", children: profile.name }),
            /* @__PURE__ */ jsx5(ChevronRight2, { className: "size-4 rtl:rotate-180" })
          ]
        }
      ),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-2 gap-3 mb-4 ltr", dir: "ltr", children: products.map((product) => /* @__PURE__ */ jsx5(product_icon_default, { ...product }, product.id)) })
    ] })
  ] });
};

// src/components/user-account/account.tsx
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronDown, LogOut, PlusSquare } from "lucide-react";
import { useEffect as useEffect2, useState as useState2 } from "react";
import Link2 from "next/link";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var UserAccount = ({
  accounts,
  isExpanded,
  auth_user
}) => {
  const { t } = useTranslation2("nitxuilib");
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
                t("userAccount.addAnotherAccount")
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
            t("userAccount.signOut")
          ]
        }
      )
    ] })
  ] }) });
};

// src/components/space-selector/context.tsx
import {
  createContext,
  useContext,
  useState as useState3
} from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var SpaceSelectorContext = createContext(void 0);
var useOptionalSpaceSelector = () => {
  return useContext(SpaceSelectorContext);
};
var useSpaceSelector = () => {
  const context = useOptionalSpaceSelector();
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
  isExpanded = true,
  isLoading = false,
  error = null,
  onFail = () => {
  }
}) => {
  const [activeModal, setActiveModal] = useState3(null);
  const [modalProps, setModalProps] = useState3({});
  const setModal = (modal) => {
    setActiveModal(modal);
    if (modal === null) setModalProps({});
  };
  return /* @__PURE__ */ jsx7(
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
        authUser,
        isLoading,
        error,
        onFail
      },
      children
    }
  );
};

// src/components/space-selector/components/modals/BrowseSpaceModal.tsx
import { useTranslation as useTranslation10 } from "react-i18next";

// src/components/space-selector/ui/drawer-dialog.tsx
import * as React7 from "react";
import { useTranslation as useTranslation4 } from "react-i18next";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// src/components/space-selector/lib/utils.ts
import { clsx as clsx2 } from "clsx";
import { twMerge as twMerge2 } from "tailwind-merge";
function cn2(...inputs) {
  return twMerge2(clsx2(inputs));
}

// src/components/space-selector/ui/drawer-dialog.tsx
import { useMediaQuery } from "usehooks-ts";

// src/components/space-selector/ui/dialog.tsx
import * as React5 from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx8(
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
var DialogContent = React5.forwardRef(({ className, children, overlayClassName, ...props }, ref) => {
  const { t } = useTranslation3("nitxuilib");
  return /* @__PURE__ */ jsxs5(DialogPortal, { children: [
    /* @__PURE__ */ jsx8(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxs5(
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
          /* @__PURE__ */ jsxs5(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-[10001]", children: [
            /* @__PURE__ */ jsx8(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx8("span", { className: "sr-only", children: t("dialog.close") })
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
}) => /* @__PURE__ */ jsx8(
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
}) => /* @__PURE__ */ jsx8(
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
var DialogTitle = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx8(
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
var DialogDescription = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx8(
  DialogPrimitive.Description,
  {
    ref,
    className: cn2("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/space-selector/ui/drawer.tsx
import * as React6 from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ jsx9(
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
var DrawerOverlay = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  DrawerPrimitive.Overlay,
  {
    ref,
    className: cn2("fixed inset-0 z-[9999] bg-black/80", className),
    style: { pointerEvents: "auto" },
    ...props
  }
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
var DrawerContent = React6.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs6(DrawerPortal, { children: [
  /* @__PURE__ */ jsx9(DrawerOverlay, {}),
  /* @__PURE__ */ jsxs6(
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
        /* @__PURE__ */ jsx9("div", { className: "mx-auto mt-4 h-3 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx9(
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
}) => /* @__PURE__ */ jsx9(
  "div",
  {
    className: cn2("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  }
);
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
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
var DrawerDescription = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
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
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
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
  bodyClassName,
  size = "default",
  back,
  onClose,
  open = true,
  overlayClassName
}) {
  const { t } = useTranslation4("nitxuilib");
  const [isMounted, setIsMounted] = React7.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1140px)");
  const handleChange = (isOpen) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };
  React7.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  if (isDesktop) {
    return /* @__PURE__ */ jsx10(Dialog, { open, onOpenChange: handleChange, children: /* @__PURE__ */ jsxs7(
      DialogContent,
      {
        overlayClassName,
        className: cn2(
          "flex flex-col gap-4 max-h-[96vh] pt-0 border-none overflow-hidden",
          sizeVariants[size],
          className
        ),
        children: [
          back && /* @__PURE__ */ jsxs7(
            "button",
            {
              className: "flex items-center hover:scale-95 hover:opacity-80 transition-all duration-300 w-fit p-5 pb-0",
              onClick: back,
              children: [
                /* @__PURE__ */ jsx10(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                t("drawerDialog.back")
              ]
            }
          ),
          title || description || back ? /* @__PURE__ */ jsxs7(DialogHeader, { className: "p-5 h-auto flex-shrink-0", children: [
            /* @__PURE__ */ jsx10(
              DialogTitle,
              {
                className: cn2(!title && " sr-only", !!back && "text-lg"),
                children: title
              }
            ),
            /* @__PURE__ */ jsx10(VisuallyHidden.Root, { children: title || t("drawerDialog.modalTitle") }),
            /* @__PURE__ */ jsx10(DialogDescription, { className: "text-sm", children: description })
          ] }) : /* @__PURE__ */ jsx10(VisuallyHidden.Root, { children: /* @__PURE__ */ jsx10(DialogTitle, { children: t("drawerDialog.modalTitle") }) }),
          /* @__PURE__ */ jsx10(
            "div",
            {
              className: cn2(
                "flex-grow flex flex-col min-h-0 w-full overflow-y-auto",
                bodyClassName
              ),
              children
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsx10(Drawer, { open, onOpenChange: handleChange, children: /* @__PURE__ */ jsxs7(DrawerContent, { className: " max-h-[calc(100vh-3rem)]", children: [
    /* @__PURE__ */ jsxs7(DrawerHeader, { className: "text-left px-0 pb-0", children: [
      /* @__PURE__ */ jsx10(DialogTrigger, { className: "sr-only", children: title }),
      title,
      /* @__PURE__ */ jsx10(DrawerDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx10("div", { className: cn2("flex flex-col h-auto overflow-y-auto", bodyClassName), children })
  ] }) });
}

// src/components/spaces/SpaceBrowser.tsx
import { useEffect as useEffect4, useState as useState6 } from "react";
import { useTranslation as useTranslation9 } from "react-i18next";

// src/components/space-selector/ui/search-input.tsx
import { SearchIcon } from "lucide-react";
import { useTranslation as useTranslation5 } from "react-i18next";

// src/components/space-selector/ui/input.tsx
import * as React8 from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Input = React8.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx11(
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
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var SearchInput = (props) => {
  const { t } = useTranslation5("nitxuilib");
  return /* @__PURE__ */ jsxs8("div", { className: "relative flex-grow", children: [
    /* @__PURE__ */ jsx12(
      Input,
      {
        type: "search",
        placeholder: props.placeholder ?? t("searchInput.placeholder"),
        className: "w-full p-6 border-neutral-200 bg-neutral-50 text-neutral-900 rounded-lg shadow-none placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500",
        ...props
      }
    ),
    /* @__PURE__ */ jsx12(SearchIcon, { className: "w-4 h-4 absolute top-1/2 end-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" })
  ] });
};
var search_input_default = SearchInput;

// src/components/spaces/SpaceBrowser.tsx
import { SquarePlusIcon } from "lucide-react";

// src/components/space-selector/ui/card.tsx
import * as React9 from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var Card = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
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
var CardHeader = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
  "div",
  {
    ref,
    className: cn2("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
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
var CardDescription = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
  "div",
  {
    ref,
    className: cn2("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13("div", { ref, className: cn2("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx13(
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

// src/components/space-selector/ui/dropdown-menu.tsx
import * as React10 from "react";
import * as DropdownMenuPrimitive2 from "@radix-ui/react-dropdown-menu";
import { Check as Check2, ChevronRight as ChevronRight3, Circle as Circle2 } from "lucide-react";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var DropdownMenu2 = DropdownMenuPrimitive2.Root;
var DropdownMenuTrigger2 = DropdownMenuPrimitive2.Trigger;
var DropdownMenuSubTrigger2 = React10.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs9(
  DropdownMenuPrimitive2.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-neutral-900 outline-none focus:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-50 dark:focus:bg-neutral-800 dark:data-[state=open]:bg-neutral-800 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx14(ChevronRight3, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger2.displayName = DropdownMenuPrimitive2.SubTrigger.displayName;
var DropdownMenuSubContent2 = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx14(
  DropdownMenuPrimitive2.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 p-1 text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent2.displayName = DropdownMenuPrimitive2.SubContent.displayName;
var DropdownMenuContent2 = React10.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx14(DropdownMenuPrimitive2.Portal, { children: /* @__PURE__ */ jsx14(
  DropdownMenuPrimitive2.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-[300] max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-neutral-200 bg-neutral-50 p-1 text-neutral-900 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent2.displayName = DropdownMenuPrimitive2.Content.displayName;
var DropdownMenuItem2 = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx14(
  DropdownMenuPrimitive2.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-neutral-900 outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 dark:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem2.displayName = DropdownMenuPrimitive2.Item.displayName;
var DropdownMenuCheckboxItem2 = React10.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs9(
  DropdownMenuPrimitive2.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-neutral-900 outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 dark:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx14("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx14(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx14(Check2, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem2.displayName = DropdownMenuPrimitive2.CheckboxItem.displayName;
var DropdownMenuRadioItem2 = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs9(
  DropdownMenuPrimitive2.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-neutral-900 outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 dark:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx14("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx14(DropdownMenuPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx14(Circle2, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem2.displayName = DropdownMenuPrimitive2.RadioItem.displayName;
var DropdownMenuLabel2 = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx14(
  DropdownMenuPrimitive2.Label,
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
DropdownMenuLabel2.displayName = DropdownMenuPrimitive2.Label.displayName;
var DropdownMenuSeparator2 = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx14(
  DropdownMenuPrimitive2.Separator,
  {
    ref,
    className: cn(
      "-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-700",
      className
    ),
    ...props
  }
));
DropdownMenuSeparator2.displayName = DropdownMenuPrimitive2.Separator.displayName;
var DropdownMenuShortcut2 = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx14(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut2.displayName = "DropdownMenuShortcut";

// src/components/space-selector/components/SpaceCard.tsx
import { useTranslation as useTranslation6 } from "react-i18next";
import { useState as useState5 } from "react";
import { toast } from "sonner";

// src/components/ui/skeleton.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: cn(
        "animate-shimmer rounded-md bg-gray-300/50 dark:bg-gray-700/50",
        className
      ),
      ...props
    }
  );
}

// src/components/space-selector/components/SpaceCard.tsx
import { jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
var SpaceCardSkeleton = () => {
  return /* @__PURE__ */ jsxs10(Card, { className: "shadow-none bg-neutral-50 border-[.5px] border-neutral-200 p-3 w-full lg:w-auto min-w-72 flex gap-4 dark:bg-neutral-900 dark:border-neutral-800", children: [
    /* @__PURE__ */ jsxs10("div", { className: "w-full flex-1 flex gap-4 items-center", children: [
      /* @__PURE__ */ jsx16(Skeleton, { className: "w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-lg shrink-0" }),
      /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-2 w-full", children: [
        /* @__PURE__ */ jsx16(Skeleton, { className: "h-3.5 w-32 rounded" }),
        /* @__PURE__ */ jsx16(Skeleton, { className: "h-3 w-20 rounded" })
      ] })
    ] }),
    /* @__PURE__ */ jsx16(Skeleton, { className: "size-10 rounded-sm shrink-0" })
  ] });
};
var SpaceCard = ({ id, name, members, className }) => {
  const { t } = useTranslation6("nitxuilib");
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
        "shadow-none bg-neutral-50 border-[.5px] border-neutral-200 p-3 w-full lg:w-auto min-w-72 flex gap-4 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs10("div", { className: "w-full flex-1 flex gap-4 items-center", children: [
          /* @__PURE__ */ jsx16("div", { children: /* @__PURE__ */ jsx16("div", { className: "w-10 h-10 lg:w-[50px] lg:h-[50px] bg-[#007AFF1A] rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs10(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "55",
              height: "55",
              viewBox: "0 0 55 55",
              fill: "none",
              children: [
                /* @__PURE__ */ jsx16(
                  "rect",
                  {
                    width: "55",
                    height: "55",
                    rx: "13",
                    fill: "#007AFF",
                    fillOpacity: "0.1"
                  }
                ),
                /* @__PURE__ */ jsx16(
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
            /* @__PURE__ */ jsx16("p", { className: "text-sm max-w-[10rem] truncate", children: name }),
            /* @__PURE__ */ jsxs10(
              "h2",
              {
                className: cn2(
                  "text-[12.42px] text-neutral-500 dark:text-neutral-400"
                ),
                children: [
                  members,
                  " ",
                  t("spaceCard.members")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs10(DropdownMenu2, { children: [
          /* @__PURE__ */ jsx16(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx16(
            "button",
            {
              className: "size-10 hover:bg-neutral-200/40 text-neutral-700 flex items-center justify-center rounded-sm dark:hover:bg-neutral-800 dark:text-neutral-200",
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
              },
              children: /* @__PURE__ */ jsx16(MoreHorizontal, { className: "size-4" })
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
                  /* @__PURE__ */ jsx16(Pen, { className: "w-4 h-4 mr-1" }),
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
                  /* @__PURE__ */ jsx16(Users2, { className: "w-4 h-4 mr-1" }),
                  t("spaceCard.manageMembers")
                ]
              }
            ),
            /* @__PURE__ */ jsx16(DropdownMenuSeparator2, {}),
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
                  /* @__PURE__ */ jsx16(Trash2, { className: "w-4 h-4 mr-1" }),
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
import { useTranslation as useTranslation7 } from "react-i18next";
import { jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
var EmptyList = ({
  title,
  description,
  image = "/empty-list.png"
  // Asset handling in package might be tricky
}) => {
  const { t } = useTranslation7("nitxuilib");
  const defaultTitle = title || t("emptyList.noItemsFound");
  const defaultDescription = description || t("emptyList.defaultDescription");
  return /* @__PURE__ */ jsxs11("div", { className: "w-full h-full flex flex-col items-center justify-center gap-5", children: [
    /* @__PURE__ */ jsx17(
      "img",
      {
        src: "/illustrations/empty-spaces.svg",
        alt: t("emptyList.imageAlt")
      }
    ),
    /* @__PURE__ */ jsx17("p", { className: "text-lg font-semibold text-center text-neutral-900 dark:text-neutral-50", children: defaultTitle }),
    /* @__PURE__ */ jsx17("p", { className: "text-neutral-600 dark:text-neutral-400 text-sm max-w-[499px] text-center", children: defaultDescription })
  ] });
};
var EmptyList_default = EmptyList;

// src/components/ui/error-state.tsx
import { useTranslation as useTranslation8 } from "react-i18next";
import { jsx as jsx18, jsxs as jsxs12 } from "react/jsx-runtime";
var ErrorState = ({
  message,
  title,
  onRetry,
  retryLabel
}) => {
  const { t } = useTranslation8("nitxuilib");
  const resolvedTitle = title ?? t("errorState.title");
  const resolvedRetryLabel = retryLabel ?? t("buttons.tryAgain");
  return /* @__PURE__ */ jsxs12("div", { className: "w-full flex flex-col items-center justify-center gap-5 py-14 px-6", children: [
    /* @__PURE__ */ jsx18("span", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60", children: /* @__PURE__ */ jsxs12(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-7 w-7 text-muted-foreground",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          /* @__PURE__ */ jsx18("path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }),
          /* @__PURE__ */ jsx18("line", { x1: "2", y1: "2", x2: "22", y2: "22" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs12("div", { className: "flex flex-col items-center gap-1.5 text-center max-w-[260px]", children: [
      /* @__PURE__ */ jsx18("p", { className: "text-sm font-medium text-foreground/80", children: resolvedTitle }),
      /* @__PURE__ */ jsx18("p", { className: "text-xs text-muted-foreground leading-relaxed", children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsxs12(
      "button",
      {
        onClick: onRetry,
        className: cn([
          "group inline-flex items-center gap-2 rounded-lg px-4 py-2",
          "border border-border bg-background",
          "text-xs font-medium text-foreground/70",
          "transition-all duration-150 ease-out",
          "hover:bg-muted hover:text-foreground",
          "active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        ]),
        children: [
          /* @__PURE__ */ jsxs12(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx18("path", { d: "M1 4v6h6" }),
                /* @__PURE__ */ jsx18("path", { d: "M3.51 15a9 9 0 1 0 .49-3.41" })
              ]
            }
          ),
          resolvedRetryLabel
        ]
      }
    )
  ] });
};
var error_state_default = ErrorState;

// src/components/spaces/SpaceBrowser.tsx
import { jsx as jsx19, jsxs as jsxs13 } from "react/jsx-runtime";
function renderSearchBar(searchStyle, isLoading, error, onSearch, onNewSpace, t) {
  const shouldShow = isLoading || !isLoading && true;
  if (!shouldShow) return null;
  return /* @__PURE__ */ jsxs13("div", { className: cn(["flex gap-3 items-center", searchStyle]), children: [
    /* @__PURE__ */ jsx19(
      search_input_default,
      {
        onChange: (e) => onSearch(e.target.value),
        placeholder: t("browseSpacesModal.searchSpacePlaceholder"),
        disabled: isLoading || error != null
      }
    ),
    /* @__PURE__ */ jsxs13(Button, { onClick: onNewSpace, size: "lg", disabled: isLoading, className: "bg-primary text-white dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary", children: [
      /* @__PURE__ */ jsx19(SquarePlusIcon, { className: "stroke-[1.8] mr-2" }),
      t("browseSpacesModal.newSpace")
    ] })
  ] });
}
function renderSpaceListSkeleton(spacesContainerStyle, spaceCardStyle) {
  return /* @__PURE__ */ jsx19("div", { className: cn(["grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto", spacesContainerStyle]), children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx19("div", { className: cn(["cursor-pointer", spaceCardStyle]), children: /* @__PURE__ */ jsx19(SpaceCardSkeleton, {}) }, i)) });
}
function renderEmptySpaces(t) {
  return /* @__PURE__ */ jsx19("div", { className: "py-10 px-3", children: /* @__PURE__ */ jsx19(
    EmptyList_default,
    {
      title: t("browseSpacesModal.emptyTitle"),
      description: t("browseSpacesModal.emptyDescription")
    }
  ) });
}
function renderNoSearchResults(t) {
  return /* @__PURE__ */ jsx19("div", { className: "py-10 px-3", children: /* @__PURE__ */ jsx19(
    EmptyList_default,
    {
      title: t("browseSpacesModal.emptyTitle"),
      description: t("browseSpacesModal.emptyDescription")
    }
  ) });
}
function renderSpaceList(filteredSpaces, spacesContainerStyle, spaceCardStyle, onSelect) {
  return /* @__PURE__ */ jsx19("div", { className: cn(["grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto", spacesContainerStyle]), children: filteredSpaces.map((space) => /* @__PURE__ */ jsx19(
    "div",
    {
      onClick: () => onSelect(space),
      className: cn(["cursor-pointer", spaceCardStyle]),
      children: /* @__PURE__ */ jsx19(SpaceCard_default, { id: space.space_uuid, name: space.name, members: space?.total_members || 0 })
    },
    space.space_uuid
  )) });
}
var SpaceBrowser = (props) => {
  const { browserClassNames, isLoading, error, onFail } = props;
  const { className, internalContainerStyle, searchStyle, spacesContainerStyle, spaceCardStyle } = browserClassNames ?? {};
  const { t } = useTranslation9("nitxuilib");
  const { spaces, setModal, setActiveSpace } = useSpaceSelector();
  const [filteredSpaces, setFilteredSpaces] = useState6(spaces);
  useEffect4(() => {
    setFilteredSpaces(spaces);
  }, [spaces]);
  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredSpaces(spaces.filter((s) => s.name.toLowerCase().includes(lowercasedTerm)));
  };
  const handleSelectSpace = (space) => {
    setActiveSpace(space);
    setModal(null);
  };
  const renderContent = () => {
    if (error) {
      return /* @__PURE__ */ jsx19(
        error_state_default,
        {
          title: t("browseSpacesModal.errorTitle"),
          message: error,
          onRetry: onFail,
          retryLabel: t("buttons.tryAgain")
        }
      );
    }
    if (isLoading) return renderSpaceListSkeleton(spacesContainerStyle, spaceCardStyle);
    if (spaces.length === 0) return renderEmptySpaces(t);
    if (filteredSpaces.length === 0) return renderNoSearchResults(t);
    return renderSpaceList(filteredSpaces, spacesContainerStyle, spaceCardStyle, handleSelectSpace);
  };
  const showSearchBar = isLoading || !isLoading && spaces.length > 0;
  return /* @__PURE__ */ jsx19("div", { className: cn(["w-full h-full flex flex-col gap-5 relative pb-8 mt-5 overflow-hidden", className]), children: /* @__PURE__ */ jsxs13("div", { className: cn(["px-3 lg:px-7 flex flex-col gap-3 lg:gap-9", internalContainerStyle]), children: [
    showSearchBar && renderSearchBar(searchStyle, isLoading, error, handleSearch, () => setModal("newSpace"), t),
    renderContent()
  ] }) });
};
var SpaceBrowser_default = SpaceBrowser;

// src/components/space-selector/components/modals/BrowseSpaceModal.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var BrowseSpaceModal = () => {
  const { t } = useTranslation10("nitxuilib");
  const { activeModal, setModal } = useSpaceSelector();
  if (activeModal !== "browseSpace") return null;
  return /* @__PURE__ */ jsx20(
    DrawerDialog,
    {
      size: "2xl",
      open: true,
      onClose: () => setModal(null),
      title: t("browseSpacesModal.title"),
      className: "p-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900",
      children: /* @__PURE__ */ jsx20(SpaceBrowser_default, {})
    }
  );
};
var BrowseSpaceModal_default = BrowseSpaceModal;

// src/components/space-selector/components/modals/NewSpaceModal.tsx
import { useEffect as useEffect5, useState as useState7 } from "react";
import { useTranslation as useTranslation11 } from "react-i18next";

// src/components/space-selector/ui/button.tsx
import * as React12 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx21 } from "react/jsx-runtime";
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
var Button2 = React12.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot2 : "button";
    return /* @__PURE__ */ jsx21(
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

// src/components/space-selector/ui/label.tsx
import * as React13 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx22 } from "react/jsx-runtime";
var labelVariants = cva3(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label3 = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
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
import { jsx as jsx23, jsxs as jsxs14 } from "react/jsx-runtime";
var NewSpaceModal = () => {
  const { t } = useTranslation11("nitxuilib");
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
  return /* @__PURE__ */ jsx23(
    DrawerDialog,
    {
      open: isModalOpen,
      onClose: () => setModal(null),
      className: "p-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900",
      children: /* @__PURE__ */ jsxs14("div", { className: "w-full flex flex-col p-6", children: [
        /* @__PURE__ */ jsxs14("div", { className: "flex flex-col mb-4 gap-2", children: [
          /* @__PURE__ */ jsx23("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-50", children: t("newSpaceModal.title") }),
          /* @__PURE__ */ jsx23("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: t("newSpaceModal.description") })
        ] }),
        /* @__PURE__ */ jsxs14(
          "form",
          {
            className: "flex flex-col flex-1 justify-between gap-6",
            onSubmit: handleCreateSpace,
            children: [
              /* @__PURE__ */ jsx23("div", { className: "flex flex-col gap-5", children: /* @__PURE__ */ jsxs14("div", { className: "flex flex-col gap-3 mt-2", children: [
                /* @__PURE__ */ jsx23(Label3, { htmlFor: "name", children: t("newSpaceModal.typeName") }),
                /* @__PURE__ */ jsx23(
                  Input,
                  {
                    id: "name",
                    placeholder: t("newSpaceModal.spaceNamePlaceholder"),
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    className: "h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs14("div", { className: "flex justify-end gap-3", children: [
                /* @__PURE__ */ jsx23(
                  Button2,
                  {
                    type: "button",
                    onClick: () => setModal(null),
                    variant: "ghost",
                    className: "h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                    children: t("newSpaceModal.cancel")
                  }
                ),
                /* @__PURE__ */ jsx23(
                  Button2,
                  {
                    type: "submit",
                    disabled: !name || isLoading,
                    size: "smlg",
                    className: "min-w-24 h-11 text-white bg-primary dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
                    children: isLoading ? t("newSpaceModal.creating") : t("newSpaceModal.create")
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
var NewSpaceModal_default = NewSpaceModal;

// src/components/spaces/MembersAndNumbers.tsx
import { useEffect as useEffect7, useState as useState9 } from "react";
import { useTranslation as useTranslation21 } from "react-i18next";
import { HugeiconsIcon as HugeiconsIcon5 } from "@hugeicons/react";
import { Key01Icon, Tv01Icon } from "@hugeicons/core-free-icons";
import { toast as toast4 } from "sonner";

// src/components/spaces/MembersManager.tsx
import { useEffect as useEffect6, useState as useState8 } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  EyeIcon,
  PencilEdit01Icon,
  Shield01Icon,
  Tick02Icon,
  User02Icon,
  UserAdd01Icon
} from "@hugeicons/core-free-icons";
import { useTranslation as useTranslation12 } from "react-i18next";

// src/components/ui/label.tsx
import * as React15 from "react";
import * as LabelPrimitive2 from "@radix-ui/react-label";
import { cva as cva4 } from "class-variance-authority";
import { jsx as jsx24 } from "react/jsx-runtime";
var labelVariants2 = cva4(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label4 = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
  LabelPrimitive2.Root,
  {
    ref,
    className: cn(labelVariants2(), className),
    ...props
  }
));
Label4.displayName = LabelPrimitive2.Root.displayName;

// src/components/spaces/MembersManager.tsx
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

// src/components/ui/select.tsx
import * as React16 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check3, ChevronDown as ChevronDown2, ChevronUp } from "lucide-react";
import { jsx as jsx25, jsxs as jsxs15 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectTrigger = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs15(
  SelectPrimitive.Trigger,
  {
    ref,
    type: "button",
    className: cn(
      "flex h-12 w-full items-center justify-between rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx25(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx25(ChevronDown2, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx25(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx25(ChevronDown2, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React16.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx25(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs15(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-[100001] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx25(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx25(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx25(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React16.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs15(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx25("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx25(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx25(Check3, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx25(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/spaces/MembersManager.tsx
import { toast as toast3 } from "sonner";
import { jsx as jsx26, jsxs as jsxs16 } from "react/jsx-runtime";
var roleDisplay = {
  viewer: {
    triggerIcon: User02Icon,
    menuIcon: EyeIcon
  },
  editor: {
    triggerIcon: PencilEdit01Icon,
    menuIcon: PencilEdit01Icon
  },
  manager: {
    triggerIcon: Shield01Icon,
    menuIcon: Shield01Icon
  },
  owner: {
    triggerIcon: Shield01Icon,
    menuIcon: Shield01Icon
  }
};
var MembersManager = ({
  spaceId,
  api: apiProp,
  initialEmail,
  initialRole,
  onSuccess,
  onCancel
}) => {
  const { t } = useTranslation12("nitxuilib");
  const spaceSelector = useOptionalSpaceSelector();
  const api = apiProp ?? spaceSelector?.api;
  if (!spaceId || !api?.inviteMembers) return null;
  const [email, setEmail] = useState8("");
  const [pendingEmails, setPendingEmails] = useState8([]);
  const [pendingRole, setPendingRole] = useState8(
    initialRole ?? "viewer"
  );
  const [isLoading, setIsLoading] = useState8(false);
  const [isSuccess, setIsSuccess] = useState8(false);
  const selectedRole = roleDisplay[pendingRole];
  useEffect6(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      setPendingEmails([{ id: v4_default(), email: initialEmail }]);
    }
    if (initialRole) {
      setPendingRole(initialRole);
    }
  }, [initialEmail, initialRole]);
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
  const handleEmailKeyDown = (e) => {
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
      await api.inviteMembers(spaceId, emailsToSubmit, pendingRole);
      setIsSuccess(true);
      onSuccess?.();
    } catch (e2) {
      console.error("INVITATION_ERROR:", e2);
      toast3.error(t("manageMembersModal.wrong"));
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setPendingEmails([]);
    setEmail("");
    setPendingRole("viewer");
    setIsSuccess(false);
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center justify-center py-6 gap-4 text-center", children: [
      /* @__PURE__ */ jsx26("div", { className: "w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-sm animate-in zoom-in-50 duration-300", children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: Tick02Icon, className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx26("h2", { className: "text-xl font-bold text-neutral-900 dark:text-neutral-50", children: t("membersManager.successTitle") }),
      /* @__PURE__ */ jsx26("p", { className: "text-sm text-neutral-500 max-w-[250px] dark:text-neutral-400", children: t("membersManager.successDescription") }),
      /* @__PURE__ */ jsx26(
        Button,
        {
          variant: "default",
          className: "bg-primary hover:bg-primary/90 text-white min-w-[200px] mt-6 rounded-lg h-11 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
          onClick: handleReset,
          children: t("membersManager.done")
        }
      )
    ] });
  }
  const isInputValidEmail = email.trim() && emailRegex.test(email.trim());
  const isButtonDisabled = isLoading || pendingEmails.length === 0 && !isInputValidEmail;
  return /* @__PURE__ */ jsxs16("div", { className: "w-full flex flex-col", children: [
    /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center gap-3 p-6", children: [
      /* @__PURE__ */ jsx26("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-secondary dark:text-white", children: /* @__PURE__ */ jsx26(HugeiconsIcon, { icon: UserAdd01Icon, className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsx26("h2", { className: "text-2xl font-medium text-neutral-900 dark:text-neutral-50", children: t("membersManager.title") }),
      /* @__PURE__ */ jsx26("p", { className: "text-center text-sm text-neutral-600 max-w-sm leading-relaxed dark:text-neutral-400", children: t("membersManager.description") })
    ] }),
    /* @__PURE__ */ jsxs16(
      "form",
      {
        onSubmit: handleFormSubmit,
        className: "flex flex-col gap-6 p-6",
        children: [
          /* @__PURE__ */ jsxs16("div", { className: "flex flex-wrap items-center gap-2 min-h-[50px] p-2.5 border border-neutral-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-neutral-50 sticky top-0 dark:border-neutral-700 dark:bg-neutral-900", children: [
            pendingEmails.map((item) => /* @__PURE__ */ jsxs16(
              "div",
              {
                className: "bg-primary text-white text-sm pl-3 pr-1 py-1 rounded-full flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
                children: [
                  /* @__PURE__ */ jsx26("span", { children: item.email }),
                  /* @__PURE__ */ jsx26(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeEmail(item.id),
                      className: "p-1 hover:bg-white/20 rounded-full transition-colors",
                      children: /* @__PURE__ */ jsx26(X2, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              item.id
            )),
            /* @__PURE__ */ jsx26(
              "input",
              {
                value: email,
                onChange: (e) => setEmail(e.target.value),
                onKeyDown: handleEmailKeyDown,
                onBlur: handleEmailBlur,
                placeholder: pendingEmails.length === 0 ? t("membersManager.emailPlaceholder") : "",
                className: "flex-1 border-0 focus:ring-0 outline-none text-sm min-w-[150px] bg-transparent placeholder:text-neutral-400 h-8 dark:text-neutral-50 dark:placeholder:text-neutral-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx26(Label4, { className: "text-sm font-medium text-neutral-600 dark:text-neutral-300", children: t("membersManager.selectRole") }),
            /* @__PURE__ */ jsx26("div", { className: "relative", children: /* @__PURE__ */ jsxs16(
              Select,
              {
                value: pendingRole,
                onValueChange: (v) => setPendingRole(v),
                children: [
                  /* @__PURE__ */ jsx26(
                    SelectTrigger,
                    {
                      type: "button",
                      className: "w-full h-auto p-4 flex items-start text-left bg-neutral-50 border-neutral-200 rounded-xl hover:border-primary/50 hover:bg-neutral-50 data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-primary/10 transition-all [&>span]:w-full dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800",
                      children: /* @__PURE__ */ jsxs16("div", { className: "flex gap-4 items-center w-full", children: [
                        /* @__PURE__ */ jsx26("div", { className: "flex items-start justify-start", children: /* @__PURE__ */ jsx26("div", { className: "w-5 h-5 text-gray-600", children: /* @__PURE__ */ jsx26(
                          HugeiconsIcon,
                          {
                            icon: selectedRole.triggerIcon,
                            className: "w-full h-full"
                          }
                        ) }) }),
                        /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-0.5 flex-1", children: [
                          /* @__PURE__ */ jsx26("span", { className: "font-medium capitalize text-sm text-neutral-700 dark:text-neutral-200", children: t(`roles.${pendingRole}`) }),
                          /* @__PURE__ */ jsx26("span", { className: "text-xs text-neutral-500 font-medium line-clamp-1 dark:text-neutral-400", children: t(`membersManager.roles.${pendingRole}.description`) })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxs16(SelectContent, { className: "p-1 bg-neutral-50 dark:bg-neutral-900", children: [
                    /* @__PURE__ */ jsx26(
                      SelectItem,
                      {
                        value: "viewer",
                        className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15",
                        children: /* @__PURE__ */ jsxs16("div", { className: "flex gap-3 items-center", children: [
                          /* @__PURE__ */ jsx26("div", { className: "w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800", children: /* @__PURE__ */ jsx26(
                            HugeiconsIcon,
                            {
                              icon: roleDisplay.viewer.menuIcon,
                              className: "w-4 h-4 text-neutral-600 dark:text-neutral-300"
                            }
                          ) }),
                          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-0.5 text-left", children: [
                            /* @__PURE__ */ jsx26("span", { className: "font-semibold text-sm", children: t("roles.viewer") }),
                            /* @__PURE__ */ jsx26("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: t("membersManager.roles.viewer.shortDescription") })
                          ] })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsx26(
                      SelectItem,
                      {
                        value: "editor",
                        className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15",
                        children: /* @__PURE__ */ jsxs16("div", { className: "flex gap-3 items-center", children: [
                          /* @__PURE__ */ jsx26("div", { className: "w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800", children: /* @__PURE__ */ jsx26(
                            HugeiconsIcon,
                            {
                              icon: roleDisplay.editor.menuIcon,
                              className: "w-4 h-4 text-neutral-600 dark:text-neutral-300"
                            }
                          ) }),
                          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-0.5 text-left", children: [
                            /* @__PURE__ */ jsx26("span", { className: "font-semibold text-sm", children: t("roles.editor") }),
                            /* @__PURE__ */ jsx26("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: t("membersManager.roles.editor.shortDescription") })
                          ] })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsx26(
                      SelectItem,
                      {
                        value: "manager",
                        className: "rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15",
                        children: /* @__PURE__ */ jsxs16("div", { className: "flex gap-3 items-center", children: [
                          /* @__PURE__ */ jsx26("div", { className: "w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800", children: /* @__PURE__ */ jsx26(
                            HugeiconsIcon,
                            {
                              icon: roleDisplay.manager.menuIcon,
                              className: "w-4 h-4 text-neutral-600 dark:text-neutral-300"
                            }
                          ) }),
                          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-0.5 text-left", children: [
                            /* @__PURE__ */ jsx26("span", { className: "font-semibold text-sm", children: t("roles.manager") }),
                            /* @__PURE__ */ jsx26("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: t("membersManager.roles.manager.shortDescription") })
                          ] })
                        ] })
                      }
                    )
                  ] })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-3 mt-4", children: [
            /* @__PURE__ */ jsxs16(
              Button,
              {
                type: "submit",
                disabled: isButtonDisabled,
                className: "w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base rounded-xl transition-all shadow-sm shadow-primary/20 disabled:opacity-50 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
                children: [
                  isLoading ? /* @__PURE__ */ jsx26(Loader2, { className: "w-5 h-5 animate-spin mr-2" }) : null,
                  isLoading ? t("membersManager.sendingInvites") : t("membersManager.sendInvite")
                ]
              }
            ),
            onCancel && /* @__PURE__ */ jsx26(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: onCancel,
                className: "w-full h-12 text-neutral-500 font-normal hover:bg-neutral-100 hover:text-neutral-900 rounded-xl h-11 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
                children: t("membersManager.cancel")
              }
            )
          ] })
        ]
      }
    )
  ] });
};
var MembersManager_default = MembersManager;

// src/components/space-selector/components/modals/ManageMembersModal.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var ManageMembersModal = ({
  isOpen,
  onClose,
  spaceId: spaceIdProp,
  api: apiProp,
  initialEmail,
  initialRole,
  onSuccess
}) => {
  const spaceSelector = useOptionalSpaceSelector();
  const activeModal = spaceSelector?.activeModal;
  const modalProps = spaceSelector?.modalProps;
  const setModal = spaceSelector?.setModal;
  const api = apiProp ?? spaceSelector?.api;
  const effectiveOpen = isOpen || activeModal === "manageMembers";
  const spaceId = spaceIdProp ?? modalProps?.manageSpaceMembers?.spaceId;
  const editEmail = initialEmail ?? modalProps?.manageMembersProps?.initialEmail;
  const editRole = initialRole ?? modalProps?.manageMembersProps?.initialRole;
  if (!effectiveOpen) return null;
  if (!spaceId || !api?.inviteMembers) return null;
  const handleClose = onClose ?? (() => setModal?.(null));
  const handleSuccess = onSuccess ?? (() => setModal?.("membersAndNumbers"));
  return /* @__PURE__ */ jsx27(
    DrawerDialog,
    {
      open: effectiveOpen,
      onClose: handleClose,
      className: "sm:max-w-[500px] p-0 overflow-hidden z-[10011] bg-neutral-50 dark:bg-neutral-900",
      overlayClassName: "z-[10010]",
      children: /* @__PURE__ */ jsx27(
        MembersManager_default,
        {
          spaceId,
          api,
          initialEmail: editEmail,
          initialRole: editRole,
          onSuccess: handleSuccess,
          onCancel: handleClose
        }
      )
    }
  );
};
var ManageMembersModal_default = ManageMembersModal;

// src/components/spaces/MembersAndNumbersParts/CancelInvitationDialog.tsx
import { useTranslation as useTranslation14 } from "react-i18next";

// src/components/ui/dialog.tsx
import * as React18 from "react";
import { useTranslation as useTranslation13 } from "react-i18next";
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { X as X3 } from "lucide-react";
import { jsx as jsx28, jsxs as jsxs17 } from "react/jsx-runtime";
var Dialog2 = DialogPrimitive2.Root;
var DialogPortal2 = DialogPrimitive2.Portal;
var DialogOverlay2 = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  DialogPrimitive2.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-[9999] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    style: { pointerEvents: "auto" },
    ...props
  }
));
DialogOverlay2.displayName = DialogPrimitive2.Overlay.displayName;
var DialogContent2 = React18.forwardRef(({ className, children, overlayClassName, ...props }, ref) => {
  const { t } = useTranslation13("nitxuilib");
  return /* @__PURE__ */ jsxs17(DialogPortal2, { children: [
    /* @__PURE__ */ jsx28(DialogOverlay2, { className: overlayClassName }),
    /* @__PURE__ */ jsxs17(
      DialogPrimitive2.Content,
      {
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-[10000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        ),
        style: { pointerEvents: "auto" },
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs17(DialogPrimitive2.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-[10001]", children: [
            /* @__PURE__ */ jsx28(X3, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx28("span", { className: "sr-only", children: t("dialog.close") })
          ] })
        ]
      }
    )
  ] });
});
DialogContent2.displayName = DialogPrimitive2.Content.displayName;
var DialogHeader2 = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx28(
  "div",
  {
    className: cn("flex flex-col text-center sm:text-left", className),
    ...props
  }
);
DialogHeader2.displayName = "DialogHeader";
var DialogFooter2 = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx28(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter2.displayName = "DialogFooter";
var DialogTitle2 = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  DialogPrimitive2.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle2.displayName = DialogPrimitive2.Title.displayName;
var DialogDescription2 = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx28(
  DialogPrimitive2.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription2.displayName = DialogPrimitive2.Description.displayName;

// src/components/spaces/MembersAndNumbersParts/constants.ts
var getSharedTableColumns = (t) => [
  { label: t("membersAndNumbers.table.columns.person") },
  { label: t("membersAndNumbers.table.columns.roles") },
  {
    label: t("membersAndNumbers.table.columns.actions"),
    className: "text-right"
  }
];
var TABLE_CONTAINER_CLASS = "w-full bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-900 dark:border-neutral-800";
var TABLE_HEADER_CLASS = "hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-neutral-50/50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:bg-zinc-800 dark:border-neutral-800 dark:text-neutral-400";
var TABLE_ROW_CLASS = "relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-neutral-200 last:border-0 hover:bg-neutral-100 transition-colors dark:border-neutral-800 dark:hover:bg-neutral-800";
var TABLE_ROLE_CELL_CLASS = "h-8 px-2 text-sm font-normal text-neutral-700 capitalize flex items-center justify-start w-24 dark:text-neutral-200";
var MEMBER_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
var INVITATION_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
var getSectionDescription = (t) => t("membersAndNumbers.sectionDescription");
var MEMBER_ROLE_OPTIONS = [
  "viewer",
  "editor",
  "manager"
];
var getFallbackText = (value) => value.trim().slice(0, 2).toUpperCase();

// src/components/spaces/MembersAndNumbersParts/CancelInvitationDialog.tsx
import { jsx as jsx29, jsxs as jsxs18 } from "react/jsx-runtime";
var CancelInvitationDialog = ({
  invitation,
  onOpenChange,
  onConfirm
}) => {
  const { t } = useTranslation14("nitxuilib");
  if (!invitation) return null;
  return /* @__PURE__ */ jsx29(Dialog2, { open: !!invitation, onOpenChange, children: /* @__PURE__ */ jsxs18(
    DialogContent2,
    {
      overlayClassName: "z-[10010]",
      className: "sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 z-[10010] border-none shadow-none bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50",
      children: [
        /* @__PURE__ */ jsx29("div", { className: "w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 font-bold text-lg", children: getFallbackText(invitation.email) }),
        /* @__PURE__ */ jsxs18("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx29("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: t("cancelInvitationDialog.title", { email: invitation.email }) }),
          /* @__PURE__ */ jsx29("p", { className: "text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400", children: t("cancelInvitationDialog.description") })
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "flex flex-col w-full gap-2 mt-2", children: [
          /* @__PURE__ */ jsx29(
            Button,
            {
              onClick: onConfirm,
              className: "w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11",
              children: t("cancelInvitationDialog.confirm")
            }
          ),
          /* @__PURE__ */ jsx29(
            Button,
            {
              variant: "ghost",
              onClick: () => onOpenChange(false),
              className: "w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800",
              children: t("cancelInvitationDialog.cancel")
            }
          )
        ] })
      ]
    }
  ) });
};
var CancelInvitationDialog_default = CancelInvitationDialog;

// src/components/spaces/MembersAndNumbersParts/DataTableShell.tsx
import { jsx as jsx30, jsxs as jsxs19 } from "react/jsx-runtime";
var DataTableShell = ({
  columns,
  children,
  emptyState,
  hasRows = true,
  className
}) => {
  return /* @__PURE__ */ jsxs19("div", { className: cn(TABLE_CONTAINER_CLASS, className), children: [
    /* @__PURE__ */ jsx30("div", { className: TABLE_HEADER_CLASS, children: columns.map((column) => /* @__PURE__ */ jsx30("div", { className: column.className, children: column.label }, column.label)) }),
    hasRows ? children : emptyState
  ] });
};
var DataTableShell_default = DataTableShell;

// src/components/spaces/MembersAndNumbersParts/InvitationsTable.tsx
import { MoreVertical } from "lucide-react";
import { HugeiconsIcon as HugeiconsIcon2 } from "@hugeicons/react";
import {
  Cancel01Icon,
  Copy02Icon,
  Link01Icon,
  Refresh01Icon
} from "@hugeicons/core-free-icons";

// src/components/spaces/MembersAndNumbersParts/TablePagination.tsx
import { useTranslation as useTranslation15 } from "react-i18next";
import { jsx as jsx31, jsxs as jsxs20 } from "react/jsx-runtime";
var TablePagination = ({
  currentPage,
  rowsPerPage,
  totalItems,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onRowsPerPageChange
}) => {
  const { t } = useTranslation15("nitxuilib");
  if (totalItems === 0) return null;
  const safeTotalPages = totalPages || 1;
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);
  return /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between px-2 text-xs text-neutral-500 mt-2 dark:text-neutral-400", children: [
    /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx31(
        "select",
        {
          className: "border border-neutral-200 rounded p-1 bg-neutral-50 focus:outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900",
          value: rowsPerPage,
          onChange: (event) => onRowsPerPageChange(Number(event.target.value)),
          children: pageSizeOptions.map((option) => /* @__PURE__ */ jsx31("option", { value: option, children: option }, option))
        }
      ),
      /* @__PURE__ */ jsx31("span", { children: t("membersAndNumbers.table.rowsPerPage") })
    ] }),
    /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx31("span", { children: t("membersAndNumbers.table.range", {
        start: startItem,
        end: endItem,
        total: totalItems
      }) }),
      /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxs20(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-6 w-6",
            disabled: currentPage === 1,
            onClick: () => onPageChange(Math.max(1, currentPage - 1)),
            children: [
              /* @__PURE__ */ jsx31("span", { className: "sr-only", children: t("membersAndNumbers.table.previous") }),
              "\u2039"
            ]
          }
        ),
        /* @__PURE__ */ jsx31("span", { className: "text-neutral-900 font-medium dark:text-neutral-50", children: t("membersAndNumbers.table.pageCount", {
          current: currentPage,
          total: safeTotalPages
        }) }),
        /* @__PURE__ */ jsxs20(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-6 w-6",
            disabled: currentPage >= safeTotalPages,
            onClick: () => onPageChange(Math.min(safeTotalPages, currentPage + 1)),
            children: [
              /* @__PURE__ */ jsx31("span", { className: "sr-only", children: t("membersAndNumbers.table.next") }),
              "\u203A"
            ]
          }
        )
      ] })
    ] })
  ] });
};
var TablePagination_default = TablePagination;

// src/components/spaces/MembersAndNumbersParts/TablePersonCell.tsx
import { jsx as jsx32, jsxs as jsxs21 } from "react/jsx-runtime";
var TablePersonCell = ({
  title,
  subtitle,
  fallbackValue,
  avatarSrc
}) => {
  return /* @__PURE__ */ jsxs21("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxs21(Avatar, { className: "size-10 h-12 w-12 !rounded-sm", children: [
      /* @__PURE__ */ jsx32(AvatarImage, { src: avatarSrc }),
      /* @__PURE__ */ jsx32(AvatarFallback, { className: "bg-primary/10 text-primary dark:bg-secondary dark:text-white text-sm !rounded-sm font-semibold", children: getFallbackText(fallbackValue) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx32("span", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50", children: title }),
      /* @__PURE__ */ jsx32("span", { className: "text-xs text-neutral-500 dark:text-neutral-400", children: subtitle })
    ] })
  ] });
};
var TablePersonCell_default = TablePersonCell;

// src/components/spaces/MembersAndNumbersParts/InvitationsTable.tsx
import { useTranslation as useTranslation16 } from "react-i18next";
import { jsx as jsx33, jsxs as jsxs22 } from "react/jsx-runtime";
var InvitationRowActions = ({
  invite,
  onResend,
  onCopyEmail,
  onCopyInviteLink,
  onRevoke
}) => {
  const { t } = useTranslation16("nitxuilib");
  return /* @__PURE__ */ jsx33("div", { className: "absolute right-2 top-2 sm:static flex justify-end", children: /* @__PURE__ */ jsxs22(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsx33(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx33(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-800",
        children: /* @__PURE__ */ jsx33(MoreVertical, { className: "w-4 h-4 text-neutral-500 dark:text-neutral-400" })
      }
    ) }),
    /* @__PURE__ */ jsxs22(DropdownMenuContent, { align: "end", className: "w-[200px] p-2 z-[10005]", children: [
      /* @__PURE__ */ jsxs22(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5",
          onClick: () => onResend(invite.id),
          children: [
            /* @__PURE__ */ jsx33("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx33(HugeiconsIcon2, { icon: Refresh01Icon }) }),
            /* @__PURE__ */ jsx33("span", { children: t("membersAndNumbers.table.actions.resendInvitation") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs22(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5",
          onClick: () => onCopyEmail(invite.email),
          children: [
            /* @__PURE__ */ jsx33("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx33(HugeiconsIcon2, { icon: Copy02Icon }) }),
            /* @__PURE__ */ jsx33("span", { children: t("membersAndNumbers.table.actions.copyEmail") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs22(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5",
          onClick: () => onCopyInviteLink(invite),
          children: [
            /* @__PURE__ */ jsx33("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx33(HugeiconsIcon2, { icon: Link01Icon }) }),
            /* @__PURE__ */ jsx33("span", { children: t("membersAndNumbers.table.actions.copyInviteLink") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs22(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50",
          onClick: () => onRevoke(invite),
          children: [
            /* @__PURE__ */ jsx33("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx33(HugeiconsIcon2, { icon: Cancel01Icon }) }),
            /* @__PURE__ */ jsx33("span", { children: t("membersAndNumbers.table.actions.cancelInvitation") })
          ]
        }
      )
    ] })
  ] }) });
};
var InvitationsTable = ({
  items,
  totalItems,
  currentPage,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  onResend,
  onCopyEmail,
  onCopyInviteLink,
  onRevoke
}) => {
  const { t } = useTranslation16("nitxuilib");
  const columns = getSharedTableColumns(t);
  const sectionDescription = getSectionDescription(t);
  if (totalItems === 0) return null;
  return /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx33("h3", { className: "text-base font-semibold", children: t("membersAndNumbers.pendingInvitesCount", { count: totalItems }) }),
    /* @__PURE__ */ jsx33("p", { className: "text-sm text-neutral-500 -mt-3 dark:text-neutral-400", children: sectionDescription }),
    /* @__PURE__ */ jsx33(DataTableShell_default, { columns, children: items.map((invite) => /* @__PURE__ */ jsxs22("div", { className: TABLE_ROW_CLASS, children: [
      /* @__PURE__ */ jsx33(
        TablePersonCell_default,
        {
          title: t("membersAndNumbers.table.pendingMemberTitle"),
          subtitle: invite.email,
          fallbackValue: invite.email
        }
      ),
      /* @__PURE__ */ jsx33("div", { className: "ml-14 sm:ml-0", children: /* @__PURE__ */ jsx33("div", { className: TABLE_ROLE_CELL_CLASS, children: t(`roles.${invite.role}`) }) }),
      /* @__PURE__ */ jsx33(
        InvitationRowActions,
        {
          invite,
          onResend,
          onCopyEmail,
          onCopyInviteLink,
          onRevoke
        }
      )
    ] }, invite.id)) }),
    /* @__PURE__ */ jsx33(
      TablePagination_default,
      {
        currentPage,
        rowsPerPage,
        totalItems,
        totalPages,
        pageSizeOptions: INVITATION_PAGE_SIZE_OPTIONS,
        onPageChange,
        onRowsPerPageChange
      }
    )
  ] });
};
var InvitationsTable_default = InvitationsTable;

// src/components/spaces/MembersAndNumbersParts/MembersAndNumbersLayout.tsx
import { useTranslation as useTranslation17 } from "react-i18next";
import { UserPlus } from "lucide-react";
import { HugeiconsIcon as HugeiconsIcon3 } from "@hugeicons/react";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { jsx as jsx34, jsxs as jsxs23 } from "react/jsx-runtime";
var MembersAndNumbersLayout = ({
  activeTab,
  onTabChange,
  spaceName,
  membersLabel,
  settingsLabel,
  membersContent,
  settingsContent
}) => {
  const { t } = useTranslation17("nitxuilib");
  return /* @__PURE__ */ jsxs23("div", { className: "flex flex-col sm:flex-row w-full h-full min-h-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900", children: [
    /* @__PURE__ */ jsxs23("div", { className: "w-full sm:w-64 bg-neutral-50 border-b sm:border-b-0 sm:border-r border-neutral-200 p-4 flex flex-col gap-2 shrink-0 dark:bg-neutral-900 dark:border-neutral-800", children: [
      /* @__PURE__ */ jsx34("h3", { className: "text-sm font-semibold px-4 py-2 hidden sm:block truncate", children: spaceName || t("membersAndNumbers.spaceFallback") }),
      /* @__PURE__ */ jsxs23("div", { className: "flex flex-row sm:flex-col gap-2 overflow-x-auto no-scrollbar w-full", children: [
        /* @__PURE__ */ jsxs23(
          "button",
          {
            onClick: () => onTabChange("members"),
            className: cn(
              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-normal transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start",
              activeTab === "members" ? "bg-primary text-white dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            ),
            children: [
              /* @__PURE__ */ jsx34("div", { className: "w-5 h-5 flex items-center justify-center", children: /* @__PURE__ */ jsx34(UserPlus, { className: "w-4 h-4" }) }),
              membersLabel
            ]
          }
        ),
        /* @__PURE__ */ jsxs23(
          "button",
          {
            onClick: () => onTabChange("settings"),
            className: cn(
              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start",
              activeTab === "settings" ? "bg-primary text-white shadow-sm dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            ),
            children: [
              /* @__PURE__ */ jsx34("div", { className: "w-5 h-5 flex items-center justify-center", children: /* @__PURE__ */ jsx34(HugeiconsIcon3, { icon: Settings01Icon }) }),
              settingsLabel
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx34("div", { className: "flex-1 min-h-0 w-full", children: activeTab === "members" ? membersContent : settingsContent })
  ] });
};
var MembersAndNumbersLayout_default = MembersAndNumbersLayout;

// src/components/spaces/MembersAndNumbersParts/MembersLoadingState.tsx
import { jsx as jsx35, jsxs as jsxs24 } from "react/jsx-runtime";
var LoadingTableCard = ({ rowCount }) => {
  return /* @__PURE__ */ jsxs24("div", { className: "border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800", children: [
    /* @__PURE__ */ jsx35("div", { className: "bg-neutral-50/50 p-4 border-b border-neutral-200 hidden sm:block dark:bg-neutral-900/40 dark:border-neutral-800", children: /* @__PURE__ */ jsxs24("div", { className: "grid grid-cols-[1fr_200px_100px] gap-4", children: [
      /* @__PURE__ */ jsx35(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsx35(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsx35(Skeleton, { className: "h-4 w-10 ml-auto" })
    ] }) }),
    Array.from({ length: rowCount }).map((_, index) => /* @__PURE__ */ jsx35(
      "div",
      {
        className: "p-4 border-b border-neutral-200 last:border-0 relative dark:border-neutral-800",
        children: /* @__PURE__ */ jsxs24("div", { className: "flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center", children: [
          /* @__PURE__ */ jsxs24("div", { className: "flex items-center gap-3 w-full", children: [
            /* @__PURE__ */ jsx35(Skeleton, { className: "w-8 h-8 rounded-md" }),
            /* @__PURE__ */ jsxs24("div", { className: "flex flex-col gap-1 flex-1", children: [
              /* @__PURE__ */ jsx35(Skeleton, { className: "h-4 w-32" }),
              /* @__PURE__ */ jsx35(Skeleton, { className: "h-3 w-48" })
            ] })
          ] }),
          /* @__PURE__ */ jsx35(Skeleton, { className: "h-8 w-20 ml-11 sm:ml-0" }),
          /* @__PURE__ */ jsx35(Skeleton, { className: "h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" })
        ] })
      },
      index
    ))
  ] });
};
var MembersLoadingState = () => {
  return /* @__PURE__ */ jsxs24("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx35("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx35(Skeleton, { className: "h-8 w-32" }) }),
    /* @__PURE__ */ jsx35(LoadingTableCard, { rowCount: 1 }),
    /* @__PURE__ */ jsxs24("div", { className: "flex flex-col gap-4 mt-4", children: [
      /* @__PURE__ */ jsxs24("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx35(Skeleton, { className: "h-10 w-64" }),
        /* @__PURE__ */ jsx35(Skeleton, { className: "h-10 w-32" })
      ] }),
      /* @__PURE__ */ jsx35(LoadingTableCard, { rowCount: 5 })
    ] })
  ] });
};
var MembersLoadingState_default = MembersLoadingState;

// src/components/spaces/MembersAndNumbersParts/MembersTable.tsx
import { ChevronDown as ChevronDown3, Search, UserPlus as UserPlus2 } from "lucide-react";
import { MoreVertical as MoreVertical2 } from "lucide-react";
import { HugeiconsIcon as HugeiconsIcon4 } from "@hugeicons/react";
import { Copy02Icon as Copy02Icon2 } from "@hugeicons/core-free-icons";
import { useTranslation as useTranslation18 } from "react-i18next";

// src/components/ui/input.tsx
import * as React19 from "react";
import { jsx as jsx36 } from "react/jsx-runtime";
var Input2 = React19.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx36(
      "input",
      {
        type,
        className: cn(
          "flex h-12 w-full text-zinc-800 dark:text-zinc-300 rounded-[10px] border border-input bg-background px-3 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input2.displayName = "Input";

// src/components/spaces/MembersAndNumbersParts/MembersTable.tsx
import { jsx as jsx37, jsxs as jsxs25 } from "react/jsx-runtime";
var MemberRowActions = ({
  member,
  onCopyEmail,
  onRemove
}) => {
  const { t } = useTranslation18("nitxuilib");
  return /* @__PURE__ */ jsx37("div", { className: "absolute right-2 top-2 sm:static flex justify-end", children: /* @__PURE__ */ jsxs25(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsx37(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx37(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-800",
        children: /* @__PURE__ */ jsx37(MoreVertical2, { className: "w-4 h-4 text-neutral-500 dark:text-neutral-400" })
      }
    ) }),
    /* @__PURE__ */ jsxs25(DropdownMenuContent, { align: "end", className: "w-[200px] p-2 z-[10005]", children: [
      /* @__PURE__ */ jsxs25(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5",
          onClick: () => onCopyEmail(member.email),
          children: [
            /* @__PURE__ */ jsx37("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx37(HugeiconsIcon4, { icon: Copy02Icon2 }) }),
            /* @__PURE__ */ jsx37("span", { children: t("membersAndNumbers.table.actions.copyEmail") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs25(
        DropdownMenuItem,
        {
          className: "gap-2 cursor-pointer py-2.5 text-red-600 dark:text-red-500 focus:text-red-600 focus:bg-red-50",
          onClick: () => onRemove(member),
          children: [
            /* @__PURE__ */ jsx37("div", { className: "w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ jsx37(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "13",
                height: "14",
                viewBox: "0 0 13 14",
                fill: "none",
                children: /* @__PURE__ */ jsx37(
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
            /* @__PURE__ */ jsx37("span", { children: t("membersAndNumbers.table.actions.removeFromSpace") })
          ]
        }
      )
    ] })
  ] }) });
};
var MembersEmptyState = ({
  title,
  description,
  inviteLabel,
  onInvite
}) => {
  return /* @__PURE__ */ jsxs25("div", { className: "flex flex-col items-center justify-center py-10 min-h-[300px]", children: [
    /* @__PURE__ */ jsxs25("div", { className: "flex flex-col items-center gap-2 mb-4 opacity-50", children: [
      /* @__PURE__ */ jsx37("div", { className: "w-16 h-8 bg-primary/10 rounded-md mb-[-10px] z-0 mx-auto" }),
      /* @__PURE__ */ jsx37("div", { className: "w-20 h-10 bg-primary/10 rounded-md mb-[-15px] z-10 mx-auto border-2 border-white dark:border-neutral-800" }),
      /* @__PURE__ */ jsxs25("div", { className: "w-24 h-12 bg-neutral-50 border border-neutral-200 shadow-sm rounded-md z-20 flex items-center gap-2 px-2 dark:bg-neutral-900 dark:border-neutral-700", children: [
        /* @__PURE__ */ jsx37("div", { className: "w-6 h-6 bg-neutral-200 rounded-full dark:bg-neutral-700" }),
        /* @__PURE__ */ jsx37("div", { className: "h-2 w-10 bg-neutral-200 rounded-full dark:bg-neutral-700" })
      ] })
    ] }),
    /* @__PURE__ */ jsx37("h3", { className: "text-lg font-semibold mt-4", children: title }),
    /* @__PURE__ */ jsx37("p", { className: "text-sm text-neutral-500 text-center max-w-sm mt-2 dark:text-neutral-400", children: description }),
    /* @__PURE__ */ jsxs25(
      Button,
      {
        className: "mt-6 bg-primary hover:bg-primary/90 dark:hover:bg-white dark:text-primary text-white rounded-md px-8 !h-12",
        onClick: onInvite,
        children: [
          /* @__PURE__ */ jsx37(UserPlus2, { className: "w-4 h-4 mr-2" }),
          inviteLabel
        ]
      }
    )
  ] });
};
var MembersTable = ({
  items,
  memberCount,
  totalItems,
  showEmptyState,
  searchQuery,
  inviteLabel,
  emptyTitle,
  emptyDescription,
  currentPage,
  rowsPerPage,
  totalPages,
  onSearchQueryChange,
  onPageChange,
  onRowsPerPageChange,
  onOpenInviteModal,
  onRoleChange,
  onCopyEmail,
  onRemove
}) => {
  const { t } = useTranslation18("nitxuilib");
  const columns = getSharedTableColumns(t);
  const sectionDescription = getSectionDescription(t);
  if (showEmptyState) {
    return /* @__PURE__ */ jsx37(
      MembersEmptyState,
      {
        title: emptyTitle,
        description: emptyDescription,
        inviteLabel,
        onInvite: onOpenInviteModal
      }
    );
  }
  return /* @__PURE__ */ jsxs25("div", { className: "flex flex-col gap-4 mt-2", children: [
    /* @__PURE__ */ jsx37("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs25("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx37("h3", { className: "text-base font-semibold", children: t("membersAndNumbers.membersCount", { count: memberCount }) }),
      /* @__PURE__ */ jsx37("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: sectionDescription })
    ] }) }),
    /* @__PURE__ */ jsxs25("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxs25("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx37(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" }),
        /* @__PURE__ */ jsx37(
          Input2,
          {
            placeholder: t("membersAndNumbers.table.searchPlaceholder"),
            className: "pl-9 !h-12 bg-neutral-50 border-neutral-200 rounded-sm text-sm dark:bg-neutral-900 dark:border-neutral-700",
            value: searchQuery,
            onChange: (event) => onSearchQueryChange(event.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs25(
        Button,
        {
          className: "bg-primary hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary text-white px-4 rounded-sm font-normal !h-12",
          onClick: onOpenInviteModal,
          children: [
            /* @__PURE__ */ jsx37(UserPlus2, { className: "w-4 h-4 mr-2" }),
            inviteLabel
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx37(
      DataTableShell_default,
      {
        columns,
        hasRows: items.length > 0,
        emptyState: /* @__PURE__ */ jsx37("div", { className: "p-8 text-center text-neutral-500 text-sm dark:text-neutral-400", children: t("membersAndNumbers.table.noMembersFound", { query: searchQuery }) }),
        children: items.map((member) => /* @__PURE__ */ jsxs25("div", { className: TABLE_ROW_CLASS, children: [
          /* @__PURE__ */ jsx37(
            TablePersonCell_default,
            {
              title: member.name,
              subtitle: member.email,
              fallbackValue: member.name,
              avatarSrc: member.imageURL
            }
          ),
          /* @__PURE__ */ jsx37("div", { className: "ml-14 sm:ml-0", children: /* @__PURE__ */ jsxs25(DropdownMenu, { modal: false, children: [
            /* @__PURE__ */ jsx37(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs25(
              Button,
              {
                variant: "ghost",
                className: "h-8 px-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 capitalize justify-start w-24 dark:text-neutral-200 dark:hover:bg-neutral-800",
                children: [
                  t(`roles.${member.role}`),
                  /* @__PURE__ */ jsx37(ChevronDown3, { className: "w-4 h-4 ml-2" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx37(DropdownMenuContent, { className: "z-[10005]", children: MEMBER_ROLE_OPTIONS.map((role) => /* @__PURE__ */ jsx37(
              DropdownMenuItem,
              {
                onClick: () => onRoleChange(member.id, role),
                children: t(`roles.${role}`)
              },
              role
            )) })
          ] }) }),
          /* @__PURE__ */ jsx37(
            MemberRowActions,
            {
              member,
              onCopyEmail,
              onRemove
            }
          )
        ] }, member.id))
      }
    ),
    /* @__PURE__ */ jsx37(
      TablePagination_default,
      {
        currentPage,
        rowsPerPage,
        totalItems,
        totalPages,
        pageSizeOptions: MEMBER_PAGE_SIZE_OPTIONS,
        onPageChange,
        onRowsPerPageChange
      }
    )
  ] });
};
var MembersTable_default = MembersTable;

// src/components/spaces/MembersAndNumbersParts/StatsCards.tsx
import { jsx as jsx38, jsxs as jsxs26 } from "react/jsx-runtime";
var StatCard = ({ label, value, icon }) => {
  return /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm dark:bg-neutral-900/40 dark:border-neutral-800", children: [
    /* @__PURE__ */ jsxs26(Avatar, { className: "size-10 h-12 w-12 !rounded-sm", children: [
      /* @__PURE__ */ jsx38(AvatarImage, { src: "" }),
      /* @__PURE__ */ jsx38(AvatarFallback, { className: "bg-primary/10 text-primary dark:bg-secondary dark:text-white text-sm !rounded-sm font-semibold", children: icon })
    ] }),
    /* @__PURE__ */ jsxs26("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx38("span", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: value }),
      /* @__PURE__ */ jsx38("span", { className: "text-xs text-neutral-500 font-medium dark:text-neutral-400", children: label })
    ] })
  ] });
};
var StatsCards = ({ items }) => {
  return /* @__PURE__ */ jsx38("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2", children: items.map((item) => /* @__PURE__ */ jsx38(StatCard, { ...item }, item.label)) });
};
var StatsCards_default = StatsCards;

// src/components/spaces/MembersAndNumbersParts/MembersTabContent.tsx
import { Fragment, jsx as jsx39, jsxs as jsxs27 } from "react/jsx-runtime";
var MembersTabContent = ({
  title,
  stats,
  loading,
  pendingInvitesContent,
  membersContent
}) => {
  return /* @__PURE__ */ jsxs27("div", { className: "flex-1 h-full min-h-0 flex flex-col gap-6 p-4 sm:p-6 sm:pb-10 overflow-y-auto pb-20", children: [
    /* @__PURE__ */ jsx39("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx39("h2", { className: "text-xl font-semibold capitalize mt-4", children: title }) }),
    /* @__PURE__ */ jsx39(StatsCards_default, { items: stats }),
    loading ? /* @__PURE__ */ jsx39(MembersLoadingState_default, {}) : /* @__PURE__ */ jsxs27(Fragment, { children: [
      pendingInvitesContent,
      membersContent
    ] })
  ] });
};
var MembersTabContent_default = MembersTabContent;

// src/components/spaces/MembersAndNumbersParts/RemoveMemberDialog.tsx
import { useTranslation as useTranslation19 } from "react-i18next";
import { jsx as jsx40, jsxs as jsxs28 } from "react/jsx-runtime";
var RemoveMemberDialog = ({
  member,
  onOpenChange,
  onConfirm
}) => {
  const { t } = useTranslation19("nitxuilib");
  if (!member) return null;
  return /* @__PURE__ */ jsx40(Dialog2, { open: !!member, onOpenChange, children: /* @__PURE__ */ jsxs28(
    DialogContent2,
    {
      overlayClassName: "z-[10010]",
      className: "sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 z-[10010] border-none shadow-none bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50",
      children: [
        /* @__PURE__ */ jsx40("div", { className: "w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 font-bold text-lg", children: getFallbackText(member.name) }),
        /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx40("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: t("removeMemberDialog.title", { email: member.email }) }),
          /* @__PURE__ */ jsx40("p", { className: "text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400", children: t("removeMemberDialog.description") })
        ] }),
        /* @__PURE__ */ jsxs28("div", { className: "flex flex-col w-full gap-2 mt-2", children: [
          /* @__PURE__ */ jsx40(
            Button,
            {
              onClick: onConfirm,
              className: "w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11",
              children: t("removeMemberDialog.confirm")
            }
          ),
          /* @__PURE__ */ jsx40(
            Button,
            {
              variant: "ghost",
              onClick: () => onOpenChange(false),
              className: "w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800",
              children: t("removeMemberDialog.cancel")
            }
          )
        ] })
      ]
    }
  ) });
};
var RemoveMemberDialog_default = RemoveMemberDialog;

// src/components/spaces/MembersAndNumbersParts/SettingsTabContent.tsx
import { Loader2 as Loader22 } from "lucide-react";
import { useTranslation as useTranslation20 } from "react-i18next";
import { jsx as jsx41, jsxs as jsxs29 } from "react/jsx-runtime";
var SettingsTabContent = ({
  title,
  spaceName,
  isSaving,
  onSpaceNameChange,
  onSave
}) => {
  const { t } = useTranslation20("nitxuilib");
  const logoText = getFallbackText(spaceName || "SP");
  return /* @__PURE__ */ jsxs29("div", { className: "flex-1 h-full min-h-0 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto pb-20", children: [
    /* @__PURE__ */ jsx41("h2", { className: "text-xl font-semibold capitalize mt-4", children: title }),
    /* @__PURE__ */ jsxs29("div", { className: "flex flex-1 flex-col gap-4", children: [
      /* @__PURE__ */ jsxs29("div", { className: "flex flex-col sm:flex-row items-start gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsx41("div", { className: "w-[70px] h-[70px] shrink-0 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-lg font-semibold tracking-tight shadow-sm dark:bg-secondary dark:text-white", children: logoText }),
        /* @__PURE__ */ jsxs29("div", { className: "grid flex-1 items-center gap-1.5", children: [
          /* @__PURE__ */ jsx41(
            Label4,
            {
              htmlFor: "spaceName",
              className: "text-sm font-medium text-neutral-700 dark:text-neutral-200",
              children: t("renameSpaceModal.spaceNameLabel")
            }
          ),
          /* @__PURE__ */ jsx41(
            Input2,
            {
              type: "text",
              id: "spaceName",
              placeholder: t("renameSpaceModal.spaceNamePlaceholder"),
              value: spaceName,
              onChange: (event) => onSpaceNameChange(event.target.value),
              className: "bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx41("div", { className: "pt-4", children: /* @__PURE__ */ jsx41(
        Button,
        {
          onClick: onSave,
          disabled: isSaving || !spaceName.trim(),
          className: "bg-primary h-11 hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary text-white min-w-[120px]",
          children: isSaving ? /* @__PURE__ */ jsx41(Loader22, { className: "w-4 h-4 animate-spin" }) : t("renameSpaceModal.saveChanges")
        }
      ) })
    ] })
  ] });
};
var SettingsTabContent_default = SettingsTabContent;

// src/components/spaces/MembersAndNumbers.tsx
import { Fragment as Fragment2, jsx as jsx42, jsxs as jsxs30 } from "react/jsx-runtime";
var MembersAndNumbers = ({
  spaceId,
  spaceName,
  api,
  isOpen = true,
  onRefreshSpaces,
  onSpaceNameChange
}) => {
  const { t } = useTranslation21("nitxuilib");
  const [activeTab, setActiveTab] = useState9("members");
  const [licenseCount, setLicenseCount] = useState9(0);
  const [screensCount, setScreensCount] = useState9(0);
  const [members, setMembers] = useState9([]);
  const [invitations, setInvitations] = useState9([]);
  const [loading, setLoading] = useState9(false);
  const [searchQuery, setSearchQuery] = useState9("");
  const [memberToRemove, setMemberToRemove] = useState9(null);
  const [invitationToCancel, setInvitationToCancel] = useState9(
    null
  );
  const [currentPage, setCurrentPage] = useState9(1);
  const [rowsPerPage, setRowsPerPage] = useState9(5);
  const [invitesCurrentPage, setInvitesCurrentPage] = useState9(1);
  const [invitesRowsPerPage, setInvitesRowsPerPage] = useState9(5);
  const [settingsSpaceName, setSettingsSpaceName] = useState9("");
  const [savingSettings, setSavingSettings] = useState9(false);
  const [showInviteModal, setShowInviteModal] = useState9(false);
  useEffect7(() => {
    if (spaceName) {
      setSettingsSpaceName(spaceName);
    }
  }, [spaceName]);
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
        const stats2 = await api.fetchStats();
        setScreensCount(stats2.screens);
        setLicenseCount(stats2.licenses);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect7(() => {
    if (isOpen && spaceId) {
      fetchData();
    }
  }, [api, isOpen, spaceId]);
  if (!isOpen || !spaceId || !api) return null;
  const filteredMembers = members.filter(
    (member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase())
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
  const handleUpdateSpace = async () => {
    const nextSpaceName = settingsSpaceName.trim();
    if (!spaceId || !nextSpaceName || !api) return;
    setSavingSettings(true);
    try {
      await api.renameSpace(spaceId, nextSpaceName);
      await onRefreshSpaces?.();
      onSpaceNameChange?.(nextSpaceName);
      setSettingsSpaceName(nextSpaceName);
      toast4.success(t("membersAndNumbers.toasts.spaceNameUpdated"));
    } catch (error) {
      const renameErrorMessage = error?.response?.data?.errors?.name?.[0] ?? error?.response?.data?.message ?? t("membersAndNumbers.toasts.failedToUpdateSpaceName");
      toast4.error(renameErrorMessage);
    } finally {
      setSavingSettings(false);
    }
  };
  const handleRolesUpdate = async (memberId, newRole) => {
    try {
      const member = members.find((entry) => entry.id === memberId);
      if (!member) return;
      setMembers(
        (prev) => prev.map(
          (entry) => entry.id === memberId ? { ...entry, role: newRole } : entry
        )
      );
      await api.updateMemberRole(spaceId, memberId, newRole, member.email);
      toast4.success(t("manageMembersModal.role_success"));
    } catch (error) {
      toast4.error(t("manageMembersModal.error"));
      fetchData();
    }
  };
  const confirmCancelInvitation = async () => {
    if (!invitationToCancel) return;
    try {
      setInvitations(
        (prev) => prev.filter((invite) => invite.id !== invitationToCancel.id)
      );
      await api.revokeInvitation(spaceId, invitationToCancel.id);
      toast4.success(t("membersAndNumbers.toasts.invitationCancelled"));
      setInvitationToCancel(null);
    } catch (error) {
      toast4.error(t("membersAndNumbers.toasts.failedToCancelInvitation"));
      fetchData();
    }
  };
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast4.success(t("membersAndNumbers.toasts.emailCopied"));
  };
  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;
    try {
      setMembers((prev) => prev.filter((member) => member.id !== memberToRemove.id));
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
      await api.resendInvitation(spaceId, id);
      toast4.success(t("membersAndNumbers.toasts.invitationResent"));
    } catch (error) {
      toast4.error(t("membersAndNumbers.toasts.failedToResendInvitation"));
    }
  };
  const handleCopyInviteLink = async (invite) => {
    try {
      const link = await api.getInviteLink(spaceId, invite.id);
      if (!link) {
        toast4.error(t("membersAndNumbers.toasts.failedToGetInviteLink"));
        return;
      }
      await navigator.clipboard.writeText(link);
      toast4.success(t("membersAndNumbers.toasts.inviteLinkCopied"));
    } catch (error) {
      console.error(error);
      toast4.error(t("membersAndNumbers.toasts.failedToGetInviteLink"));
    }
  };
  const stats = [
    {
      label: t("membersAndNumbers.stats.totalScreens"),
      value: screensCount,
      icon: /* @__PURE__ */ jsx42(HugeiconsIcon5, { icon: Tv01Icon, className: "w-5 h-5" })
    },
    {
      label: t("membersAndNumbers.stats.totalLicenses"),
      value: licenseCount,
      icon: /* @__PURE__ */ jsx42(HugeiconsIcon5, { icon: Key01Icon, className: "w-5 h-5" })
    },
    {
      label: t("membersAndNumbers.stats.totalActiveLicenses"),
      value: null,
      icon: /* @__PURE__ */ jsx42(HugeiconsIcon5, { icon: Key01Icon, className: "w-5 h-5" })
    },
    {
      label: t("membersAndNumbers.stats.unusedLicenses"),
      value: null,
      icon: /* @__PURE__ */ jsx42(HugeiconsIcon5, { icon: Key01Icon, className: "w-5 h-5" })
    }
  ];
  const pendingInvitesContent = invitations.length > 0 ? /* @__PURE__ */ jsx42(
    InvitationsTable_default,
    {
      items: paginatedInvitations,
      totalItems: invitations.length,
      currentPage: invitesCurrentPage,
      rowsPerPage: invitesRowsPerPage,
      totalPages: totalInvitePages,
      onPageChange: setInvitesCurrentPage,
      onRowsPerPageChange: (nextRowsPerPage) => {
        setInvitesRowsPerPage(nextRowsPerPage);
        setInvitesCurrentPage(1);
      },
      onResend: handleResendInvitation,
      onCopyEmail: handleCopyEmail,
      onCopyInviteLink: handleCopyInviteLink,
      onRevoke: setInvitationToCancel
    }
  ) : null;
  const membersContent = /* @__PURE__ */ jsx42(
    MembersTable_default,
    {
      items: paginatedMembers,
      memberCount: members.length,
      totalItems: filteredMembers.length,
      showEmptyState: members.length === 0 && invitations.length === 0,
      searchQuery,
      inviteLabel: t("manageMembersModal.invite"),
      emptyTitle: t("manageMembersModal.noMembersYet"),
      emptyDescription: t("manageMembersModal.inviteTeammatesDescription"),
      currentPage,
      rowsPerPage,
      totalPages,
      onSearchQueryChange: setSearchQuery,
      onPageChange: setCurrentPage,
      onRowsPerPageChange: (nextRowsPerPage) => {
        setRowsPerPage(nextRowsPerPage);
        setCurrentPage(1);
      },
      onOpenInviteModal: () => setShowInviteModal(true),
      onRoleChange: handleRolesUpdate,
      onCopyEmail: handleCopyEmail,
      onRemove: setMemberToRemove
    }
  );
  return /* @__PURE__ */ jsxs30(Fragment2, { children: [
    /* @__PURE__ */ jsx42("div", { className: "h-full min-h-0 overflow-hidden", children: /* @__PURE__ */ jsx42(
      MembersAndNumbersLayout_default,
      {
        activeTab,
        onTabChange: setActiveTab,
        spaceName,
        membersLabel: t("manageMembersModal.title"),
        settingsLabel: t("manageMembersModal.settings"),
        membersContent: /* @__PURE__ */ jsx42(
          MembersTabContent_default,
          {
            title: t("manageMembersModal.title"),
            stats,
            loading,
            pendingInvitesContent,
            membersContent
          }
        ),
        settingsContent: /* @__PURE__ */ jsx42(
          SettingsTabContent_default,
          {
            title: t("manageMembersModal.settings"),
            spaceName: settingsSpaceName,
            isSaving: savingSettings,
            onSpaceNameChange: setSettingsSpaceName,
            onSave: handleUpdateSpace
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx42(
      RemoveMemberDialog_default,
      {
        member: memberToRemove,
        onOpenChange: (open) => {
          if (!open) {
            setMemberToRemove(null);
          }
        },
        onConfirm: confirmRemoveMember
      }
    ),
    /* @__PURE__ */ jsx42(
      CancelInvitationDialog_default,
      {
        invitation: invitationToCancel,
        onOpenChange: (open) => {
          if (!open) {
            setInvitationToCancel(null);
          }
        },
        onConfirm: confirmCancelInvitation
      }
    ),
    /* @__PURE__ */ jsx42(
      ManageMembersModal_default,
      {
        isOpen: showInviteModal,
        onClose: () => setShowInviteModal(false),
        spaceId,
        api,
        onSuccess: fetchData
      }
    )
  ] });
};
var MembersAndNumbers_default = MembersAndNumbers;

// src/components/space-selector/components/modals/MembersAndNumbersModal.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var MembersAndNumbersModal = () => {
  const {
    activeModal: modal,
    modalProps: props,
    setModal,
    setModalProps: setProps,
    refreshSpaces,
    api
  } = useSpaceSelector();
  const spaceId = props?.manageSpaceMembers?.spaceId;
  if (modal !== "membersAndNumbers" || !spaceId) return null;
  return /* @__PURE__ */ jsx43(
    DrawerDialog,
    {
      size: "2xl",
      className: "p-0 overflow-hidden sm:max-w-7xl h-[80vh] sm:max-h-[800px] flex flex-col",
      bodyClassName: "min-h-0 overflow-hidden",
      open: modal === "membersAndNumbers",
      onClose: () => setModal(null),
      children: /* @__PURE__ */ jsx43(
        MembersAndNumbers_default,
        {
          spaceId,
          spaceName: props?.manageSpaceMembers?.spaceName,
          api,
          isOpen: modal === "membersAndNumbers",
          onRefreshSpaces: refreshSpaces,
          onSpaceNameChange: (nextSpaceName) => {
            setProps((currentProps) => {
              if (!currentProps?.manageSpaceMembers) return currentProps;
              return {
                ...currentProps,
                manageSpaceMembers: {
                  ...currentProps.manageSpaceMembers,
                  spaceName: nextSpaceName
                }
              };
            });
          }
        }
      )
    }
  );
};
var MembersAndNumbersModal_default = MembersAndNumbersModal;

// src/components/space-selector/components/modals/DeleteConfirmationModal.tsx
import { Loader2 as Loader23, Trash2 as Trash22 } from "lucide-react";
import { useTranslation as useTranslation22 } from "react-i18next";
import React20 from "react";
import { jsx as jsx44, jsxs as jsxs31 } from "react/jsx-runtime";
var DeleteConfirmationModal = () => {
  const { t } = useTranslation22("nitxuilib");
  const { activeModal, modalProps, setModal } = useSpaceSelector();
  const [isLoading, setIsLoading] = React20.useState(false);
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
  return /* @__PURE__ */ jsx44(Dialog, { open: true, onOpenChange: (open) => !open && setModal(null), children: /* @__PURE__ */ jsxs31(
    DialogContent,
    {
      overlayClassName: "z-[10010]",
      className: "sm:max-w-[400px] border-none shadow-none p-6 flex flex-col items-center text-center gap-4 text-neutral-900 bg-neutral-50 z-[10010] dark:text-neutral-50 dark:bg-neutral-900",
      children: [
        /* @__PURE__ */ jsx44("div", { className: "w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 dark:bg-red-500/10", children: /* @__PURE__ */ jsx44(Trash22, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs31("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx44("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50", children: title || t("deleteConfirmation") }),
          /* @__PURE__ */ jsx44("p", { className: "text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400", children: description })
        ] }),
        /* @__PURE__ */ jsxs31("div", { className: "flex flex-col w-full gap-2 mt-2", children: [
          /* @__PURE__ */ jsx44(
            Button2,
            {
              onClick: handleConfirm,
              className: "w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11",
              disabled: isLoading,
              children: isLoading ? /* @__PURE__ */ jsx44(Loader23, { className: "w-4 h-4 animate-spin" }) : t("remove")
            }
          ),
          /* @__PURE__ */ jsx44(
            Button2,
            {
              variant: "ghost",
              onClick: () => setModal(null),
              className: "w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800",
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

// src/components/space-selector/components/modals/RenameSpaceModal.tsx
import { useEffect as useEffect8, useMemo, useState as useState10 } from "react";
import { Check as Check4, Loader2 as Loader24, RefreshCw, TriangleAlert } from "lucide-react";
import { useTranslation as useTranslation23 } from "react-i18next";
import { Fragment as Fragment3, jsx as jsx45, jsxs as jsxs32 } from "react/jsx-runtime";
var getFallbackText2 = (value) => value.trim().slice(0, 2).toUpperCase();
var RenameSpaceFormState = ({
  t,
  spaceName,
  logoName,
  isSaving,
  onSpaceNameChange,
  onSubmit,
  onCancel
}) => {
  const logoText = getFallbackText2(logoName || "SP");
  return /* @__PURE__ */ jsxs32("div", { className: "flex w-full flex-col gap-6 p-6", children: [
    /* @__PURE__ */ jsxs32("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx45("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-50", children: t("renameSpaceModal.title") }),
      /* @__PURE__ */ jsx45("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: t("renameSpaceModal.description") })
    ] }),
    /* @__PURE__ */ jsx45("div", { className: "flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-100/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/40", children: /* @__PURE__ */ jsxs32("div", { className: "flex flex-col items-start gap-3 sm:flex-row sm:gap-4", children: [
      /* @__PURE__ */ jsx45("div", { className: "flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-lg font-semibold tracking-tight text-white shadow-sm dark:bg-secondary dark:text-white", children: logoText || "SP" }),
      /* @__PURE__ */ jsxs32("div", { className: "grid flex-1 items-center gap-1.5", children: [
        /* @__PURE__ */ jsx45(
          Label3,
          {
            htmlFor: "rename-space-name",
            className: "text-sm font-medium text-neutral-700 dark:text-neutral-200",
            children: t("renameSpaceModal.spaceNameLabel")
          }
        ),
        /* @__PURE__ */ jsx45(
          Input,
          {
            id: "rename-space-name",
            type: "text",
            placeholder: t("renameSpaceModal.spaceNamePlaceholder"),
            value: spaceName,
            onChange: (event) => onSpaceNameChange(event.target.value),
            className: "h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs32("div", { className: "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ jsx45(
        Button2,
        {
          type: "button",
          variant: "ghost",
          onClick: onCancel,
          disabled: isSaving,
          className: "h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
          children: t("renameSpaceModal.cancel")
        }
      ),
      /* @__PURE__ */ jsx45(
        Button2,
        {
          type: "button",
          onClick: onSubmit,
          disabled: isSaving || !spaceName.trim(),
          className: "h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
          children: isSaving ? /* @__PURE__ */ jsx45(Loader24, { className: "h-4 w-4 animate-spin" }) : t("renameSpaceModal.saveChanges")
        }
      )
    ] })
  ] });
};
var RenameSpaceSuccessState = ({
  t,
  spaceName,
  onDone
}) => {
  return /* @__PURE__ */ jsxs32("div", { className: "flex w-full flex-col items-center gap-4 p-6 text-center", children: [
    /* @__PURE__ */ jsx45("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", children: /* @__PURE__ */ jsx45(Check4, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsxs32("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx45("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-50", children: t("renameSpaceModal.successTitle") }),
      /* @__PURE__ */ jsx45("p", { className: "max-w-sm text-sm text-neutral-500 dark:text-neutral-400", children: t("renameSpaceModal.successDescription", { name: spaceName }) })
    ] }),
    /* @__PURE__ */ jsx45(
      Button2,
      {
        type: "button",
        onClick: onDone,
        className: "mt-3 h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
        children: t("renameSpaceModal.done")
      }
    )
  ] });
};
var RenameSpaceErrorState = ({
  t,
  attemptedName,
  errorMessage,
  isSaving,
  onRetry,
  onBack
}) => {
  return /* @__PURE__ */ jsxs32("div", { className: "flex w-full flex-col items-center gap-4 p-6 text-center", children: [
    /* @__PURE__ */ jsx45("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400", children: /* @__PURE__ */ jsx45(TriangleAlert, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsxs32("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx45("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-50", children: t("renameSpaceModal.errorTitle") }),
      /* @__PURE__ */ jsx45("p", { className: "max-w-sm text-sm text-neutral-500 dark:text-neutral-400", children: t("renameSpaceModal.errorDescription", {
        name: attemptedName || t("renameSpaceModal.thisSpace")
      }) })
    ] }),
    /* @__PURE__ */ jsx45("div", { className: "w-full rounded-2xl border border-red-100 bg-red-50/80 p-4 text-left dark:border-red-500/20 dark:bg-red-500/10", children: /* @__PURE__ */ jsx45("p", { className: "text-sm font-medium text-red-700 dark:text-red-300", children: errorMessage }) }),
    /* @__PURE__ */ jsxs32("div", { className: "flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center", children: [
      /* @__PURE__ */ jsx45(
        Button2,
        {
          type: "button",
          variant: "ghost",
          onClick: onBack,
          disabled: isSaving,
          className: "h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
          children: t("renameSpaceModal.backToEdit")
        }
      ),
      /* @__PURE__ */ jsx45(
        Button2,
        {
          type: "button",
          onClick: onRetry,
          disabled: isSaving,
          className: "h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary",
          children: isSaving ? /* @__PURE__ */ jsx45(Loader24, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs32(Fragment3, { children: [
            /* @__PURE__ */ jsx45(RefreshCw, { className: "mr-2 h-4 w-4" }),
            t("renameSpaceModal.retry")
          ] })
        }
      )
    ] })
  ] });
};
var RenameSpaceModal = () => {
  const { t } = useTranslation23("nitxuilib");
  const {
    activeModal,
    modalProps,
    setModal,
    api,
    activeSpace,
    setActiveSpace,
    refreshSpaces
  } = useSpaceSelector();
  const renameProps = modalProps?.renameSpaceModalProps;
  const isOpen = activeModal === "renameSpace" && !!renameProps?.spaceId;
  const initialName = renameProps?.initialName ?? "";
  const [draftName, setDraftName] = useState10(initialName);
  const [lastAttemptedName, setLastAttemptedName] = useState10(initialName);
  const [view, setView] = useState10("form");
  const [isSaving, setIsSaving] = useState10(false);
  const [errorMessage, setErrorMessage] = useState10("");
  useEffect8(() => {
    if (!isOpen) {
      setDraftName("");
      setLastAttemptedName("");
      setView("form");
      setIsSaving(false);
      setErrorMessage("");
      return;
    }
    setDraftName(initialName);
    setLastAttemptedName(initialName);
    setView("form");
    setIsSaving(false);
    setErrorMessage("");
  }, [initialName, isOpen]);
  const logoName = useMemo(() => draftName.trim() || initialName || "Space", [
    draftName,
    initialName
  ]);
  if (!isOpen) return null;
  const closeModal = () => setModal(null);
  const submitRename = async (nameToSubmit) => {
    if (!renameProps?.spaceId || !nameToSubmit.trim() || !api?.renameSpace) return;
    const nextName = nameToSubmit.trim();
    setIsSaving(true);
    setLastAttemptedName(nextName);
    try {
      await api.renameSpace(renameProps.spaceId, nextName);
      await refreshSpaces?.();
      if (activeSpace && (activeSpace.space_uuid === renameProps.spaceId || activeSpace.proxyId === renameProps.spaceId || activeSpace.uuid === renameProps.spaceId)) {
        setActiveSpace({
          ...activeSpace,
          name: nextName
        });
      }
      setDraftName(nextName);
      setView("success");
      setErrorMessage("");
    } catch (error) {
      const nextErrorMessage = error?.response?.data?.errors?.name?.[0] ?? error?.response?.data?.message ?? t("renameSpaceModal.defaultError");
      setErrorMessage(nextErrorMessage);
      setView("error");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsx45(
    DrawerDialog,
    {
      open: isOpen,
      onClose: closeModal,
      className: "overflow-hidden border-none bg-neutral-50 p-0 shadow-none dark:bg-neutral-900",
      children: /* @__PURE__ */ jsx45("div", { className: "w-full", children: view === "form" ? /* @__PURE__ */ jsx45(
        RenameSpaceFormState,
        {
          t,
          spaceName: draftName,
          logoName,
          isSaving,
          onSpaceNameChange: setDraftName,
          onSubmit: () => submitRename(draftName),
          onCancel: closeModal
        }
      ) : view === "success" ? /* @__PURE__ */ jsx45(
        RenameSpaceSuccessState,
        {
          t,
          spaceName: lastAttemptedName,
          onDone: closeModal
        }
      ) : /* @__PURE__ */ jsx45(
        RenameSpaceErrorState,
        {
          t,
          attemptedName: lastAttemptedName,
          errorMessage,
          isSaving,
          onRetry: () => submitRename(lastAttemptedName),
          onBack: () => setView("form")
        }
      ) })
    }
  );
};
var RenameSpaceModal_default = RenameSpaceModal;

// src/components/space-selector/components/SpaceSelectorContent.tsx
import { useMemo as useMemo2, useState as useState11 } from "react";
import {
  Building2,
  CheckCircle,
  ChevronDown as ChevronDown4,
  SquareArrowOutUpRight,
  SquarePlus,
  Users2 as Users22
} from "lucide-react";

// src/components/space-selector/ui/skeleton.tsx
import { jsx as jsx46 } from "react/jsx-runtime";
function Skeleton2({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx46(
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

// src/components/space-selector/components/SpaceSelectorContent.tsx
import { useTranslation as useTranslation24 } from "react-i18next";
import { Fragment as Fragment4, jsx as jsx47, jsxs as jsxs33 } from "react/jsx-runtime";
var SpaceSelectorContent = () => {
  const { t } = useTranslation24("nitxuilib");
  const {
    spaces,
    activeSpace,
    setActiveSpace,
    isExpanded,
    setModal,
    setModalProps
  } = useSpaceSelector();
  const [showOptions, setShowOptions] = useState11(false);
  const isRTL = typeof document !== "undefined" && document.dir === "rtl";
  const sortedSpaces = useMemo2(() => {
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
  return /* @__PURE__ */ jsx47(Fragment4, { children: /* @__PURE__ */ jsx47("div", { className: "relative w-full", children: /* @__PURE__ */ jsxs33(DropdownMenu2, { onOpenChange: setShowOptions, children: [
    /* @__PURE__ */ jsx47(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx47(
      "div",
      {
        className: cn2(
          "w-full h-auto bg-accent px-5 py-2 rounded-lg flex items-center cursor-pointer transition-all duration-300 border border-transparent hover:border-primary",
          !isExpanded && "items-center justify-center w-[40px] h-[40px] mx-auto",
          showOptions && "border-primary"
        ),
        children: isExpanded ? /* @__PURE__ */ jsxs33(Fragment4, { children: [
          /* @__PURE__ */ jsxs33("div", { className: "w-full flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx47("span", { className: "text-xs", children: t("sidebar.Space") }),
            /* @__PURE__ */ jsxs33("div", { className: "text-sm xl:text-base w-full max-w-40 capitalize truncate", children: [
              /* @__PURE__ */ jsx47("p", { children: activeSpace?.name }),
              !activeSpace?.name && /* @__PURE__ */ jsx47(Skeleton2, { className: "h-4 w-3/4 bg-gray-300/80" })
            ] })
          ] }),
          /* @__PURE__ */ jsx47(
            ChevronDown4,
            {
              className: cn2(
                "w-4 h-4 xl:w-5 xl:h-5 transition ease-linear duration-300",
                showOptions && "-scale-y-100"
              )
            }
          )
        ] }) : /* @__PURE__ */ jsx47("div", { children: /* @__PURE__ */ jsx47(Building2, { className: "w-5 h-5" }) })
      }
    ) }),
    /* @__PURE__ */ jsxs33(DropdownMenuContent2, { className: "w-full min-w-[260px] bg-white rounded-lg p-1 border flex-col gap-1 text-sm shadow-lg z-[100]", children: [
      /* @__PURE__ */ jsx47(
        "p",
        {
          className: `text-[11px] text-zinc-600 uppercase p-3 ${isRTL ? "!text-right" : "!text-left"}`,
          children: t("sidebar.Recently Spaces")
        }
      ),
      sortedSpaces.slice(0, 3).map((option, key) => /* @__PURE__ */ jsxs33(
        DropdownMenuItem2,
        {
          onClick: () => handleChange(option),
          className: "w-full flex text-sm capitalize justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
          children: [
            /* @__PURE__ */ jsx47(Building2, { className: "w-4 h-4 stroke-[1.5]" }),
            /* @__PURE__ */ jsx47("p", { className: "max-w-[8rem] truncate", children: option.name }),
            /* @__PURE__ */ jsx47(
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
      /* @__PURE__ */ jsx47(DropdownMenuSeparator2, {}),
      /* @__PURE__ */ jsxs33("div", { className: "w-full flex flex-col", children: [
        /* @__PURE__ */ jsx47(
          DropdownMenuItem2,
          {
            onClick: () => setModal("browseSpace"),
            className: "w-full p-2 transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
            children: /* @__PURE__ */ jsxs33("div", { className: "w-full flex gap-3 justify-start items-center", children: [
              /* @__PURE__ */ jsx47(SquareArrowOutUpRight, { className: "w-4 h-4 stroke-[1.5]" }),
              t("sidebar.Browse More")
            ] })
          }
        ),
        /* @__PURE__ */ jsxs33(
          DropdownMenuItem2,
          {
            onClick: () => setModal("newSpace"),
            className: "w-full flex justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx47(SquarePlus, { className: "w-4 h-4 stroke-[1.5]" }),
              t("sidebar.New Space")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx47(DropdownMenuSeparator2, {}),
      /* @__PURE__ */ jsxs33(
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
            /* @__PURE__ */ jsx47(Users22, { className: "w-4 h-4 stroke-[1.5]" }),
            t("sidebar.Manage Members")
          ]
        }
      )
    ] })
  ] }) }) });
};

// src/components/space-selector/SpaceSelector.tsx
import { jsx as jsx48, jsxs as jsxs34 } from "react/jsx-runtime";
var SpaceSelector = (props) => {
  return /* @__PURE__ */ jsxs34(SpaceSelectorProvider, { ...props, children: [
    props?.showtype == "Browser" ? /* @__PURE__ */ jsx48(SpaceBrowser_default, { browserClassNames: props?.browserClassNames, isLoading: props?.isLoading ?? false, error: props.error, onFail: props.onFail }) : /* @__PURE__ */ jsx48(SpaceSelectorContent, {}),
    /* @__PURE__ */ jsx48(BrowseSpaceModal_default, {}),
    /* @__PURE__ */ jsx48(NewSpaceModal_default, {}),
    /* @__PURE__ */ jsx48(RenameSpaceModal_default, {}),
    /* @__PURE__ */ jsx48(MembersAndNumbersModal_default, {}),
    /* @__PURE__ */ jsx48(ManageMembersModal_default, {}),
    /* @__PURE__ */ jsx48(DeleteConfirmationModal_default, {})
  ] });
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
  error_state_default as ErrorState,
  MembersAndNumbers_default as MembersAndNumbers,
  MembersManager_default as MembersManager,
  ProductSwitcher,
  SpaceBrowser_default as SpaceBrowser,
  SpaceSelector,
  SpaceSelectorProvider,
  UserAccount,
  createSpaceSelectorApi,
  useOptionalSpaceSelector,
  useSpaceSelector
};
