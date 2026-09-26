/// <reference path="./locals.d.ts" />
import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightCoolerCreditConfig,
  type StarlightCoolerCreditUserConfig,
  validateConfig,
} from "./libs/config";
import { getComponentOverrides } from "./libs/starlight";
import { vitePluginStarlightCoolerCredit } from "./libs/vite";
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
        config: starlightConfig,
        logger,
        updateConfig: updateStarlightConfig,
      }) {
        updateStarlightConfig({
          components: getComponentOverrides(
            starlightConfig.components,
            logger,
            ["TableOfContents", "Pagination"]
          ),
        });

        addIntegration({
          name: "starlight-cooler-credit-integration",
          hooks: {
            "astro:config:setup": ({ config: astroConfig, updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [
                    vitePluginStarlightCoolerCredit(
                      config,
                      starlightConfig,
                      astroConfig
                    ),
                  ],
                },
              });
            },
          },
        });
      },
    },
  };
}
