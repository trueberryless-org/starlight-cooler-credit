import starlightConfig from "virtual:starlight/user-config";
import type { StarlightCoolerCreditConfig } from "./config";
import { getLangFromLocale, type Locale, type TranslationKey } from "./i18n";
import { kebabCase } from "change-case";

export default function getCreditText(
  config: StarlightCoolerCreditConfig,
  type: "title" | "href" | "description",
  translate: (key: TranslationKey) => string,
  locale: Locale
): string | undefined {
  if (typeof config.credit === "string") {
    if (type == "href") {
      if (config.credit === "Astro") {
        return "https://docs.astro.build/";
      } else if (config.credit === "Starlight Blog") {
        return "https://github.com/HiDeoo/starlight-blog";
      } else if (config.credit === "Starlight") {
        return "https://starlight.astro.build/";
      }
    }
    if (type == "title" && config.credit === "Starlight") {
      return translate(`builtWithStarlight.label`);
    }
    return translate(
      `starlightCoolerCredit.${kebabCase(config.credit)}.${type}`
    );
  } else {
    if (type === "href") return config.credit.href;
    if (
      type === "description" &&
      (!config.credit.description || config.credit.description === "")
    )
      return undefined;
    if (typeof config.credit[type] === "string") return config.credit[type];

    let text: string;
    const lang = getLangFromLocale(locale);
    const defaultLang =
      starlightConfig.defaultLocale.lang ??
      starlightConfig.defaultLocale.locale;

    if (config.credit[type] && config.credit[type][lang]) {
      text = config.credit[type][lang];
    } else {
      text =
        defaultLang && config.credit[type]
          ? config.credit[type][defaultLang] ?? ""
          : "";
    }

    if (text.length === 0) {
      throw new Error(
        `The credit ${type} must have a key for the default language (${defaultLang}).`
      );
    }

    return text;
  }
}
