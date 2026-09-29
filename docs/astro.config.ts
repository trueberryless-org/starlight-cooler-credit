import starlight from "@astrojs/starlight";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";
import { defineConfig } from "astro/config";
import starlightCoolerCredit from "starlight-cooler-credit";
import starlightLinksValidator from "starlight-links-validator";

const site =
  (process.env.CONTEXT === "deploy-preview" ||
  process.env.CONTEXT === "branch-deploy"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL) ?? "https://starlight-cooler-credit.netlify.app";

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: "Starlight Cooler Credit",
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: new URL("og.png", site).href,
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: "A cool credit for your table of contents.",
          },
        },
      ],
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
      sidebar: [
        {
          label: "Start Here",
          items: [
            { slug: "getting-started" },
            { slug: "configuration" },
            { slug: "many-headings" },
          ],
        },
        {
          label: "Components",
          items: [{ slug: "credit-reference-card" }],
        },
      ],
      social: [
        {
          icon: "blueSky",
          label: "BlueSky",
          href: "https://bsky.app/profile/felixs.dev",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/trueberryless-org/starlight-cooler-credit",
        },
      ],
    }),
  ],
});
