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
// import nexusLogo from "../../assets/nexus-logo.svg";

// Profile icon (replace with your own if needed)
const profileIcon =
  "https://ui-avatars.com/api/?name=SALT&background=000&color=fff&rounded=true";

export const ProductSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const profile = {
    name: "Manage My Account",
    icon: profileIcon,
    url: process.env.NEXT_PUBLIC_MY_NITX_URL || "#",
  };

  const mediaOwner = [
    {
      title: "Nitx Signage",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/signage-icon.svg",
      url: process.env.NEXT_PUBLIC_NITX_SIGNAGE_URL || "#",
    },
    {
      title: "Nitx Publisher",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/publisher-logo.svg",
      url: process.env.NEXT_PUBLIC_NITX_PUBLISHER_URL || "#",
    },
    // {
    //   title: "Nitx Nexus",
    //   image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/nexus-logo.svg",
    //   url: process.env.NEXT_PUBLIC_NEXUS_URL || "#",
    // },
  ];

  const advertiser = [
    {
      title: "Nitx Ads",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/ads-logo.svg",
      url: process.env.NEXT_PUBLIC_NITX_ADS_URL || "#",
    },
    {
      title: "Nitx Studio",
      image: "https://nitx-icons.s3.eu-west-1.amazonaws.com/studio-logo.svg",
      url: process.env.NEXT_PUBLIC_NITX_STUDIO_URL || "#",
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
          className="flex items-center w-full p-3 rounded-xl border mb-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-black transition"
        >
          <img
            src={profile.icon}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="flex-1 text-left font-medium">{profile.name}</span>
          <ChevronRight className="size-4" />
        </a>

        {/* Media Owner Section */}
        <div className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-400">
          Media Owner
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {mediaOwner.map((product) => (
            <ProductIcon key={product.title} {...product} />
          ))}
        </div>

        {/* Advertiser Section */}
        <div className="mb-2 mt-10 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          Advertiser
        </div>
        <div className="grid grid-cols-2 gap-3">
          {advertiser.map((product) => (
            <ProductIcon key={product.title} {...product} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
