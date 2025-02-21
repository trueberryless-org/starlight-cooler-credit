import { AstroError } from "astro/errors";
import { z } from "astro/zod";

const configSchema = z
  .object({
    credit: z
      .union([
        z.enum(["Astro", "Starlight", "Starlight Blog"]),
        z.object({
          title: z.union([z.string(), z.record(z.string())]),
          href: z.string().url(),
          description: z.union([z.string(), z.record(z.string())]).optional(),
        }),
      ])
      .default("Starlight"),
    showImage: z.boolean().optional().default(true),
    customImage: z.string().optional(),
    customImageAlt: z.string().optional(),
  })
  .refine((data) => !(data.customImage && !data.customImageAlt), {
    message: "customImageAlt is required when customImage is provided.",
    path: ["customImageAlt"],
  })
  .default({});

export function validateConfig(
  userConfig: unknown
): StarlightCoolerCreditConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();

    throw new AstroError(
      `Invalid starlight-cooler-credit configuration:
      
      ${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
      ${Object.entries(errors.fieldErrors)
        .map(
          ([fieldName, fieldErrors]) =>
            ` - ${fieldName}: ${fieldErrors.join(" - ")}`
        )
        .join("\n")}
        `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/trueberryless-org/starlight-cooler-credit/issues/new`
    );
  }

  return config.data;
}

export type StarlightCoolerCreditUserConfig = z.input<typeof configSchema>;
export type StarlightCoolerCreditConfig = z.output<typeof configSchema>;
