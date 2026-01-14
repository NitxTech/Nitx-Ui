"use client";

import { cn } from "../lib/utils";
import { Card } from "../ui/card";
import { MoreHorizontal, Pen, Trash2, Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { useSpaceSelector } from "../context";

interface SpaceCardProps {
  id: string;
  name: string;
  members: number;
  className?: string;
}

const SpaceCard = ({ id, name, members, className }: SpaceCardProps) => {
  const { t } = useTranslation("components");
  const [isLoading, setIsLoading] = useState(false);
  // Use package context instead of global hooks
  const {
    setModal,
    setModalProps: setProps,
    api,
    refreshSpaces,
  } = useSpaceSelector();

  const handleDeleteSpace = async () => {
    if (!api?.deleteSpace) return;
    setIsLoading(true);
    try {
      await api.deleteSpace(id);
      toast.success(t("spaceCard.spaceDeletedSuccessfully", { name }));
      // Use refreshSpaces instead of removeSpace in package context
      refreshSpaces();
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error(t("spaceCard.errorDeletingSpace"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "shadow-none bg-white border-[.5px] p-3 w-full lg:w-auto min-w-72 flex gap-4",
        className
      )}
    >
      <div className="w-full flex-1 flex gap-4 items-center">
        <div>
          <div className="w-10 h-10 lg:w-[50px] lg:h-[50px] bg-[#007AFF1A] rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
            >
              <rect
                width="55"
                height="55"
                rx="13"
                fill="#007AFF"
                fillOpacity="0.1"
              />
              <path
                d="M32.6371 26.7579L32.7808 26.279L32.7808 26.279L32.6371 26.7579ZM23.3335 24.7502C23.0574 24.7502 22.8335 24.974 22.8335 25.2502C22.8335 25.5263 23.0574 25.7502 23.3335 25.7502V24.7502ZM26.0835 25.7502C26.3596 25.7502 26.5835 25.5263 26.5835 25.2502C26.5835 24.974 26.3596 24.7502 26.0835 24.7502V25.7502ZM23.3335 28.4168C23.0574 28.4168 22.8335 28.6407 22.8335 28.9168C22.8335 29.193 23.0574 29.4168 23.3335 29.4168V28.4168ZM26.0835 29.4168C26.3596 29.4168 26.5835 29.193 26.5835 28.9168C26.5835 28.6407 26.3596 28.4168 26.0835 28.4168V29.4168ZM22.6853 32.852L22.3318 32.4984L22.3318 32.4984L22.6853 32.852ZM17.8335 36.6668C17.5574 36.6668 17.3335 36.8907 17.3335 37.1668C17.3335 37.443 17.5574 37.6668 17.8335 37.6668V36.6668ZM36.1668 37.6668C36.443 37.6668 36.6668 37.443 36.6668 37.1668C36.6668 36.8907 36.443 36.6668 36.1668 36.6668V37.6668ZM18.2502 37.1668C18.2502 37.443 18.474 37.6668 18.7502 37.6668C19.0263 37.6668 19.2502 37.443 19.2502 37.1668H18.2502ZM19.4754 19.1344L19.1661 18.7415L19.1661 18.7415L19.4754 19.1344ZM23.4046 19.4934L23.2652 19.9736L23.2652 19.9736L23.4046 19.4934ZM27.9879 20.8238L28.1273 20.3436L28.1273 20.3436L27.9879 20.8238ZM30.294 21.8948L29.8904 22.1899L29.8904 22.19L30.294 21.8948ZM30.1668 37.1668C30.1668 37.443 30.3907 37.6668 30.6668 37.6668C30.943 37.6668 31.1668 37.443 31.1668 37.1668H30.1668ZM30.6668 26.1668L30.5232 26.6457L32.4934 27.2368L32.6371 26.7579L32.7808 26.279L30.8105 25.6879L30.6668 26.1668ZM32.6371 26.7579L32.4934 27.2368C33.1341 27.429 33.5733 27.5616 33.9005 27.7028C34.2156 27.8387 34.3769 27.9626 34.4866 28.11L34.8877 27.8115L35.2889 27.513C35.036 27.1733 34.7015 26.9592 34.2966 26.7846C33.9037 26.6151 33.3989 26.4644 32.7808 26.279L32.6371 26.7579ZM34.8877 27.8115L34.4866 28.11C34.5962 28.2573 34.6685 28.4475 34.7082 28.7884C34.7494 29.1423 34.7502 29.6011 34.7502 30.2699H35.2502H35.7502C35.7502 29.6246 35.7509 29.0978 35.7015 28.6728C35.6506 28.2348 35.5417 27.8528 35.2889 27.513L34.8877 27.8115ZM35.2502 30.2699H34.7502V37.1668H35.2502H35.7502V30.2699H35.2502ZM23.3335 25.2502V25.7502H26.0835V25.2502V24.7502H23.3335V25.2502ZM23.3335 28.9168V29.4168H26.0835V28.9168V28.4168H23.3335V28.9168ZM27.0002 37.1668H27.5002V34.4168H27.0002H26.5002V37.1668H27.0002ZM27.0002 34.4168H27.5002C27.5002 33.9989 27.5012 33.6351 27.4621 33.3444C27.4211 33.0393 27.3279 32.7411 27.0852 32.4984L26.7317 32.852L26.3781 33.2055C26.404 33.2314 26.445 33.2835 26.4711 33.4776C26.4991 33.6862 26.5002 33.9706 26.5002 34.4168H27.0002ZM26.7317 32.852L27.0852 32.4984C26.8426 32.2558 26.5443 32.1625 26.2393 32.1215C25.9486 32.0824 25.5848 32.0835 25.1668 32.0835V32.5835V33.0835C25.6131 33.0835 25.8975 33.0846 26.106 33.1126C26.3002 33.1387 26.3523 33.1797 26.3781 33.2055L26.7317 32.852ZM25.1668 32.5835V32.0835H24.2502V32.5835V33.0835H25.1668V32.5835ZM24.2502 32.5835V32.0835C23.8322 32.0835 23.4684 32.0824 23.1777 32.1215C22.8726 32.1625 22.5744 32.2558 22.3318 32.4984L22.6853 32.852L23.0389 33.2055C23.0647 33.1797 23.1168 33.1387 23.311 33.1126C23.5195 33.0846 23.8039 33.0835 24.2502 33.0835V32.5835ZM22.6853 32.852L22.3318 32.4984C22.0891 32.7411 21.9959 33.0393 21.9548 33.3444C21.9158 33.6351 21.9168 33.9989 21.9168 34.4168H22.4168H22.9168C22.9168 33.9706 22.9179 33.6862 22.9459 33.4776C22.972 33.2835 23.013 33.2314 23.0389 33.2055L22.6853 32.852ZM22.4168 34.4168H21.9168V37.1668H22.4168H22.9168V34.4168H22.4168ZM17.8335 37.1668V37.6668H36.1668V37.1668V36.6668H17.8335V37.1668ZM18.7502 37.1668H19.2502V23.1576H18.7502H18.2502V37.1668H18.7502ZM18.7502 23.1576H19.2502C19.2502 21.9915 19.2513 21.1703 19.336 20.5665C19.4192 19.9724 19.5705 19.6959 19.7847 19.5272L19.4754 19.1344L19.1661 18.7415C18.6551 19.1438 18.4437 19.7282 18.3457 20.4276C18.249 21.1173 18.2502 22.0222 18.2502 23.1576H18.7502ZM19.4754 19.1344L19.7847 19.5272C19.9944 19.3621 20.2806 19.2874 20.8446 19.3629C21.4232 19.4403 22.1813 19.659 23.2652 19.9736L23.4046 19.4934L23.5439 19.0132C22.4918 18.7078 21.6481 18.4615 20.9773 18.3717C20.2921 18.28 19.6816 18.3357 19.1661 18.7415L19.4754 19.1344ZM23.4046 19.4934L23.2652 19.9736L27.8485 21.304L27.9879 20.8238L28.1273 20.3436L23.5439 19.0132L23.4046 19.4934ZM27.9879 20.8238L27.8485 21.304C28.5047 21.4944 28.9538 21.6257 29.2884 21.7684C29.6096 21.9053 29.7758 22.0332 29.8904 22.1899L30.294 21.8948L30.6977 21.5998C30.4395 21.2466 30.0971 21.0261 29.6806 20.8485C29.2775 20.6766 28.76 20.5273 28.1273 20.3436L27.9879 20.8238ZM30.294 21.8948L29.8904 22.19C30.0062 22.3483 30.0821 22.5538 30.1234 22.9181C30.1661 23.2944 30.1668 23.7821 30.1668 24.488H30.6668H31.1668C31.1668 23.8051 31.1676 23.2511 31.117 22.8055C31.0652 22.3479 30.9546 21.9512 30.6976 21.5997L30.294 21.8948ZM30.6668 24.488H30.1668V37.1668H30.6668H31.1668V24.488H30.6668Z"
                fill="#007AFF"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-sm max-w-[10rem] truncate">{name}</p>
          <h2 className={cn("text-[12.42px] text-zinc-500")}>
            {members} {t("spaceCard.members")}
          </h2>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="size-10 hover:bg-gray-300/20 flex items-center justify-center rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModal("renameSpace");
              setProps({
                renameSpaceModalProps: {
                  spaceId: id,
                  initialName: name,
                },
                initialTab: "settings",
              });
            }}
            className="flex items-center"
          >
            <Pen className="w-4 h-4 mr-1" />
            {t("spaceCard.rename")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModal("membersAndNumbers");
              setProps({
                manageSpaceMembers: {
                  spaceId: id,
                  spaceName: name,
                },
              });
            }}
            className="flex items-center"
          >
            <Users2 className="w-4 h-4 mr-1" />
            {t("spaceCard.manageMembers")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // Enable Delete Modal
              setModal("deleteConfirmation");
              setProps({
                deleteModalInfo: {
                  title: t("spaceCard.deleteSpaceConfirmation", { name }),
                  description: t("spaceCard.actionCannotBeUndone"),
                  onDelete: handleDeleteSpace,
                },
              });
            }}
            disabled={isLoading}
            className="flex items-center text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {t("spaceCard.remove")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default SpaceCard;
