import starlightConfig from "virtual:starlight/user-config";
import { Translations } from "../translations";
import { i18nSchema } from "@astrojs/starlight/schema";
import type { z } from "astro/zod";

export const DefaultLocale =
  starlightConfig.defaultLocale.locale === "root"
    ? undefined
    : starlightConfig.defaultLocale.locale;

export function getLangFromLocale(locale: Locale): string {
  const lang = locale
    ? starlightConfig.locales?.[locale]?.lang
    : starlightConfig.locales?.root?.lang;
  const defaultLang =
    starlightConfig.defaultLocale.lang ?? starlightConfig.defaultLocale.locale;
  return lang ?? defaultLang ?? "en";
}

export type Locale = string | undefined;

type CustomKeys = keyof typeof Translations.en;
type StarlightKeys = keyof z.infer<ReturnType<typeof i18nSchema>>;

export type TranslationKey = CustomKeys | StarlightKeys;
