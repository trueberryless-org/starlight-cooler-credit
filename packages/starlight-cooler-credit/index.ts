import type { StarlightPlugin } from "@astrojs/starlight/types";

import { Translations } from "./translations";
import {
  type StarlightCoolerCreditConfig,
  validateConfig,
  type StarlightCoolerCreditUserConfig,
} from "./libs/config";
import { vitePluginStarlightCoolerCreditConfig } from "./libs/vite";
import { overrideStarlightComponent } from "./libs/starlight";

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
              "TableOfContents",
              "DefaultBottomTableOfContentsWrapper"
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
