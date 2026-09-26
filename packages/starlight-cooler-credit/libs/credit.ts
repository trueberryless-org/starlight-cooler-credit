import config from "virtual:starlight-cooler-credit/config";
import context from "virtual:starlight-cooler-credit/context";

import type {
  CreditPreset,
  CustomCredit,
  LocalizedText,
  StarlightCoolerCreditConfig,
} from "./config";
import { getLangCandidates, getLocalizedText } from "./i18n";

const creditPresets: Record<CreditPreset, CreditPresetConfig> = {
  Astro: {
    href: "https://docs.astro.build/",
    titleKey: "starlightCoolerCredit.astro.title",
    descriptionKey: "starlightCoolerCredit.astro.description",
  },
  Starlight: {
    href: "https://starlight.astro.build/",
    titleKey: "builtWithStarlight.label",
    descriptionKey: "starlightCoolerCredit.starlight.description",
  },
  "Starlight Blog": {
    href: "https://github.com/HiDeoo/starlight-blog",
    titleKey: "starlightCoolerCredit.starlight-blog.title",
    descriptionKey: "starlightCoolerCredit.starlight-blog.description",
  },
};

export function getCredit(
  t: Translate,
  currentLang: string | undefined
): Credit {
  return resolveCredit(
    config.credit,
    t,
    getLangCandidates(context, currentLang)
  );
}

export function resolveCredit(
  credit: StarlightCoolerCreditConfig["credit"],
  t: Translate,
  langCandidates: string[]
): Credit {
  return typeof credit === "string"
    ? getPresetCredit(credit, t)
    : getCustomCredit(credit, langCandidates);
}

function getPresetCredit(preset: CreditPreset, t: Translate): Credit {
  const { href, titleKey, descriptionKey } = creditPresets[preset];

  return { href, title: t(titleKey), description: t(descriptionKey) };
}

function getCustomCredit(
  credit: CustomCredit,
  langCandidates: string[]
): Credit {
  return {
    href: credit.href,
    title: getRequiredLocalizedText(credit.title, langCandidates, "title"),
    description: credit.description
      ? getRequiredLocalizedText(
          credit.description,
          langCandidates,
          "description"
        )
      : undefined,
  };
}

function getRequiredLocalizedText(
  text: LocalizedText,
  langCandidates: string[],
  field: keyof Pick<CustomCredit, "title" | "description">
): string {
  const localizedText = getLocalizedText(text, langCandidates);

  if (!localizedText) {
    throw new Error(
      `The starlight-cooler-credit custom credit ${field} must have a key for the default language (${langCandidates.at(-1)}).`
    );
  }

  return localizedText;
}

export type Translate = (key: TranslationKey) => string;
type TranslationKey = keyof StarlightApp.I18n | "builtWithStarlight.label";

interface CreditPresetConfig {
  href: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export interface Credit {
  href: string;
  title: string;
  description: string | undefined;
}
