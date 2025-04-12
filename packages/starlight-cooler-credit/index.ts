import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightCoolerCreditConfig,
  type StarlightCoolerCreditUserConfig,
  validateConfig,
} from "./libs/config";
import { overrideStarlightComponent } from "./libs/starlight";
import { vitePluginStarlightCoolerCreditConfig } from "./libs/vite";
import { Translations } from "./translations";

export type { StarlightCoolerCreditConfig, StarlightCoolerCreditUserConfig };

export default function starlightCoolerCredit(
  userConfig?: StarlightCoolerCreditUserConfig
): StarlightPlugin {
  const config = validateConfig(userConfig);

  return {
    name: "starlight-cooler-credit",
    hooks: {
      "i18n:setup"({ injectTranslations }) {
        injectTranslations(Translations);
      },
      "config:setup"({
        addIntegration,
        updateConfig: updateStarlightConfig,
        config: starlightConfig,
        logger,
      }) {
        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "TableOfContents"
            ),
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "Pagination"
            ),
          },
        });

        addIntegration({
          name: "starlight-cooler-credit-integration",
          hooks: {
            "astro:config:setup": ({ updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [vitePluginStarlightCoolerCreditConfig(config)],
                },
              });
            },
          },
        });
      },
    },
  };
}
