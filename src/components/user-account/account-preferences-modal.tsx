"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Globe,
  Sun,
  Moon,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";

export interface AccountPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authUser?: string | number;
  user?: {
    name?: string;
    email?: string;
    imageUrl?: string | null;
  };
  plan?: {
    name?: string;
    badgeText?: string;
    nextPayment?: string;
    usedCredits?: number;
    totalCredits?: number;
    availableCredits?: number;
  };
  showPlan?: boolean;
  platform?: "studio" | "my-nitx" | "signage" | string;
  language?: string;
  onLanguageChange?: (language: string) => void;
  theme?: "light" | "dark" | "system";
  onThemeChange?: (theme: "light" | "dark" | "system") => void;
  onManageAccount?: () => void;
  myNitxUrl?: string;
}

export function AccountPreferencesModal({
  open,
  onOpenChange,
  authUser,
  user,
  plan,
  showPlan,
  platform,
  language: controlledLanguage,
  onLanguageChange,
  theme: controlledTheme,
  onThemeChange,
  onManageAccount,
  myNitxUrl,
}: AccountPreferencesModalProps) {
  let params: any = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    params = useParams();
  } catch {
    params = null;
  }

  const { i18n } = useNitxUiTranslation();
  const [internalLanguage, setInternalLanguage] = useState<string>("en");
  const [internalTheme, setInternalTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const docLang =
        document.documentElement.lang ||
        (document.documentElement.getAttribute("dir") === "rtl" ? "ar" : "en");
      if (docLang === "ar" || docLang === "en") {
        setInternalLanguage(docLang);
      }
    }
  }, []);

  const language = controlledLanguage ?? internalLanguage;
  const isRTL = language === "ar";
  const theme = controlledTheme ?? internalTheme;

  const isDarkActive =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        ((typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark")) ||
          (typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches))));

  // Resolve session/auth user ID for My Nitx dashboard
  const resolvedAuthUser = authUser ?? params?.auth_user ?? 0;
  const rawMyNitxUrl =
    myNitxUrl ||
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MY_NITX_URL : undefined);
  const isDummyUrl = !rawMyNitxUrl || rawMyNitxUrl === "http://example.com";
  const myNitxBaseUrl = isDummyUrl
    ? typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
      ? "http://localhost:3001"
      : "https://my.nitx.app"
    : rawMyNitxUrl;

  const myNitxDashboardUrl = `${myNitxBaseUrl}/${encodeURIComponent(String(resolvedAuthUser))}`;

  // Controlled values with fallbacks matching the exact design mockup
  const userName = user?.name || "Abdulaziz Al-Qahtani";
  const userEmail = user?.email || "abdalazizqa@nitx.io";
  const userImage = user?.imageUrl ?? null;

  const planName = plan?.name || "Pro Plan (5000 Credit)";
  const planBadge = plan?.badgeText || "Active";
  const nextPaymentDate = plan?.nextPayment || "Jun 27, 2026";

  const totalCredits = plan?.totalCredits ?? 5000;
  const usedCredits = plan?.usedCredits ?? 20;
  const availableCredits = plan?.availableCredits ?? 4980;

  // Compute progress percentage
  const usagePercentage = Math.min(
    100,
    Math.max(1, Math.round((usedCredits / (totalCredits || 5000)) * 100))
  );

  // Determine if the current platform is Studio
  const isStudioEnv = (() => {
    // 1. Explicit platform prop provided
    if (platform) {
      return platform.toLowerCase() === "studio";
    }

    // 2. Check browser location for non-studio or studio domains / ports
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const port = window.location.port;

      // Localhost ports convention:
      // reach: 3001, signage: 3002, studio: 3003, publisher: 3004, ads: 3005, my-nitx: 3006
      if (["3001", "3002", "3004", "3005", "3006"].includes(port)) {
        return false;
      }
      if (port === "3003") {
        return true;
      }

      // If running on another Nitx product domain or pathname, definitely not Studio
      if (
        host.includes("my.") ||
        host.includes("signage") ||
        host.includes("publisher") ||
        host.includes("ads") ||
        host.includes("reach") ||
        host.includes("nexus") ||
        pathname.includes("/publisher") ||
        pathname.includes("/signage") ||
        pathname.includes("/ads") ||
        pathname.includes("/reach")
      ) {
        return false;
      }

      // Explicit studio domain or studio path
      if (host.includes("studio") || pathname.includes("/studio")) {
        return true;
      }
    }

    // 3. Document title check
    if (typeof document !== "undefined" && document.title) {
      const title = document.title.toLowerCase();
      if (
        title.includes("publisher") ||
        title.includes("signage") ||
        title.includes("ads") ||
        title.includes("my nitx") ||
        title.includes("reach")
      ) {
        return false;
      }
      if (title.includes("studio")) {
        return true;
      }
    }

    return false;
  })();

  const isStudio = isStudioEnv;

  // The Current Plan section must ONLY show on Nitx Studio and NEVER on Publisher or other platforms:
  // - Explicit showPlan overrides
  // - Explicit platform="studio" shows plan
  // - If platform is not specified, only show if verified on Studio AND a plan was provided
  const shouldShowPlan =
    showPlan !== undefined
      ? Boolean(showPlan)
      : platform === "studio"
      ? true
      : isStudio && Boolean(plan);

  // Platform display name for subtitles
  const platformDisplayName =
    platform === "studio"
      ? "Nitx Studio"
      : platform === "my-nitx"
      ? "My Nitx"
      : platform === "signage"
      ? "Nitx Signage"
      : platform === "publisher"
      ? "Nitx Publisher"
      : platform === "ads"
      ? "Nitx Ads"
      : isStudio
      ? "Nitx Studio"
      : "Nitx";

  // Calculate initials from name
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AA";

  const handleLanguageChange = (value: string) => {
    setInternalLanguage(value);
    if (onLanguageChange) {
      onLanguageChange(value);
    }
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(value);
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", value === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", value);
      try {
        localStorage.setItem("nitx-language", value);
      } catch {}
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nitx-language-change", { detail: value })
      );
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setInternalTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      const isLocal =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");
      const domainStr = isLocal ? "" : "domain=.nitx.app;";
      document.cookie = `nitx-theme=${newTheme}; path=/; max-age=31536000; ${domainStr} samesite=lax`;
      try {
        localStorage.setItem("theme", newTheme);
      } catch {}
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nitx-theme-change", { detail: newTheme })
      );
    }
  };

  const handleManageAccountClick = (e?: React.MouseEvent) => {
    if (onManageAccount) {
      e?.preventDefault();
      onManageAccount();
      return;
    }
    // Redirect user to My Nitx dashboard
    if (typeof window !== "undefined") {
      window.location.href = myNitxDashboardUrl;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-7xl max-h-[90dvh] overflow-y-auto p-4 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[32px] corner-squircle border border-zinc-200/90 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-950 shadow-2xl transition-all"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Modal Header */}
        <div className="flex flex-row items-center justify-between w-full pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {isRTL ? "الإعدادات العامة" : "General Settings"}
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full size-8 sm:size-9 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors focus:outline-none cursor-pointer"
              aria-label={isRTL ? "إلغاء" : "Cancel"}
            >
              <X className="size-4.5 sm:size-5 stroke-[2]" />
              <span className="sr-only">{isRTL ? "إلغاء" : "Cancel"}</span>
            </button>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-6 sm:gap-7 w-full pt-1">
          {/* SECTION 1: PROFILE */}
          <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:px-6 sm:py-4">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {isRTL ? "الملف الشخصي" : "Profile"}
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {isRTL
                  ? `معلومات حسابك في ${platformDisplayName}`
                  : `Your account information in ${platformDisplayName}`}
              </p>
            </div>

            {/* Profile Content */}
            <div className="p-4 sm:px-6 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar className="size-11 sm:size-12 !rounded-[12px] sm:!rounded-[14px] corner-squircle overflow-hidden shrink-0 border border-black/5 dark:border-white/10">
                  {userImage && <AvatarImage src={userImage} alt={userName} className="!rounded-[12px] sm:!rounded-[14px]" />}
                  <AvatarFallback className="!rounded-none bg-[#183EC2] text-white font-semibold text-sm sm:text-base flex items-center justify-center">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {userName}
                  </span>
                  <span className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {userEmail}
                  </span>
                </div>
              </div>

              <a
                href={myNitxDashboardUrl}
                onClick={handleManageAccountClick}
                className="group flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer self-start sm:self-center shrink-0"
              >
                <span>{isRTL ? "إدارة تفاصيل الحساب" : "Manage account details"}</span>
                <ArrowRight
                  className={cn(
                    "size-3.5 sm:size-4 text-zinc-700 dark:text-zinc-300 group-hover:translate-x-0.5 transition-transform",
                    isRTL && "rotate-180 group-hover:-translate-x-0.5"
                  )}
                />
              </a>
            </div>
          </div>

          {/* SECTION 2: GENERAL PREFERENCES */}
          <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:px-6 sm:py-4">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {isRTL ? "التفضيلات العامة" : "General Preferences"}
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {isRTL
                  ? `كيف يبدو ويتحدث إليك ${platformDisplayName}`
                  : `How ${platformDisplayName} looks and speaks to you`}
              </p>
            </div>

            {/* Row 1: Language */}
            <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:w-36 md:w-44 shrink-0">
                <Globe className="size-[18px] text-zinc-700 dark:text-zinc-300 shrink-0 stroke-[1.75]" />
                <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {isRTL ? "اللغة" : "Language"}
                </span>
              </div>

              <div className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 flex-1 sm:px-2">
                {isRTL ? "اختر لغة الواجهة" : "Choose your interface language"}
              </div>

              <div className="sm:self-center shrink-0 w-full sm:w-auto">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="h-9 sm:h-10 min-w-[120px] sm:min-w-[145px] w-full sm:w-auto rounded-[12px] corner-squircle border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 px-3 py-2 text-xs sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors focus:ring-1 focus:ring-zinc-400">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[16px] corner-squircle border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
                    <SelectItem value="en" className="text-xs sm:text-sm py-2">
                      English
                    </SelectItem>
                    <SelectItem value="ar" className="text-xs sm:text-sm py-2">
                      العربية
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Theme */}
            <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:w-36 md:w-44 shrink-0">
                {/* Half-filled contrast/theme circle icon matching design */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200 shrink-0">
                  <g clipPath="url(#clip0_20945_12529)">
                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 16.5V1.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 5.25H15.375" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                    <path d="M9 12.75H15.375" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                    <path d="M9 9H16.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_20945_12529">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {isRTL ? "المظهر" : "Theme"}
                </span>
              </div>

              <div className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 flex-1 sm:px-2">
                {isRTL ? "اختر مظهر الواجهة" : "Choose your interface appearance"}
              </div>

              <div className="sm:self-center shrink-0">
                {/* Segmented pill control with squircle corners */}
                <div className="inline-flex items-center p-1 rounded-[14px] sm:rounded-[16px] corner-squircle border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-850 gap-1">
                  <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] sm:rounded-[12px] corner-squircle text-xs font-medium transition-all cursor-pointer",
                      !isDarkActive
                        ? "bg-[#18181b] text-white shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent"
                    )}
                  >
                    <Sun className="size-3.5 stroke-[2]" />
                    <span>{isRTL ? "فاتح" : "Light"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleThemeChange("dark")}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] sm:rounded-[12px] corner-squircle text-xs font-medium transition-all cursor-pointer",
                      isDarkActive
                        ? "bg-[#18181b] dark:bg-white text-white dark:text-zinc-900 shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent"
                    )}
                  >
                    <Moon className="size-3.5 stroke-[2]" />
                    <span>{isRTL ? "داكن" : "Dark"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: CURRENT PLAN (Studio only) */}
          {shouldShowPlan && (
            <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:px-6 sm:py-4">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {isRTL ? "الخطة الحالية" : "Current Plan"}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {isRTL ? "اشتراكك في Nitx Studio" : "Your Nitx Studio subscription"}
                </p>
              </div>

              {/* Row 1: Plan */}
              <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:w-36 md:w-44 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200 shrink-0">
                    <g clipPath="url(#clip0_20945_12551)">
                      <path d="M3.75 15H14.25" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5.99998 9C5.17155 9 4.49998 8.32845 4.49998 7.5C4.49998 7.3417 4.5245 7.18912 4.56996 7.04587L2.65475 5.41741C2.37889 5.18284 1.96314 5.1963 1.70394 5.44817C1.52028 5.62665 1.45412 5.88964 1.53234 6.13033L3.4071 11.7265C3.61194 12.3379 4.1846 12.75 4.82941 12.75H13.1706C13.8154 12.75 14.3881 12.3379 14.5929 11.7265L16.4677 6.13033C16.5459 5.88964 16.4797 5.62665 16.2961 5.44817C16.0369 5.1963 15.6211 5.18284 15.3452 5.41741L13.43 7.04589C13.4755 7.18914 13.5 7.3417 13.5 7.5C13.5 8.32845 12.8284 9 12 9C11.1715 9 10.5 8.32845 10.5 7.5C10.5 7.02214 10.7234 6.59647 11.0716 6.32178L9.51922 2.59615C9.43185 2.38654 9.2271 2.25 9 2.25C8.7729 2.25 8.56807 2.38654 8.48077 2.59615L6.92841 6.32178C7.27653 6.59647 7.49998 7.02214 7.49998 7.5C7.49998 8.32845 6.82841 9 5.99998 9Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_20945_12551">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isRTL ? "الخطة" : "Plan"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap flex-1">
                  <span className="text-xs sm:text-[13px] font-normal text-zinc-800 dark:text-zinc-200">
                    {planName}
                  </span>
                  <span className="bg-[#EEF2FF] dark:bg-blue-950/60 text-[#305DFD] dark:text-blue-400 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-[8px] corner-squircle inline-flex items-center leading-none">
                    {planBadge}
                  </span>
                </div>
              </div>

              {/* Row 2: Next payment */}
              <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:w-36 md:w-44 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200 shrink-0">
                    <g clipPath="url(#clip0_20945_12598)">
                      <path d="M12 1.5V4.5M6 1.5V4.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.75 3H8.25C5.42157 3 4.00736 3 3.12868 3.87868C2.25 4.75736 2.25 6.17157 2.25 9V10.5C2.25 13.3284 2.25 14.7427 3.12868 15.6213C4.00736 16.5 5.42157 16.5 8.25 16.5H9.75C12.5784 16.5 13.9927 16.5 14.8713 15.6213C15.75 14.7427 15.75 13.3284 15.75 10.5V9C15.75 6.17157 15.75 4.75736 14.8713 3.87868C13.9927 3 12.5784 3 9.75 3Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.25 7.5H15.75" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_20945_12598">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isRTL ? "الدفع التالي" : "Next payment"}
                  </span>
                </div>

                <div className="text-xs sm:text-[13px] font-normal text-zinc-800 dark:text-zinc-200 flex-1">
                  {nextPaymentDate}
                </div>
              </div>

              {/* Row 3: Credits */}
              <div className="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2.5 md:w-44 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200 shrink-0">
                    <g clipPath="url(#clip0_20945_12612)">
                      <path d="M1.5 4.5L6.68476 7.43773C8.5962 8.52075 9.4038 8.52075 11.3152 7.43773L16.5 4.5" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
                      <path d="M1.51183 10.1067C1.56086 12.4059 1.58537 13.5554 2.43372 14.4071C3.28206 15.2586 4.46275 15.2882 6.82412 15.3476C8.27948 15.3842 9.72053 15.3842 11.1759 15.3476C13.5373 15.2882 14.7179 15.2586 15.5663 14.4071C16.4147 13.5554 16.4392 12.4059 16.4881 10.1067C16.504 9.36743 16.504 8.63258 16.4881 7.8933C16.4392 5.59415 16.4147 4.44457 15.5663 3.593C14.7179 2.74142 13.5373 2.71176 11.1759 2.65243C9.72053 2.61586 8.27947 2.61586 6.82411 2.65242C4.46275 2.71175 3.28206 2.74141 2.43371 3.59299C1.58537 4.44456 1.56085 5.59414 1.51182 7.8933C1.49605 8.63258 1.49606 9.36743 1.51183 10.1067Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_20945_12612">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {isRTL ? "الرصيد" : "Credits"}
                  </span>
                </div>

                <div className="flex-1 flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {isRTL ? `المستخدم: ${usedCredits.toLocaleString()}` : `Used: ${usedCredits.toLocaleString()}`}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {isRTL ? `المتاح: ${availableCredits.toLocaleString()}` : `Available: ${availableCredits.toLocaleString()}`}
                    </span>
                  </div>

                  {/* Progress Bar matching design */}
                  <div className="w-full h-1.5 sm:h-2 bg-[#E5E7EB] dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#183EC2] dark:bg-[#305DFD] rounded-full transition-all duration-500"
                      style={{ width: `${usagePercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountPreferencesModal;
