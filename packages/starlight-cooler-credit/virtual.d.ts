declare module "virtual:starlight-cooler-credit/config" {
  const StarlightCoolerCreditConfig: import("./libs/config").StarlightCoolerCreditConfig;

  export default StarlightCoolerCreditConfig;
}

declare module "virtual:starlight-cooler-credit/context" {
  const StarlightCoolerCreditContext: import("./libs/i18n").StarlightCoolerCreditI18nContext;

  export default StarlightCoolerCreditContext;
}

declare module "virtual:starlight-cooler-credit/images" {
  type ImageMetadata = import("astro").ImageMetadata;

  export const customImage: ImageMetadata | undefined;
}
