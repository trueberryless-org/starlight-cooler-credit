import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";
import starlightPluginShowLatestVersion from "starlight-plugin-show-latest-version";

import node from "@astrojs/node";

export default defineConfig({
  integrations: [
    starlight({
      title: {
        en: "Starlight Cooler Credit",
        de: "Starlight Coolere Anerkennung",
      },
      logo: {
        light: "./src/assets/logo-light.png",
        dark: "./src/assets/logo-dark.png",
        replacesTitle: true,
      },
      editLink: {
        baseUrl:
          "https://github.com/trueberryless-org/starlight-cooler-credit/edit/main/docs/",
      },
      plugins: [
        starlightLinksValidator(),
        starlightCoolerCredit(),
        starlightPluginsDocsComponents({
          pluginName: "starlight-cooler-credit",
          showcaseProps: {
            entries: [
              {
                thumbnail: "./src/assets/rainsberger.ca.webp",
                href: "https://www.rainsberger.ca",
                title: "Sarah Rainsberger",
              },
            ],
          },
        }),
        starlightPluginShowLatestVersion({
          source: {
            type: "npm",
            slug: "starlight-cooler-credit",
          },
          showInSiteTitle: "deferred",
        }),
      ],
      components: {
        TableOfContents: "./src/components/TableOfContents.astro",
      },
      sidebar: [
        {
          label: "Start Here",
          translations: {
            de: "Loslegen",
          },
          items: [
            { slug: "getting-started" },
            { slug: "configuration" },
            { slug: "many-headings" },
          ],
        },
        {
          label: "Components",
          items: [
            { slug: "credit-reference-card" },
            { slug: "bottom-table-of-content-wrapper" },
            { slug: "top-table-of-content-wrapper" },
          ],
        },
      ],
      social: {
        github: "https://github.com/trueberryless-org/starlight-cooler-credit",
      },
    }),
  ],
  adapter: node({
    mode: "standalone",
  }),
});
