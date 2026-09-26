import type { ImageMetadata } from "astro";
import config from "virtual:starlight-cooler-credit/config";
import { customImage } from "virtual:starlight-cooler-credit/images";

import HoustonOmg from "../assets/houston_omg.png";
import type { StarlightCoolerCreditConfig } from "./config";

const houstonOmgAlt =
  "A face with two large white eyes and a small round mouth, creating a 'WOW' expression. This character, named Houston, sticks out at the bottom of the card to show interest.";

export function getCreditImage(): CreditImage | undefined {
  return resolveCreditImage(config, customImage);
}

export function resolveCreditImage(
  config: Pick<StarlightCoolerCreditConfig, "showImage" | "customImageAlt">,
  customImage: ImageMetadata | undefined
): CreditImage | undefined {
  if (!config.showImage) return undefined;
  if (!customImage) return { src: HoustonOmg, alt: houstonOmgAlt };

  return { src: customImage, alt: config.customImageAlt ?? "" };
}

export interface CreditImage {
  src: ImageMetadata;
  alt: string;
}
