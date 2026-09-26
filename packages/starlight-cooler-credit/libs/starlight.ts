import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";

export function getComponentOverrides(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  overrides: StarlightComponent[]
): StarlightUserConfig["components"] {
  const entries = overrides
    .filter((override) => !hasComponentOverride(components, logger, override))
    .map((override) => [override, getOverrideEntrypoint(override)]);

  return { ...components, ...Object.fromEntries(entries) };
}

function hasComponentOverride(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  component: StarlightComponent
): boolean {
  if (!components?.[component]) return false;

  logger.warn(
    `It looks like you already have a \`${component}\` component override in your Starlight configuration.`
  );
  logger.warn(
    `To use \`starlight-cooler-credit\`, either remove your override or update it to render the content from \`starlight-cooler-credit/components/${component}.astro\`.`
  );

  if (component === "TableOfContents") {
    logger.warn(
      "Note that the `starlight-cooler-credit` `TableOfContents` component must be rendered AFTER the default Starlight `TableOfContents` component to ensure a proper layout."
    );
  }

  return true;
}

function getOverrideEntrypoint(component: StarlightComponent): string {
  return `starlight-cooler-credit/overrides/${component}.astro`;
}

type StarlightComponent = keyof NonNullable<StarlightUserConfig["components"]>;
