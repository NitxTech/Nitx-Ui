import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import arNitxUiLib from "../messages/ar/nitxuilib.json";
import enNitxUiLib from "../messages/en/nitxuilib.json";

const NITX_UI_LIB_RESOURCES = {
  ar: arNitxUiLib,
  en: enNitxUiLib,
} as const;

type SupportedLanguage = keyof typeof NITX_UI_LIB_RESOURCES;
type TranslationOptions = Record<string, string | number | null | undefined>;

const DEFAULT_LANGUAGE: SupportedLanguage = "en";

const getSupportedLanguage = (language?: string): SupportedLanguage => {
  const normalizedLanguage = language?.toLowerCase().split("-")[0];
  return normalizedLanguage === "ar" ? "ar" : DEFAULT_LANGUAGE;
};

const getNestedValue = (source: unknown, key: string): unknown =>
  key.split(".").reduce<unknown>((currentValue, currentKey) => {
    if (
      currentValue &&
      typeof currentValue === "object" &&
      currentKey in currentValue
    ) {
      return (currentValue as Record<string, unknown>)[currentKey];
    }

    return undefined;
  }, source);

const interpolate = (value: string, options?: TranslationOptions) =>
  value.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, token: string) => {
    const replacement = options?.[token.trim()];
    return replacement == null ? "" : String(replacement);
  });

const resolveTranslation = (
  language: SupportedLanguage,
  key: string,
  options?: TranslationOptions,
) => {
  const localizedValue = getNestedValue(NITX_UI_LIB_RESOURCES[language], key);
  const fallbackValue = getNestedValue(NITX_UI_LIB_RESOURCES.en, key);
  const resolvedValue = localizedValue ?? fallbackValue;

  if (typeof resolvedValue === "string") {
    return interpolate(resolvedValue, options);
  }

  if (typeof resolvedValue === "number") {
    return String(resolvedValue);
  }

  return key;
};

export const useNitxUiTranslation = () => {
  const translation = useTranslation();
  const language = getSupportedLanguage(
    translation.i18n?.resolvedLanguage ?? translation.i18n?.language,
  );

  const t = useMemo(
    () => (key: string, options?: TranslationOptions) =>
      resolveTranslation(language, key, options),
    [language],
  );

  return {
    t,
    i18n: translation.i18n,
  };
};
