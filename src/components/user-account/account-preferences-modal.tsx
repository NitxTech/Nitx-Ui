"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { DrawerDialog } from "../ui/drawer-dialog";
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
  ChevronRight,
  ChevronLeft,
  User,
  Sliders,
  CreditCard,
  Shield,
  Check,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { getSharedApiClient } from "../../lib/api-client";
import { Skeleton } from "../ui/skeleton";

export type SettingsSectionKey = "profile" | "preferences" | "plan" | "security";

export interface AccountPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authUser?: string | number;
  user?: {
    name?: string;
    email?: string;
    imageUrl?: string | null;
    phone?: string;
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
  apiUrl?: string;
  apiClient?: any;
  onUpdateUser?: (payload: { language?: string; display_mode?: 0 | 1 | 2; name?: string }) => Promise<any>;
}

function getSessionTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const cookieNames = [
    "session",
    "sessions",
    "sessions-dev",
    "token",
    "access_token",
    "auth_token",
  ];
  for (const name of cookieNames) {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    if (match) {
      try {
        const decoded = decodeURIComponent(match[1]);
        if (decoded.startsWith("[") || decoded.startsWith("{")) {
          const parsed = JSON.parse(decoded);
          const arr = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of arr) {
            if (item?.access_token) return item.access_token;
            if (item?.token) return item.token;
          }
        } else if (decoded.length > 20 && !decoded.includes(" ")) {
          return decoded;
        }
      } catch {}
    }
  }
  return null;
}

function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const val = sessionStorage.getItem(key);
        if (val) {
          if (val.startsWith("{") || val.startsWith("[")) {
            const parsed = JSON.parse(val);
            if (parsed?.access_token) return parsed.access_token;
            if (parsed?.state?.auth?.access_token) return parsed.state.auth.access_token;
            if (parsed?.auth?.access_token) return parsed.auth.access_token;
          } else if (key.toLowerCase().includes("token") && val.length > 20) {
            return val;
          }
        }
      }
    }
  } catch {}

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const val = localStorage.getItem(key);
        if (val) {
          if (val.startsWith("{") || val.startsWith("[")) {
            const parsed = JSON.parse(val);
            if (parsed?.access_token) return parsed.access_token;
            if (parsed?.state?.auth?.access_token) return parsed.state.auth.access_token;
            if (parsed?.state?.sessions) {
              for (const s of parsed.state.sessions) {
                if (s?.access_token) return s.access_token;
              }
            }
          } else if (key.toLowerCase().includes("token") && val.length > 20) {
            return val;
          }
        }
      }
    }
  } catch {}

  return null;
}

export const displayModeToTheme = (
  displayMode: unknown
): "light" | "dark" | "system" => {
  if (displayMode === 1) return "light";
  if (displayMode === 2) return "dark";
  return "system";
};

export const themeToDisplayMode = (
  theme: "light" | "dark" | "system"
): 0 | 1 | 2 => {
  if (theme === "light") return 1;
  if (theme === "dark") return 2;
  return 0;
};

export function cookieDomain(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "";
  if (host.endsWith(".nitx.app")) return "domain=.nitx.app;";
  if (host.endsWith(".nitx.io")) return "domain=.nitx.io;";
  if (host.endsWith(".nitx.local")) return "domain=.nitx.local;";
  return "";
}

export function readThemeCookie(): "light" | "dark" | "system" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)nitx-theme=([^;]+)/);
  return m ? (decodeURIComponent(m[1]) as "light" | "dark" | "system") : null;
}

export function writeThemeCookie(theme: "light" | "dark" | "system") {
  const domainStr = cookieDomain();
  document.cookie = `nitx-theme=${theme}; path=/; max-age=31536000; ${domainStr} samesite=lax`;
  try {
    localStorage.setItem("nitx-theme", theme);
    localStorage.setItem("theme", theme);
  } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("nitx-theme-change", { detail: theme })
    );
  }
}

export function readLanguageCookie(): "ar" | "en" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)(?:nitx-language|nitx-lang)=([^;]+)/);
  if (!m) return null;
  const lang = decodeURIComponent(m[1]);
  return lang === "ar" || lang === "en" ? lang : null;
}

export function writeLanguageCookie(lang: string) {
  const domainStr = cookieDomain();
  document.cookie = `nitx-language=${lang}; path=/; max-age=31536000; ${domainStr} samesite=lax`;
  document.cookie = `nitx-lang=${lang}; path=/; max-age=31536000; ${domainStr} samesite=lax`;
  try {
    localStorage.setItem("nitx-language", lang);
    localStorage.setItem("i18nextLng", lang);
  } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("nitx-language-change", { detail: lang })
    );
  }
}

