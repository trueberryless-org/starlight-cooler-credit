import starlight from "@astrojs/starlight";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";
import { defineConfig } from "astro/config";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";

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
            { slug: "top-table-of-contents-wrapper" },
            { slug: "bottom-table-of-contents-wrapper" },
            { slug: "top-and-bottom-table-of-contents-wrapper" },
          ],
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/trueberryless-org/starlight-cooler-credit",
        },
      ],
    }),
  ],
});
