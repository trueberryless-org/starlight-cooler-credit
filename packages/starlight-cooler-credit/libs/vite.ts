import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroConfig, ViteUserConfig } from "astro";
import { fileURLToPath } from "node:url";

import type { StarlightCoolerCreditConfig } from "./config";
import { getI18nContext } from "./i18n";

export function vitePluginStarlightCoolerCredit(
  config: StarlightCoolerCreditConfig,
  starlightConfig: Pick<StarlightUserConfig, "defaultLocale" | "locales">,
  astroConfig: Pick<AstroConfig, "root">
): VitePlugin {
  const modules = {
    "virtual:starlight-cooler-credit/config": `export default ${JSON.stringify(config)};`,
    "virtual:starlight-cooler-credit/context": `export default ${JSON.stringify(getI18nContext(starlightConfig))};`,
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
