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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const profile = {
    name: "Manage My Account",
    icon: profileIcon,
    url: `${process.env.NEXT_PUBLIC_MY_NITX_URL}/${auth_user}` || "#",
  };

  // const mediaOwner = [
  //   {
  //     title: "Nitx Signage",
  //     image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/signage-icon.svg",
  //     url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#",
  //   },
  //   {
  //     title: "Nitx Publisher",
  //     image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/publisher-logo.svg",
  //     url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#",
  //   },
  //   // {
  //   //   title: "Nitx Nexus",
  //   //   image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/nexus-logo.svg",
  //   //   url: `${process.env.NEXT_PUBLIC_NEXUS_URL}/${auth_user}` || "#",
  //   // },
  // ];

  // const advertiser = [
  //   {
  //     title: "Nitx Ads",
  //     image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/ads-logo.svg",
  //     url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#",
  //   },
  //   {
  //     title: "Nitx Studio",
  //     image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/studio-logo.svg",
  //     url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#",
  //   },
  // ];

  const products = [
    {
      title: "Nitx Signage",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/signage-icon.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL}/${auth_user}` || "#",
    },
    {
      title: "Nitx Publisher",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/publisher-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL}/${auth_user}` || "#",
    },
    {
      title: "Nitx Ads",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/ads-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_ADS_URL}/${auth_user}` || "#",
    },
    {
      title: "Nitx Studio",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/studio-logo.svg",
      url: `${process.env.NEXT_PUBLIC_NITX_STUDIO_URL}/${auth_user}` || "#",
    },
    {
      title: "Nitx Reach",
      image:
        "https://res.cloudinary.com/dj3rzny5p/image/upload/v1765777010/Nitx_Reach_Group_1_h6bsbj.svg",
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
              {`${(profileName || "User")
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0].toUpperCase())
                .join("")}`}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 text-left font-medium">{profile.name}</span>
          <ChevronRight className="size-4" />
        </a>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {products.map((product) => (
            <ProductIcon key={product.title} {...product} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
