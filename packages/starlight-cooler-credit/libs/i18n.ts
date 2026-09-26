import type { StarlightUserConfig } from "@astrojs/starlight/types";

import type { LocalizedText } from "./config";

const StarlightDefaultLang = "en";
const RootLocale = "root";

export function getI18nContext(
  starlightConfig: Pick<StarlightUserConfig, "defaultLocale" | "locales">
): StarlightCoolerCreditI18nContext {
  const defaultLocale = starlightConfig.defaultLocale ?? RootLocale;
  const defaultLocaleConfig = starlightConfig.locales?.[defaultLocale];

  return {
    defaultLang:
      defaultLocaleConfig?.lang ?? getImplicitLocaleLang(defaultLocale),
  };
}

export function getLangCandidates(
  context: StarlightCoolerCreditI18nContext,
  currentLang: string | undefined
): string[] {
  return [
    ...new Set([currentLang ?? context.defaultLang, context.defaultLang]),
  ];
}

export function getLocalizedText(
  text: LocalizedText,
  candidates: string[]
): string | undefined {
  if (typeof text === "string") return text;

  return candidates.map((candidate) => text[candidate]).find(Boolean);
}

function getImplicitLocaleLang(locale: string): string {
  return locale === RootLocale ? StarlightDefaultLang : locale;
}

export interface StarlightCoolerCreditI18nContext {
  defaultLang: string;
}
