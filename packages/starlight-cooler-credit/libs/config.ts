import { z } from "astro/zod";

import { throwPluginError } from "./error";

export const creditPresets = ["Astro", "Starlight", "Starlight Blog"] as const;

const localizedTextSchema = z.union([
  z.string(),
  z.record(z.string(), z.string()),
]);

const customCreditSchema = z.object({
  title: localizedTextSchema,
  href: z.url(),
  description: localizedTextSchema.optional(),
});

const configSchema = z
  .object({
    credit: z
      .union([z.enum(creditPresets), customCreditSchema])
      .default("Starlight"),
    showImage: z.boolean().default(true),
    customImage: z.string().optional(),
    customImageAlt: z.string().optional(),
  })
  .refine((config) => !config.customImage || !!config.customImageAlt, {
    message: "customImageAlt is required when customImage is provided.",
    path: ["customImageAlt"],
  })
  .prefault({});

export function validateConfig(
  userConfig: unknown
): StarlightCoolerCreditConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    throwPluginError(`Invalid starlight-cooler-credit configuration:

${z.prettifyError(config.error)}
`);
  }

  return config.data;
}

export type CreditPreset = (typeof creditPresets)[number];
export type LocalizedText = z.output<typeof localizedTextSchema>;
export type CustomCredit = z.output<typeof customCreditSchema>;

export type StarlightCoolerCreditUserConfig = z.input<typeof configSchema>;
export type StarlightCoolerCreditConfig = z.output<typeof configSchema>;
