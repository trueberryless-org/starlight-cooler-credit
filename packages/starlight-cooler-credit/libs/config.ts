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
  })
  .default({});

export function validateConfig(
  userConfig: unknown
): StarlightCoolerCreditConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();

    throw new AstroError(
      `Invalid @trueberryless-org/starlight-plugins-docs-components configuration:
      
      ${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
      ${Object.entries(errors.fieldErrors)
        .map(
          ([fieldName, fieldErrors]) =>
            ` - ${fieldName}: ${fieldErrors.join(" - ")}`
        )
        .join("\n")}
        `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/trueberryless-org/starlight-plugins-docs-components/issues/new`
    );
  }

  return config.data;
}

export type StarlightCoolerCreditUserConfig = z.input<typeof configSchema>;
export type StarlightCoolerCreditConfig = z.output<typeof configSchema>;
