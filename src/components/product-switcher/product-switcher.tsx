"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronRight, Grip } from "lucide-react";
import ProductIcon from "./product-icon";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import nexusLogo from "../../assets/nexus-logo.svg";

// Profile icon (replace with your own if needed)
const profileIcon =
  "https://ui-avatars.com/api/?name=SALT&background=000&color=fff&rounded=true";

interface ProductSwitcherProps {
  auth_user: number | string;
  profileImage?: string;
  profileName?: string;
}

export const ProductSwitcher = ({
  auth_user,
  profileImage,
  profileName,
}: ProductSwitcherProps) => {
  const { t } = useTranslation("nitxuilib");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const profile = {
    name: t("productSwitcher.manageMyAccount"),
    icon: profileIcon,
    url: `${process.env.NEXT_PUBLIC_MY_NITX_URL}/${auth_user}` || "#",
  };

  const products = [
    {
      id: "nitx-signage",
      title: "Nitx Signage",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/signage-icon.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/signage-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#",
    },
    {
      id: "nitx-publisher",
      title: "Nitx Publisher",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/publisher-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/publisher-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#",
    },
    {
      id: "nitx-ads",
      title: "Nitx Ads",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/ads-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/ads-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#",
    },
    {
      id: "nitx-studio",
      title: "Nitx Studio",
      image: "https://cdn-new.nitx.app/nitx-assets/ProductLight/studio-logo.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/studio-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#",
    },
    {
      id: "nitx-reach",
      title: "Nitx Reach",
      image: "https://res.cloudinary.com/dj3rzny5p/image/upload/v1765777010/Nitx_Reach_Group_1_h6bsbj.svg",
      dark_image: "https://cdn-new.nitx.app/nitx-assets/productsIconDark/reach-dark.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_REACH_URL}/${auth_user}` || "#",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="shadow-none">
          <Grip className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4 rounded-2xl">
        {/* Profile Section */}
        <a
          id="manage-my-account"
          data-testid="product-manage-my-account"
          href={profile.url}
          target="_blank"
          className="flex items-center w-full p-3 gap-2 rounded-xl border dark:border-zinc-700/50 mb-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:hover:text-white transition"
        >
          <Avatar className="rounded-[6px] size-8">
            <AvatarImage
              className="rounded-[6px] size-8 overflow-clip"
              src={`${profileImage}`}
            />
            <AvatarFallback className="rounded-none bg-primary text-white ">
              {`${(profileName || t("productSwitcher.userFallback"))
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0].toUpperCase())
                .join("")}`}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 text-start font-medium">{profile.name}</span>
          <ChevronRight className="size-4 rtl:rotate-180" />
        </a>

        <div className="grid grid-cols-2 gap-3 mb-4 ltr" dir="ltr">
          {products.map((product) => (
            <ProductIcon key={product.id} {...product} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
