import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroConfig, ViteUserConfig } from "astro";
import { fileURLToPath } from "node:url";

import type { StarlightCoolerCreditConfig } from "./config";
import { throwPluginError } from "./error";
import { type StarlightCoolerCreditI18nContext, getI18nContext } from "./i18n";

export function vitePluginStarlightCoolerCredit(
  config: StarlightCoolerCreditConfig,
  starlightConfig: Pick<StarlightUserConfig, "defaultLocale" | "locales">,
  astroConfig: Pick<AstroConfig, "root">
): VitePlugin {
  const context = getI18nContext(starlightConfig);

  validateCustomCredit(config, context);

  const modules = {
    "virtual:starlight-cooler-credit/config": `export default ${JSON.stringify(config)};`,
    "virtual:starlight-cooler-credit/context": `export default ${JSON.stringify(context)};`,
    "virtual:starlight-cooler-credit/images": getImagesVirtualModule(
      config,
      astroConfig
    ),
  };

  const moduleResolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
      resolveVirtualModuleId(key),
      key,
    ])
  );

  return {
    name: "vite-plugin-starlight-cooler-credit",
    load(id) {
      const moduleId = moduleResolutionMap[id];
      return moduleId ? modules[moduleId] : undefined;
    },
    resolveId(id) {
      return Object.hasOwn(modules, id)
        ? resolveVirtualModuleId(id)
        : undefined;
    },
  };
}

function validateCustomCredit(
  config: StarlightCoolerCreditConfig,
  context: StarlightCoolerCreditI18nContext
) {
  if (typeof config.credit === "string") return;

  for (const field of ["title", "description"] as const) {
    const text = config.credit[field];

    if (text && typeof text !== "string" && !text[context.defaultLang]) {
      throwPluginError(
        `The starlight-cooler-credit custom credit ${field} must have a key for the default language (${context.defaultLang}).`
      );
    }
  }
}

function getImagesVirtualModule(
  config: StarlightCoolerCreditConfig,
  astroConfig: Pick<AstroConfig, "root">
): string {
  if (!config.customImage) return "export const customImage = undefined;";

  const moduleId = resolveModuleId(config.customImage, astroConfig);

  return `import customImage from ${JSON.stringify(moduleId)};
export { customImage };`;
}

function resolveModuleId(
  id: string,
  astroConfig: Pick<AstroConfig, "root">
): string {
  return id.startsWith(".") ? fileURLToPath(new URL(id, astroConfig.root)) : id;
}

function resolveVirtualModuleId<TModuleId extends string>(
  id: TModuleId
): `\0${TModuleId}` {
  return `\0${id}`;
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
