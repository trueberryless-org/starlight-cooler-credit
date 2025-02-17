import type { ViteUserConfig } from "astro";

import type { StarlightCoolerCreditConfig } from "..";

export function vitePluginStarlightCoolerCreditConfig(
  config: StarlightCoolerCreditConfig
): VitePlugin {
  const moduleId = "virtual:starlight-cooler-credit-config";
  const resolvedModuleId = `\0${moduleId}`;
  const moduleContent = `export default {
    credit: ${JSON.stringify(config.credit)},
    showImage: ${JSON.stringify(config.showImage)},
    ${
      config.customImage
        ? `customImage: await import(${JSON.stringify(config.customImage)})`
        : `customImage: undefined`
    },
    customImageAlt: ${JSON.stringify(config.customImageAlt)},
  }`;

  return {
    name: "vite-plugin-starlight-cooler-credit",
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined;
    },
  };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