export async function callUpdateBasicInfo(
  payload: { language?: string; display_mode?: 0 | 1 | 2; name?: string },
  options?: {
    apiClient?: any;
    apiUrl?: string;
    onUpdateUser?: (payload: { language?: string; display_mode?: 0 | 1 | 2; name?: string }) => Promise<any>;
  }
): Promise<any> {
  if (options?.onUpdateUser) {
    return await options.onUpdateUser(payload);
  }

  const client = options?.apiClient || getSharedApiClient();
  if (client && typeof client.post === "function") {
    return await client.post("/api/user-info/update-basic-info", payload);
  }

  const rawBaseUrl =
    options?.apiUrl ||
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_URL : undefined);

  let baseUrl = rawBaseUrl || "";
  if (!baseUrl && typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes(".dev.") || host === "localhost" || host === "127.0.0.1") {
      baseUrl = "https://api.dev.nitx.app";
    } else if (host.endsWith(".nitx.app")) {
      baseUrl = "https://api.nitx.app";
    } else if (host.endsWith(".nitx.io")) {
      baseUrl = "https://api.nitx.io";
    } else {
      baseUrl = "https://api.dev.nitx.app";
    }
  }

  const endpoint = `${baseUrl ? baseUrl.replace(/\/$/, "") : ""}/api/user-info/update-basic-info`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  const detectedToken =
    client?.defaults?.headers?.common?.["Authorization"] ||
    (typeof window !== "undefined" && (
      (window as any).__NITX_AUTH_TOKEN__ ||
      (window as any).__NITX_API_CLIENT__?.defaults?.headers?.common?.["Authorization"] ||
      (window as any).axios?.defaults?.headers?.common?.["Authorization"]
    )) ||
    getSessionTokenFromCookie() ||
    getTokenFromStorage();

  if (detectedToken) {
    headers["Authorization"] = detectedToken.startsWith("Bearer ")
      ? detectedToken
      : `Bearer ${detectedToken}`;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `Request failed with status ${res.status}`);
  }

  return await res.json().catch(() => ({}));
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
  apiUrl,
  apiClient,
  onUpdateUser,
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
  const [isMobile, setIsMobile] = useState(false);

  // Active section: on mobile null represents the section list; on desktop defaults to "profile"
  const [activeSection, setActiveSection] = useState<SettingsSectionKey | null>(null);

  // In-modal profile editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [userNameInput, setUserNameInput] = useState(user?.name || "Abdulaziz Al-Qahtani");
  const [currentUserName, setCurrentUserName] = useState(user?.name || "Abdulaziz Al-Qahtani");
  const [isSavingName, setIsSavingName] = useState(false);

  // Section error states for resilient retry
  const [sectionErrors, setSectionErrors] = useState<Record<string, string | null>>({});
  const [sectionLoading, setSectionLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user?.name) {
      setCurrentUserName(user.name);
      setUserNameInput(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const cookieLang = readLanguageCookie();
      const docLang =
        cookieLang ||
        document.documentElement.lang ||
        (document.documentElement.getAttribute("dir") === "rtl" ? "ar" : "en");
      if (docLang === "ar" || docLang === "en") {
        setInternalLanguage(docLang);
      }
      const cookieTheme = readThemeCookie();
      if (cookieTheme) {
        setInternalTheme(cookieTheme);
      } else if (document.documentElement.classList.contains("dark")) {
        setInternalTheme("dark");
      } else {
        setInternalTheme("light");
      }
    }

    const checkMobile = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (!mobile && activeSection === null) {
          setActiveSection("profile");
        }
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [activeSection]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleThemeChangeEvt = (e: any) => {
      if (e.detail && (e.detail === "light" || e.detail === "dark" || e.detail === "system")) {
        setInternalTheme(e.detail);
      }
    };
    const handleLangChangeEvt = (e: any) => {
      if (e.detail && (e.detail === "ar" || e.detail === "en")) {
        setInternalLanguage(e.detail);
      }
    };
    window.addEventListener("nitx-theme-change", handleThemeChangeEvt as EventListener);
    window.addEventListener("nitx-language-change", handleLangChangeEvt as EventListener);
    return () => {
      window.removeEventListener("nitx-theme-change", handleThemeChangeEvt as EventListener);
      window.removeEventListener("nitx-language-change", handleLangChangeEvt as EventListener);
    };
  }, []);

  // When modal closes, reset mobile view to section list
  useEffect(() => {
    if (!open && isMobile) {
      setActiveSection(null);
      setIsEditingName(false);
    }
  }, [open, isMobile]);

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

  const userName = currentUserName;
  const userEmail = user?.email || "abdalazizqa@nitx.io";
  const userImage = user?.imageUrl ?? null;

  const planName = plan?.name || "Pro Plan (5000 Credit)";
  const planBadge = plan?.badgeText || "Active";
  const nextPaymentDate = plan?.nextPayment || "Jun 27, 2026";

  const totalCredits = plan?.totalCredits ?? 5000;
  const usedCredits = plan?.usedCredits ?? 20;
  const availableCredits = plan?.availableCredits ?? 4980;

  const usagePercentage = Math.min(
    100,
    Math.max(1, Math.round((usedCredits / (totalCredits || 5000)) * 100))
  );

  const isStudioEnv = (() => {
    if (platform) {
      return platform.toLowerCase() === "studio";
    }
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const port = window.location.port;

      if (["3001", "3002", "3004", "3005", "3006"].includes(port)) {
        return false;
      }
      if (port === "3003") {
        return true;
      }

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

      if (host.includes("studio") || pathname.includes("/studio")) {
        return true;
      }
    }

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

  const shouldShowPlan =
    showPlan !== undefined
      ? Boolean(showPlan)
      : platform === "studio"
      ? true
      : isStudio && Boolean(plan);

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

  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AA";

  const handleLanguageChange = async (value: string) => {
    const prevLang = internalLanguage;
    setInternalLanguage(value);
    writeLanguageCookie(value);

    if (onLanguageChange) {
      onLanguageChange(value);
    }
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(value);
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", value === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", value);
    }

    try {
      await callUpdateBasicInfo(
        { language: value },
        { apiClient, apiUrl, onUpdateUser }
      );
    } catch (error) {
      console.error("Failed to update language:", error);
      setInternalLanguage(prevLang);
      writeLanguageCookie(prevLang);
      if (onLanguageChange) {
        onLanguageChange(prevLang);
      }
      if (i18n?.changeLanguage) {
        i18n.changeLanguage(prevLang);
      }
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("dir", prevLang === "ar" ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", prevLang);
      }
      toast.error(
        value === "ar"
          ? "فشل تحديث اللغة. تمت استعادة الإعداد السابق."
          : "Failed to update language. Reverted to previous setting."
      );
    }
  };

  const handleThemeChange = async (newTheme: "light" | "dark") => {
    const prevTheme = internalTheme;
    setInternalTheme(newTheme);
    writeThemeCookie(newTheme);

    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    try {
      const displayMode = themeToDisplayMode(newTheme);
      await callUpdateBasicInfo(
        { display_mode: displayMode },
        { apiClient, apiUrl, onUpdateUser }
      );
    } catch (error) {
      console.error("Failed to update appearance mode:", error);
      setInternalTheme(prevTheme);
      writeThemeCookie(prevTheme);
      if (onThemeChange) {
        onThemeChange(prevTheme);
      }
      if (typeof document !== "undefined") {
        if (prevTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      toast.error(
        language === "ar"
          ? "فشل تحديث المظهر. تمت استعادة الإعداد السابق."
          : "Failed to update appearance mode. Reverted to previous setting."
      );
    }
  };

  const handleSaveName = async () => {
    if (!userNameInput.trim()) {
      toast.error(isRTL ? "الرجاء إدخال اسم صالح" : "Please enter a valid name");
      return;
    }

    setIsSavingName(true);
    setSectionErrors((prev) => ({ ...prev, profile: null }));

    try {
      await callUpdateBasicInfo(
        { name: userNameInput.trim() },
        { apiClient, apiUrl, onUpdateUser }
      );
      setCurrentUserName(userNameInput.trim());
      setIsEditingName(false);
      toast.success(isRTL ? "تم تحديث الاسم بنجاح" : "Name updated successfully");
    } catch (err: any) {
      console.error("Failed to save name:", err);
      setSectionErrors((prev) => ({
        ...prev,
        profile: isRTL ? "فشل حفظ التغييرات. يرجى إعادة المحاولة." : "Failed to save changes. Please try again.",
      }));
      toast.error(isRTL ? "تعذر حفظ الاسم" : "Could not save name");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleManageAccountClick = (e?: React.MouseEvent) => {
    if (onManageAccount) {
      e?.preventDefault();
      onManageAccount();
      return;
    }
    if (typeof window !== "undefined") {
      window.location.href = myNitxDashboardUrl;
    }
  };

  // Section configs for navigation
  const sections = useMemo(() => {
    const list: Array<{
      key: SettingsSectionKey;
      title: string;
      titleAr: string;
      description: string;
      descriptionAr: string;
      icon: React.ReactNode;
    }> = [
      {
        key: "profile",
        title: "Profile & Account",
        titleAr: "الملف والحساب",
        description: `Your personal identity in ${platformDisplayName}`,
        descriptionAr: `معلومات حسابك في ${platformDisplayName}`,
        icon: <User className="size-4 shrink-0 text-zinc-700 dark:text-zinc-300" />,
      },
      {
        key: "preferences",
        title: "General Preferences",
        titleAr: "التفضيلات العامة",
        description: "Language and appearance settings",
        descriptionAr: "إعدادات اللغة ومظهر الواجهة",
        icon: <Sliders className="size-4 shrink-0 text-zinc-700 dark:text-zinc-300" />,
      },
    ];

    if (shouldShowPlan) {
      list.push({
        key: "plan",
        title: "Current Plan",
        titleAr: "الخطة الحالية",
        description: "Subscription credits and quota details",
        descriptionAr: "تفاصيل الاشتراك والرصيد المتبقي",
        icon: <CreditCard className="size-4 shrink-0 text-zinc-700 dark:text-zinc-300" />,
      });
    }

    list.push({
      key: "security",
      title: "Security & Sessions",
      titleAr: "الأمان والجلسات",
      description: "Account protection and authentication status",
      descriptionAr: "حماية الحساب وحالة جلسات تسجيل الدخول",
      icon: <Shield className="size-4 shrink-0 text-zinc-700 dark:text-zinc-300" />,
    });

    return list;
  }, [shouldShowPlan, platformDisplayName]);

  // Modal Title calculation
  const modalTitle = useMemo(() => {
    if (isMobile) {
      if (activeSection === null) {
        return isRTL ? "الإعدادات العامة" : "General Settings";
      }
      const section = sections.find((s) => s.key === activeSection);
      return section ? (isRTL ? section.titleAr : section.title) : (isRTL ? "الإعدادات" : "Settings");
    }
    return isRTL ? "الإعدادات العامة" : "General Settings";
  }, [isMobile, activeSection, sections, isRTL]);

  // Back handler for mobile drawer
  const handleBack = isMobile && activeSection !== null
    ? () => {
        setActiveSection(null);
        setIsEditingName(false);
      }
    : undefined;

  // Render detail contents for Profile
  const renderProfileDetail = () => {
    const error = sectionErrors.profile;
    const loading = sectionLoading.profile;

    if (loading) {
      return (
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-[16px] corner-squircle" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-5">
        {error && (
          <div className="p-3 rounded-[12px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between text-xs text-red-700 dark:text-red-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => handleSaveName()}
              className="font-medium underline hover:text-red-900 dark:hover:text-red-100 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="size-3" />
              <span>{isRTL ? "إعادة المحاولة" : "Retry"}</span>
            </button>
          </div>
        )}

        {/* User Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 sm:size-16 !rounded-[16px] sm:!rounded-[18px] corner-squircle overflow-hidden shrink-0 border border-black/5 dark:border-white/10">
                {userImage && <AvatarImage src={userImage} alt={userName} className="!rounded-[16px]" />}
                <AvatarFallback className="!rounded-none bg-[#183EC2] text-white font-semibold text-lg flex items-center justify-center">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {userName}
                </span>
                <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {userEmail}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-[6px]">
                    <Check className="size-3" />
                    <span>{isRTL ? "حساب مفعل" : "Active account"}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Modal Account Detail Fields */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-4 sm:px-6 sm:py-4">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isRTL ? "تفاصيل الحساب" : "Account Details"}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isRTL ? "يمكنك تحديث اسمك وإدارة بياناتك هنا مباشرة" : "Update your name and view account settings directly here"}
            </p>
          </div>

          {/* Row: Display Name */}
          <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="sm:w-36 shrink-0 text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isRTL ? "الاسم الكامل" : "Full Name"}
            </div>

            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    disabled={isSavingName}
                    className="flex-1 h-9 px-3 text-xs sm:text-sm rounded-[10px] corner-squircle border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter full name"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    disabled={isSavingName}
                    className="h-9 px-3.5 rounded-[10px] corner-squircle bg-[#183EC2] text-white text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingName ? (isRTL ? "جاري الحفظ..." : "Saving...") : (isRTL ? "حفظ" : "Save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserNameInput(userName);
                      setIsEditingName(false);
                    }}
                    disabled={isSavingName}
                    className="h-9 px-3 rounded-[10px] corner-squircle border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {isRTL ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              ) : (
                <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
                  {userName}
                </span>
              )}
            </div>

            {!isEditingName && (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="text-xs font-medium text-[#183EC2] dark:text-blue-400 hover:underline shrink-0 cursor-pointer self-start sm:self-center"
              >
                {isRTL ? "تعديل" : "Edit"}
              </button>
            )}
          </div>

          {/* Row: Email (Read Only) */}
          <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="sm:w-36 shrink-0 text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isRTL ? "البريد الإلكتروني" : "Email Address"}
            </div>
            <div className="flex-1 min-w-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate">
              {userEmail}
            </div>
            <span className="text-[11px] font-medium text-zinc-400 shrink-0">
              {isRTL ? "أساسي" : "Primary"}
            </span>
          </div>

          {/* Row: Advanced Settings Link */}
          <div className="p-4 sm:px-6 sm:py-4 flex items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-950/40">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {isRTL ? "مركز حسابات My Nitx" : "My Nitx Account Portal"}
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                {isRTL ? "إدارة الفواتير والاشتراكات المتقدمة" : "Manage billing, invoices, and organization spaces"}
              </span>
            </div>

            <a
              href={myNitxDashboardUrl}
              onClick={handleManageAccountClick}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-[10px] corner-squircle border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 transition-colors shrink-0"
            >
              <span>{isRTL ? "فتح المركز" : "Open Portal"}</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Render detail contents for General Preferences
  const renderPreferencesDetail = () => {
    return (
      <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-800 dark:text-zinc-200 shrink-0">
              <g clipPath="url(#clip0_theme_icon)">
                <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 16.5V1.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 5.25H15.375" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                <path d="M9 12.75H15.375" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                <path d="M9 9H16.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip0_theme_icon">
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
    );
  };

  // Render detail contents for Current Plan
  const renderPlanDetail = () => {
    if (!plan && !shouldShowPlan) {
      return (
        <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-[16px] border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">
            {isRTL ? "لا توجد تفاصيل خطة نشطة متاحة" : "No active plan details available"}
          </p>
        </div>
      );
    }

    return (
      <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 sm:px-6 sm:py-4">
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {isRTL ? "الخطة الحالية" : "Current Plan"}
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isRTL ? `اشتراكك في ${platformDisplayName}` : `Your ${platformDisplayName} subscription`}
          </p>
        </div>

        {/* Row 1: Plan Name */}
        <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:w-36 md:w-44 shrink-0">
            <Sparkles className="size-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
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
            <CreditCard className="size-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
            <span className="text-[13px] sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isRTL ? "الدفع التالي" : "Next payment"}
            </span>
          </div>

          <div className="text-xs sm:text-[13px] font-normal text-zinc-800 dark:text-zinc-200 flex-1">
            {nextPaymentDate}
          </div>
        </div>

        {/* Row 3: Credits Usage */}
        <div className="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2.5 md:w-44 shrink-0">
            <Sliders className="size-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
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

            <div className="w-full h-1.5 sm:h-2 bg-[#E5E7EB] dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#183EC2] dark:bg-[#305DFD] rounded-full transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render detail contents for Security
  const renderSecurityDetail = () => {
    return (
      <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] sm:rounded-[20px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 sm:px-6 sm:py-4">
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {isRTL ? "الأمان والجلسات" : "Security & Sessions"}
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isRTL ? "إدارة أمان الحساب وجلسات تسجيل الدخول النشطة" : "Account protection and active login sessions"}
          </p>
        </div>

        {/* Row 1: Auth Status */}
        <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isRTL ? "حالة الأمان" : "Security Status"}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isRTL ? "تسجيل دخول آمن بواسطة رموز الجلسات المعتمدة" : "Protected via authenticated browser tokens"}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-[8px] self-start sm:self-center">
            <Check className="size-3.5" />
            <span>{isRTL ? "آمن ومحمي" : "Secure"}</span>
          </span>
        </div>

        {/* Row 2: Active Session */}
        <div className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {isRTL ? "الجلسة الحالية" : "Current Session"}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isRTL ? "الجهاز الحالي نشط ومتصل بالنظام" : "This browser device is active and verified"}
            </span>
          </div>

          <span className="text-xs text-zinc-600 dark:text-zinc-300 font-mono bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-[8px] self-start sm:self-center">
            {resolvedAuthUser ? `Session: #${resolvedAuthUser}` : "Session: Default"}
          </span>
        </div>
      </div>
    );
  };

  // Main Mobile Section List
  const renderMobileSectionList = () => {
    return (
      <div className="flex flex-col gap-3 w-full">
        {/* User Mini Profile Card at the top */}
        <div
          onClick={() => setActiveSection("profile")}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] corner-squircle p-4 flex items-center justify-between gap-3 active:scale-[0.99] transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-12 !rounded-[12px] corner-squircle overflow-hidden shrink-0 border border-black/5 dark:border-white/10">
              {userImage && <AvatarImage src={userImage} alt={userName} className="!rounded-[12px]" />}
              <AvatarFallback className="!rounded-none bg-[#183EC2] text-white font-semibold text-sm flex items-center justify-center">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {userName}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {userEmail}
              </span>
            </div>
          </div>
          <ChevronRight className={cn("size-5 text-zinc-400 shrink-0", isRTL && "rotate-180")} />
        </div>

        {/* Section List Items */}
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[16px] corner-squircle divide-y divide-zinc-200/80 dark:divide-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className="w-full p-4 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:bg-zinc-100 dark:active:bg-zinc-800 transition-colors text-start cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-9 rounded-[10px] corner-squircle bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {isRTL ? section.titleAr : section.title}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {isRTL ? section.descriptionAr : section.description}
                  </span>
                </div>
              </div>
              <ChevronRight className={cn("size-4 text-zinc-400 shrink-0", isRTL && "rotate-180")} />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Active detail view dispatcher
  const renderActiveDetailView = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileDetail();
      case "preferences":
        return renderPreferencesDetail();
      case "plan":
        return renderPlanDetail();
      case "security":
        return renderSecurityDetail();
      default:
        return renderProfileDetail();
    }
  };

  return (
    <DrawerDialog
      open={open}
      onOpenChange={onOpenChange}
      onClose={() => onOpenChange(false)}
      title={modalTitle}
      dir={isRTL ? "rtl" : "ltr"}
      size="2xl"
      back={handleBack}
      backLabel={isRTL ? "رجوع" : "Back"}
      className="!rounded-[16px] sm:!rounded-[24px] corner-squircle bg-[#FAFAFA] dark:bg-zinc-950 overflow-hidden max-h-[88dvh]"
      headerClassName="px-5 sm:px-6 py-4 border-b border-zinc-200/80 dark:border-zinc-800/80"
      bodyClassName="p-4 sm:p-6 bg-[#FAFAFA] dark:bg-zinc-950 overflow-y-auto max-h-[calc(88dvh-5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]"
    >
      {isMobile ? (
        // Mobile View: Either the Section List, or the Selected Detail View with top back navigation
        <div className="flex flex-col w-full">
          {activeSection === null ? (
            renderMobileSectionList()
          ) : (
            <div className="flex flex-col w-full">
              <button
                type="button"
                onClick={() => setActiveSection(null)}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-3 cursor-pointer self-start"
              >
                <ChevronLeft className={cn("size-4", isRTL && "rotate-180")} />
                <span>{isRTL ? "الرجوع إلى قائمة الإعدادات" : "Back to settings list"}</span>
              </button>
              {renderActiveDetailView()}
            </div>
          )}
        </div>
      ) : (
        // Desktop View: Two-pane section navigation (Tabs on left, Detail on right)
        <div className="flex gap-6 w-full items-start min-h-[420px]">
          {/* Left Navigation Sidebar */}
          <div className="w-56 shrink-0 flex flex-col gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-[18px] corner-squircle p-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {sections.map((section) => {
              const isActive = (activeSection || "profile") === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-[12px] corner-squircle text-xs sm:text-sm font-medium transition-all text-start cursor-pointer",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  <div className={cn(
                    "size-7 rounded-[8px] corner-squircle flex items-center justify-center shrink-0",
                    isActive ? "bg-white dark:bg-zinc-700 shadow-xs" : "bg-zinc-100 dark:bg-zinc-800"
                  )}>
                    {section.icon}
                  </div>
                  <span className="truncate">{isRTL ? section.titleAr : section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="flex-1 min-w-0">
            {renderActiveDetailView()}
          </div>
        </div>
      )}
    </DrawerDialog>
  );
}

export default AccountPreferencesModal;
